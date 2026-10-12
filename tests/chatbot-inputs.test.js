const { chat } = require('../src/banking-chatbot');

describe('Chatbot: Empty and invalid questions', () => {
  test.each([
    ['empty question', ''],
    ['whitespace-only question', '   '],
    ['missing question', undefined],
    ['null question', null],
    ['numeric question', 123]
  ])('%s returns help', (label, question) => {
    const result = chat(question);

    expect(result.intent).toBe('FALLBACK');
    expect(result.message).toBe(
      'I can help with account opening, KYC status and transaction status. Please ask about one of these topics.'
    );
  });
});

describe('KYC integration: Customer ID handling', () => {
  test.each([
    ['missing', undefined],
    ['empty', ''],
    ['whitespace-only', '   ']
  ])('%s customer ID requests an ID', (label, customerId) => {
    const result = chat('kyc status', customerId);

    expect(result.outcome).toBe('CUSTOMER_ID_REQUIRED');
    expect(result.message).toBe(
      'Please provide your customer ID.'
    );
  });

  test('Surrounding spaces in customer ID are removed', () => {
    const result = chat('kyc status', '  CUST-001  ');

    expect(result.outcome).toBe('FOUND');
    expect(result.status).toBe('Verified');
  });

  test('Missing customer ID does not call the service', () => {
    const customerService = {
      getKycStatus: jest.fn()
    };

    chat('kyc status', undefined, customerService);

    expect(customerService.getKycStatus).not.toHaveBeenCalled();
  });
});