const { screenTransactions } = require('../src/aml-screening');
const amlData = require('../data/aml-transactions.json');

describe('REQ-08 and REQ-09: AML screening scenarios', () => {
  test.each(amlData.scenarios)(
    '$scenarioId - $scenario',
    ({ transactions, expectedFlaggedCustomerIds }) => {
      const result = screenTransactions(transactions);

      expect(result.flaggedCustomerIds).toEqual(
        [...expectedFlaggedCustomerIds].sort()
      );

      expect(result.evaluations).toHaveLength(
        transactions.length
      );
    }
  );
});