const { validateKyc } = require('../src/kyc-validator');
const kycData = require('../data/kyc-customers.json');

describe('KYC customer validation', () => {
  test.each(kycData.scenarios)(
    '$scenarioId - $scenario',
    ({ customer, expectedValid }) => {
      const result = validateKyc(
        customer,
        kycData.validationDate
      );

      expect(result.valid).toBe(expectedValid);

      if (expectedValid) {
        expect(result.errors).toEqual([]);
      } else {
        expect(result.errors.length).toBeGreaterThan(0);
      }
    }
  );
});