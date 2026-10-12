const { getKycStatus } = require('./customer-service');

function chat(
  question,
  customerId,
  customerService = { getKycStatus }
) {
  const normalizedQuestion =
    typeof question === 'string'
      ? question.trim().toLowerCase()
      : '';

  if (normalizedQuestion === 'account opening') {
    return {
      intent: 'ACCOUNT_OPENING',
      message:
        'To open an account, complete the application and submit the required KYC documents.'
    };
  }

  if (normalizedQuestion === 'transaction status') {
    return {
      intent: 'TRANSACTION_STATUS',
      message:
        'Check your transaction history or contact customer support with your transaction reference.'
    };
  }

  if (normalizedQuestion === 'kyc status') {
    if (
      typeof customerId !== 'string' ||
      customerId.trim() === ''
    ) {
      return {
        intent: 'KYC_STATUS',
        outcome: 'CUSTOMER_ID_REQUIRED',
        message: 'Please provide your customer ID.'
      };
    }

    try {
      const result = customerService.getKycStatus(
        customerId.trim()
      );

      if (!result.found) {
        return {
          intent: 'KYC_STATUS',
          outcome: 'NOT_FOUND',
          message: 'Customer not found.'
        };
      }

      return {
        intent: 'KYC_STATUS',
        outcome: 'FOUND',
        status: result.status,
        message: `Your KYC status is ${result.status}.`
      };
    } catch {
      return {
        intent: 'KYC_STATUS',
        outcome: 'SERVICE_ERROR',
        message:
          'KYC status is temporarily unavailable. Please try again later.'
      };
    }
  }

  return {
    intent: 'FALLBACK',
    message:
      'I can help with account opening, KYC status and transaction status. Please ask about one of these topics.'
  };
}

module.exports = { chat };