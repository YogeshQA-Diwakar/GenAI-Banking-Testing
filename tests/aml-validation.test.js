const { screenTransactions } = require('../src/aml-screening');

function transaction(changes = {}) {
  return {
    transactionId: 'TEST-TXN-001',
    customerId: 'CUST-001',
    amount: 40000,
    currency: 'INR',
    timestamp: '2026-10-12T08:00:00Z',
    ...changes
  };
}

describe('REQ-10: Invalid transaction inputs', () => {
  test.each([
    ['missing', undefined],
    ['empty', ''],
    ['whitespace-only', '   ']
  ])('%s customer ID is rejected', (label, customerId) => {
    expect(() => {
      screenTransactions([transaction({ customerId })]);
    }).toThrow('customerId is required');
  });

  test.each([
    ['missing', undefined],
    ['text', '40000'],
    ['zero', 0],
    ['negative', -100],
    ['NaN', NaN],
    ['infinite', Infinity]
  ])('%s amount is rejected', (label, amount) => {
    expect(() => {
      screenTransactions([transaction({ amount })]);
    }).toThrow('amount must be positive');
  });

  test.each([
    ['missing', undefined],
    ['invalid text', 'not-a-date'],
    ['impossible date', '2026-02-30T08:00:00Z'],
    ['invalid hour', '2026-10-12T25:00:00Z']
  ])('%s timestamp is rejected', (label, timestamp) => {
    expect(() => {
      screenTransactions([transaction({ timestamp })]);
    }).toThrow('invalid timestamp');
  });

  test('Unsupported currency is rejected', () => {
    expect(() => {
      screenTransactions([transaction({ currency: 'USD' })]);
    }).toThrow('currency must be INR');
  });
});

describe('REQ-09: Repeated-transaction boundaries', () => {
  test('Three transactions spanning exactly 24 hours are flagged', () => {
    const transactions = [
      transaction({
        transactionId: 'T1',
        timestamp: '2026-10-12T08:00:00Z'
      }),
      transaction({
        transactionId: 'T2',
        timestamp: '2026-10-12T12:00:00Z'
      }),
      transaction({
        transactionId: 'T3',
        timestamp: '2026-10-13T08:00:00Z'
      })
    ];

    const result = screenTransactions(transactions);

    expect(result.repeatedPatternCustomerIds).toEqual([
      'CUST-001'
    ]);
  });

  test('A transaction below INR 40,000 does not count', () => {
    const transactions = [
      transaction({ transactionId: 'T1' }),
      transaction({
        transactionId: 'T2',
        timestamp: '2026-10-12T12:00:00Z'
      }),
      transaction({
        transactionId: 'T3',
        amount: 39999,
        timestamp: '2026-10-12T18:00:00Z'
      })
    ];

    const result = screenTransactions(transactions);

    expect(result.flaggedCustomerIds).toEqual([]);
    expect(result.repeatedPatternCustomerIds).toEqual([]);
  });

  test('Unsorted transactions are screened correctly', () => {
    const transactions = [
      transaction({
        transactionId: 'T3',
        timestamp: '2026-10-12T18:00:00Z'
      }),
      transaction({
        transactionId: 'T1',
        timestamp: '2026-10-12T08:00:00Z'
      }),
      transaction({
        transactionId: 'T2',
        timestamp: '2026-10-12T12:00:00Z'
      })
    ];

    const result = screenTransactions(transactions);

    expect(result.repeatedPatternCustomerIds).toEqual([
      'CUST-001'
    ]);
  });

  test('A qualifying window is found after an older transaction', () => {
    const transactions = [
      transaction({
        transactionId: 'T0',
        timestamp: '2026-10-10T08:00:00Z'
      }),
      transaction({
        transactionId: 'T1',
        timestamp: '2026-10-12T08:00:00Z'
      }),
      transaction({
        transactionId: 'T2',
        timestamp: '2026-10-12T12:00:00Z'
      }),
      transaction({
        transactionId: 'T3',
        timestamp: '2026-10-12T18:00:00Z'
      })
    ];

    const result = screenTransactions(transactions);

    expect(result.repeatedPatternCustomerIds).toEqual([
      'CUST-001'
    ]);
  });
});