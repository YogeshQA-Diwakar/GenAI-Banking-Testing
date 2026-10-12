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

describe('REQ-06: KYC age and date boundaries', () => {
  test('KYC-007: Customer turning exactly 18 is accepted', () => {
    const customer = createCustomer({
      dateOfBirth: '2008-10-12'
    });

    const result = validateKyc(customer, validationDate);

    expect(result.valid).toBe(true);
    expect(result.errors).toEqual([]);
  });

  test('KYC-008: Customer one day under 18 is rejected', () => {
    const customer = createCustomer({
      dateOfBirth: '2008-10-13'
    });

    const result = validateKyc(customer, validationDate);

    expect(result.valid).toBe(false);
    expect(result.errors).toContain('Customer must be at least 18');
  });

  test('KYC-009: Impossible birth date is rejected', () => {
    const customer = createCustomer({
      dateOfBirth: '1990-02-30'
    });

    const result = validateKyc(customer, validationDate);

    expect(result.valid).toBe(false);
    expect(result.errors).toContain('Date of birth is invalid');
  });

  test('KYC-010: Future birth date is rejected', () => {
    const customer = createCustomer({
      dateOfBirth: '2027-01-01'
    });

    const result = validateKyc(customer, validationDate);

    expect(result.valid).toBe(false);
    expect(result.errors).toContain(
      'Date of birth cannot be in the future'
    );
  });
});