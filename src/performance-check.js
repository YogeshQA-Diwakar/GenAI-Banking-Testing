const { performance } = require('node:perf_hooks');
const os = require('node:os');
const fs = require('node:fs');
const path = require('node:path');
const { screenTransactions } = require('./aml-screening');

// Deterministic fictional transactions.
// No real customer data is used.
function generateTransactions(count) {
  const startTime = Date.parse('2026-10-12T08:00:00Z');

  return Array.from({ length: count }, (_, index) => ({
    transactionId: `PERF-TXN-${index + 1}`,
    customerId: `PERF-CUST-${(index % 100) + 1}`,
    amount: 40000,
    currency: 'INR',
    timestamp: new Date(startTime + index * 1000)
      .toISOString()
      .replace('.000Z', 'Z')
  }));
}

function measureBatch(requirementId, count, targetMs = null) {
  // Generate data before starting the processing timer.
  const transactions = generateTransactions(count);

  const start = performance.now();
  const result = screenTransactions(transactions);
  const elapsedMs = performance.now() - start;

  const evaluationCount = result.evaluations.length;
  const countMatches = evaluationCount === count;
  const withinTarget =
    targetMs === null || elapsedMs <= targetMs;

  const status =
    countMatches && withinTarget ? 'Passed' : 'Failed';

  const measurement = {
    requirementId,
    transactionCount: count,
    evaluationCount,
    elapsedMs,
    targetMs,
    countMatches,
    status
  };

  console.log(
    `${requirementId}: ${count} transactions, ` +
    `${evaluationCount} evaluations, ` +
    `${elapsedMs.toFixed(3)} ms, ${status}`
  );

  return measurement;
}

const results = [
  measureBatch('REQ-11', 1000, 2000),
  measureBatch('REQ-12', 10000)
];

const report = {
  description: 'Local AML processing measurements for training',
  executedAt: new Date().toISOString(),
  environment: {
    operatingSystem: `${os.type()} ${os.release()}`,
    architecture: os.arch(),
    cpuModel: os.cpus()[0]?.model || 'Unknown',
    logicalCpuCount: os.cpus().length,
    totalMemoryGB: Number(
      (os.totalmem() / (1024 ** 3)).toFixed(2)
    ),
    nodeVersion: process.version
  },
  method: {
    measuredOperation: 'screenTransactions',
    excluded: 'Data generation and report writing',
    runsPerBatch: 1,
    customerCount: 100,
    amountPerTransaction: 40000,
    note:
      'Single-run local batch measurements; not concurrent-user or production load testing.'
  },
  results
};

const reportsFolder = path.join(__dirname, '..', 'reports');
fs.mkdirSync(reportsFolder, { recursive: true });

const reportPath = path.join(
  reportsFolder,
  'performance-results.json'
);

fs.writeFileSync(
  reportPath,
  JSON.stringify(report, null, 2),
  'utf8'
);

console.log(`Report saved to: ${reportPath}`);

if (results.some((result) => result.status === 'Failed')) {
  process.exitCode = 1;
}