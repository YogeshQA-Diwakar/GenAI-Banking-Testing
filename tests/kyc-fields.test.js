const { validateKyc } = require('../src/kyc-validator');

const validationDate = '2026-10-12';

function createCustomer(changes = {}) {
  return {
    customerId: 'TEST-CUSTOMER',
    name: 'Fictional Customer',
    dateOfBirth: '1990-05-15',
    address: 'Fictional Training Address',
    documentId: 'TEST-DOC-001',
    documentType: 'Passport',
    ...changes
  };
}

const requiredFields = [
  'customerId',
  'name',
  'dateOfBirth',
  'address',
  'documentId'
];

describe('REQ-05: Required KYC fields', () => {
  test.each(requiredFields)(
    'Missing %s is rejected',
    (field) => {
      const customer = createCustomer();
      delete customer[field];

      const result = validateKyc(customer, validationDate);

      expect(result.valid).toBe(false);
      expect(result.errors).toContain(`${field} is required`);
    }
  );

  test.each(requiredFields)(
    'Empty %s is rejected',
    (field) => {
      const customer = createCustomer({ [field]: '' });

      const result = validateKyc(customer, validationDate);

      expect(result.valid).toBe(false);
      expect(result.errors).toContain(`${field} is required`);
    }
  );

  test.each(requiredFields)(
    'Whitespace-only %s is rejected',
    (field) => {
      const customer = createCustomer({ [field]: '   ' });

      const result = validateKyc(customer, validationDate);

      expect(result.valid).toBe(false);
      expect(result.errors).toContain(`${field} is required`);
    }
  );
});

describe('REQ-07: KYC document types', () => {
  test.each([
    'Passport',
    'Driving License',
    'National ID'
  ])('Supported document %s is accepted', (documentType) => {
    const customer = createCustomer({ documentType });

    const result = validateKyc(customer, validationDate);

    expect(result.valid).toBe(true);
    expect(result.errors).toEqual([]);
  });

  test('Missing document type is rejected', () => {
    const customer = createCustomer();
    delete customer.documentType;

    const result = validateKyc(customer, validationDate);

    expect(result.valid).toBe(false);
    expect(result.errors).toContain(
      'Document type is unsupported or missing'
    );
  });

  test('Unsupported document type is rejected', () => {
    const customer = createCustomer({
      documentType: 'Library Card'
    });

    const result = validateKyc(customer, validationDate);

    expect(result.valid).toBe(false);
    expect(result.errors).toContain(
      'Document type is unsupported or missing'
    );
  });
});