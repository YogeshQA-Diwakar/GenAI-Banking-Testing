const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');

const reportsFolder = path.join(__dirname, '..', 'reports');

function readReport(filename) {
  return JSON.parse(
    fs.readFileSync(path.join(reportsFolder, filename), 'utf8')
  );
}

const jestReport = readReport('jest-results.json');
const performanceReport = readReport('performance-results.json');

const tests = [];

function requirementIds(filename, name) {
  // Map individual generated KYC scenarios.
  const kycScenario = name.match(/KYC-DATA-(\d+)/);

  if (kycScenario) {
    const mappings = {
      '01': ['REQ-05', 'REQ-06', 'REQ-07'],
      '02': ['REQ-05'],
      '03': ['REQ-06'],
      '04': ['REQ-07'],
      '05': ['REQ-05'],
      '06': ['REQ-05']
    };

    return mappings[kycScenario[1]] || [];
  }

  // Map individual generated AML scenarios.
  const amlScenario = name.match(/AML-DATA-(\d+)/);

  if (amlScenario) {
    return Number(amlScenario[1]) <= 3
      ? ['REQ-08']
      : ['REQ-09'];
  }

  // These additional tests have no requirement ID in their titles.
  if (filename === 'chatbot-inputs.test.js') {
    return name.startsWith('Chatbot:')
      ? ['REQ-03']
      : ['REQ-04'];
  }

  // Other suites already include requirement IDs in their titles.
  return [...new Set(name.match(/REQ-\d{2}/g) || [])];
}

function normalizeStatus(status) {
  if (status === 'passed') return 'Passed';
  if (status === 'failed') return 'Failed';
  return 'Not Run';
}

// Sort by filename and test name so IDs are repeatable
// while the current test names remain unchanged.
const suites = [...jestReport.testResults].sort(
  (a, b) => a.name.localeCompare(b.name)
);

for (const suite of suites) {
  const filename = path.basename(suite.name);
  const prefix = filename
    .replace('.test.js', '')
    .toUpperCase();

  const assertions = [...suite.assertionResults].sort(
    (a, b) => a.fullName.localeCompare(b.fullName)
  );

  assertions.forEach((test, index) => {
    tests.push({
      id: `${prefix}-${String(index + 1).padStart(3, '0')}`,
      name: test.fullName,
      file: filename,
      requirements: requirementIds(filename, test.fullName),
      status: normalizeStatus(test.status),
      evidence: 'jest-results.json'
    });
  });
}

for (const measurement of performanceReport.results) {
  tests.push({
    id: measurement.requirementId === 'REQ-11'
      ? 'PERF-001'
      : 'PERF-002',
    name:
      `${measurement.transactionCount} transactions; ` +
      `${measurement.evaluationCount} evaluations; ` +
      `${measurement.elapsedMs.toFixed(3)} ms`,
    file: 'performance-check.js',
    requirements: [measurement.requirementId],
    status: measurement.status,
    evidence: 'performance-results.json'
  });
}

const traceTest = {
  id: 'TRACE-001',
  name: 'RTM contains all requirements and valid test references',
  file: 'generate-rtm.js',
  requirements: ['REQ-13'],
  status: 'Not Run',
  evidence: 'Generated traceability reports'
};

tests.push(traceTest);

const rows = Array.from({ length: 13 }, (_, index) => {
  const id = `REQ-${String(index + 1).padStart(2, '0')}`;

  return {
    id,
    tests: tests.filter((test) => test.requirements.includes(id))
  };
});

// Check the traceability report before marking TRACE-001 Passed.
assert.equal(rows.length, 13);
assert.equal(new Set(rows.map((row) => row.id)).size, 13);
assert.equal(new Set(tests.map((test) => test.id)).size, tests.length);

const validStatuses = ['Passed', 'Failed', 'Not Run'];

for (const test of tests) {
  assert.ok(validStatuses.includes(test.status));

  for (const requirement of test.requirements) {
    assert.ok(rows.some((row) => row.id === requirement));
  }
}

for (const row of rows) {
  for (const test of row.tests) {
    assert.ok(tests.includes(test));
    assert.ok(test.requirements.includes(row.id));
  }
}

traceTest.status = 'Passed';

function rowStatus(mappedTests) {
  if (mappedTests.length === 0) return 'Not Run';
  if (mappedTests.some((test) => test.status === 'Failed')) {
    return 'Failed';
  }
  if (mappedTests.some((test) => test.status === 'Not Run')) {
    return 'Not Run';
  }
  return 'Passed';
}

function escapeCell(value) {
  return String(value)
    .replace(/\|/g, '\\|')
    .replace(/[\r\n]+/g, ' ');
}

const generatedAt = new Date().toISOString();

const registerLines = [
  '# Test Register',
  '',
  `Generated at: ${generatedAt}`,
  '',
  'IDs are assigned by sorted filename and test name.',
  'Regenerate both reports together after changing tests.',
  '',
  '| Test ID | Test name | File | Requirements | Actual status | Evidence |',
  '|---|---|---|---|---|---|'
];

for (const test of tests) {
  registerLines.push(
    `| ${test.id} | ${escapeCell(test.name)} | ${test.file} | ` +
    `${test.requirements.join(', ') || 'Setup only'} | ` +
    `${test.status} | ${test.evidence} |`
  );
}

const rtmLines = [
  '# Requirements Traceability Matrix',
  '',
  `Generated at: ${generatedAt}`,
  '',
  `Jest execution: ${new Date(jestReport.startTime).toISOString()}`,
  `Performance execution: ${performanceReport.executedAt}`,
  '',
  'Statuses come from saved execution evidence.',
  'Requirements without mapped executed tests remain Not Run.',
  'Passed means the mapped checks passed; it does not prove exhaustive coverage.',
  '',
  '| Requirement | Test IDs | Actual execution status |',
  '|---|---|---|'
];

for (const row of rows) {
  rtmLines.push(
    `| ${row.id} | ` +
    `${row.tests.map((test) => test.id).join(', ') || 'None'} | ` +
    `${rowStatus(row.tests)} |`
  );
}

fs.writeFileSync(
  path.join(reportsFolder, 'test-register.md'),
  registerLines.join('\n') + '\n',
  'utf8'
);

fs.writeFileSync(
  path.join(reportsFolder, 'rtm.md'),
  rtmLines.join('\n') + '\n',
  'utf8'
);

console.log(`Registered ${tests.length} checks.`);
console.log('TRACE-001: Passed');

for (const row of rows) {
  console.log(
    `${row.id}: ${row.tests.length} mapped checks, ` +
    rowStatus(row.tests)
  );
}

console.log('Saved reports/test-register.md and reports/rtm.md');