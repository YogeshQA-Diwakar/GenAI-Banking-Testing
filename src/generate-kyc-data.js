const { faker } = require('@faker-js/faker');
const fs = require('node:fs');
const path = require('node:path');

// A fixed seed makes the generated data repeatable.
faker.seed(123);

// Fixed reference date for repeatable age tests.
const validationDate = '2026-10-12';

function createCustomer(customerId) {
  return {
    customerId,
    name: faker.person.fullName(),
    dateOfBirth: '1990-05-15',
    address: faker.location.streetAddress(),
    documentId: `TEST-${faker.string.alphanumeric(10)}`,
    documentType: 'Passport'
  };
}

const customers = [
  {
    scenarioId: 'KYC-DATA-01',
    scenario: 'Valid adult customer',
    expectedValid: true,
    customer: createCustomer('CUST-001')
  },
  {
    scenarioId: 'KYC-DATA-02',
    scenario: 'Missing name',
    expectedValid: false,
    customer: {
      ...createCustomer('CUST-002'),
      name: ''
    }
  },
  {
    scenarioId: 'KYC-DATA-03',
    scenario: 'Customer younger than 18',
    expectedValid: false,
    customer: {
      ...createCustomer('CUST-003'),
      dateOfBirth: '2010-05-15'
    }
  },
  {
    scenarioId: 'KYC-DATA-04',
    scenario: 'Unsupported document type',
    expectedValid: false,
    customer: {
      ...createCustomer('CUST-004'),
      documentType: 'Library Card'
    }
  },
  {
    scenarioId: 'KYC-DATA-05',
    scenario: 'Missing document ID',
    expectedValid: false,
    customer: {
      ...createCustomer('CUST-005'),
      documentId: ''
    }
  },
  {
    scenarioId: 'KYC-DATA-06',
    scenario: 'Whitespace-only address',
    expectedValid: false,
    customer: {
      ...createCustomer('CUST-006'),
      address: '   '
    }
  }
];

const output = {
  description: 'Fictional KYC data for training only',
  validationDate,
  scenarios: customers
};

const dataFolder = path.join(__dirname, '..', 'data');
fs.mkdirSync(dataFolder, { recursive: true });

const outputPath = path.join(dataFolder, 'kyc-customers.json');

fs.writeFileSync(
  outputPath,
  JSON.stringify(output, null, 2),
  'utf8'
);

console.log(`Generated ${customers.length} KYC scenarios.`);
console.log(`Data saved to: ${outputPath}`);