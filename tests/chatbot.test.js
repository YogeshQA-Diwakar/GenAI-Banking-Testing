const { chat } = require('../src/banking-chatbot');

describe('REQ-01: Supported banking questions', () => {
  test('Account opening returns predefined guidance', () => {
    const result = chat('account opening');

    expect(result.intent).toBe('ACCOUNT_OPENING');
    expect(result.message).toBe(
      'To open an account, complete the application and submit the required KYC documents.'
    );
  });

  test('KYC status returns the stored status', () => {
    const result = chat('kyc status', 'CUST-001');

    expect(result.intent).toBe('KYC_STATUS');
    expect(result.message).toBe(
      'Your KYC status is Verified.'
    );
  });

  test('Transaction status returns predefined guidance', () => {
    const result = chat('transaction status');

    expect(result.intent).toBe('TRANSACTION_STATUS');
    expect(result.message).toBe(
      'Check your transaction history or contact customer support with your transaction reference.'
    );
  });
});

describe('REQ-02: Capitalization and surrounding spaces', () => {
  test.each([
    ['account opening', '  AcCoUnT OpEnInG  '],
    ['kyc status', '  KYC STATUS  '],
    ['transaction status', '  Transaction STATUS  ']
  ])('%s produces the same response', (original, changed) => {
    const originalResult = chat(original, 'CUST-001');
    const changedResult = chat(changed, 'CUST-001');

    expect(changedResult).toEqual(originalResult);
  });
});

describe('REQ-03: Unsupported questions', () => {
  test('Unsupported question returns the help message', () => {
    const result = chat('Which shares should I buy?');

    expect(result.intent).toBe('FALLBACK');
    expect(result.message).toBe(
      'I can help with account opening, KYC status and transaction status. Please ask about one of these topics.'
    );
  });
});

describe('REQ-04: Simulated customer-service integration', () => {
  test('Known customer returns the stored Pending status', () => {
    const result = chat('kyc status', 'CUST-002');

    expect(result.outcome).toBe('FOUND');
    expect(result.status).toBe('Pending');
    expect(result.message).toBe(
      'Your KYC status is Pending.'
    );
  });

  test('Unknown customer returns a not-found result', () => {
    const result = chat('kyc status', 'CUST-999');

    expect(result.outcome).toBe('NOT_FOUND');
    expect(result.message).toBe('Customer not found.');
    expect(result.status).toBeUndefined();
  });

  test('Service failure returns a controlled error', () => {
    const failingService = {
      getKycStatus() {
        throw new Error('Simulated service failure');
      }
    };

    const result = chat(
      'kyc status',
      'CUST-001',
      failingService
    );

    expect(result.outcome).toBe('SERVICE_ERROR');
    expect(result.message).toBe(
      'KYC status is temporarily unavailable. Please try again later.'
    );
    expect(result.status).toBeUndefined();
  });
});