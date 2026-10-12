const { faker } = require('@faker-js/faker');
const fs = require('node:fs');
const path = require('node:path');

faker.seed(456);

function transaction(customerId, amount, timestamp) {
  return {
    transactionId: `TEST-${faker.string.uuid()}`,
    customerId,
    customerName: `Fictional ${customerId}`,
    amount,
    currency: 'INR',
    timestamp
  };
}

const scenarios = [
  {
    scenarioId: 'AML-DATA-01',
    scenario: 'Amount below large-transaction threshold',
    expectedFlaggedCustomerIds: [],
    transactions: [
      transaction('CUST-001', 99999, '2026-10-12T09:00:00Z')
    ]
  },
  {
    scenarioId: 'AML-DATA-02',
    scenario: 'Amount exactly at large-transaction threshold',
    expectedFlaggedCustomerIds: ['CUST-002'],
    transactions: [
      transaction('CUST-002', 100000, '2026-10-12T09:00:00Z')
    ]
  },
  {
    scenarioId: 'AML-DATA-03',
    scenario: 'Amount above large-transaction threshold',
    expectedFlaggedCustomerIds: ['CUST-003'],
    transactions: [
      transaction('CUST-003', 150000, '2026-10-12T09:00:00Z')
    ]
  },
  {
    scenarioId: 'AML-DATA-04',
    scenario: 'Three qualifying transactions within 24 hours',
    expectedFlaggedCustomerIds: ['CUST-004'],
    transactions: [
      transaction('CUST-004', 40000, '2026-10-12T08:00:00Z'),
      transaction('CUST-004', 45000, '2026-10-12T12:00:00Z'),
      transaction('CUST-004', 50000, '2026-10-12T18:00:00Z')
    ]
  },
  {
    scenarioId: 'AML-DATA-05',
    scenario: 'Only two qualifying transactions',
    expectedFlaggedCustomerIds: [],
    transactions: [
      transaction('CUST-005', 40000, '2026-10-12T08:00:00Z'),
      transaction('CUST-005', 45000, '2026-10-12T12:00:00Z')
    ]
  },
  {
    scenarioId: 'AML-DATA-06',
    scenario: 'Third transaction outside the 24-hour window',
    expectedFlaggedCustomerIds: [],
    transactions: [
      transaction('CUST-006', 40000, '2026-10-12T08:00:00Z'),
      transaction('CUST-006', 45000, '2026-10-12T12:00:00Z'),
      transaction('CUST-006', 50000, '2026-10-13T08:00:01Z')
    ]
  },
  {
    scenarioId: 'AML-DATA-07',
    scenario: 'Qualifying transactions belong to different customers',
    expectedFlaggedCustomerIds: [],
    transactions: [
      transaction('CUST-007', 40000, '2026-10-12T08:00:00Z'),
      transaction('CUST-008', 45000, '2026-10-12T12:00:00Z'),
      transaction('CUST-009', 50000, '2026-10-12T18:00:00Z')
    ]
  }
];

const output = {
  description: 'Fictional AML data for training only',
  rules: {
    currency: 'INR',
    largeTransactionThreshold: 100000,
    repeatedTransactionMinimum: 40000,
    repeatedTransactionCount: 3,
    windowHours: 24
  },
  scenarios
};

const dataFolder = path.join(__dirname, '..', 'data');
fs.mkdirSync(dataFolder, { recursive: true });

const outputPath = path.join(dataFolder, 'aml-transactions.json');

fs.writeFileSync(
  outputPath,
  JSON.stringify(output, null, 2),
  'utf8'
);

console.log(`Generated ${scenarios.length} AML scenarios.`);
console.log(`Data saved to: ${outputPath}`);