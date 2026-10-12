const LARGE_AMOUNT = 100000;
const REPEATED_AMOUNT = 40000;
const WINDOW_MS = 24 * 60 * 60 * 1000;

function validateTransaction(transaction, index) {
  if (!transaction || typeof transaction !== 'object') {
    throw new Error(`Transaction ${index}: invalid transaction`);
  }

  if (
    typeof transaction.customerId !== 'string' ||
    transaction.customerId.trim() === ''
  ) {
    throw new Error(`Transaction ${index}: customerId is required`);
  }

  if (
    typeof transaction.amount !== 'number' ||
    !Number.isFinite(transaction.amount) ||
    transaction.amount <= 0
  ) {
    throw new Error(`Transaction ${index}: amount must be positive`);
  }

  if (transaction.currency !== 'INR') {
    throw new Error(`Transaction ${index}: currency must be INR`);
  }

  // This sample accepts UTC timestamps such as 2026-10-12T08:00:00Z.
  const timestampPattern =
    /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z$/;

  if (
    typeof transaction.timestamp !== 'string' ||
    !timestampPattern.test(transaction.timestamp)
  ) {
    throw new Error(`Transaction ${index}: invalid timestamp`);
  }

  const date = new Date(transaction.timestamp);

  if (
    Number.isNaN(date.getTime()) ||
    date.toISOString() !==
      transaction.timestamp.replace('Z', '.000Z')
  ) {
    throw new Error(`Transaction ${index}: invalid timestamp`);
  }
}

function screenTransactions(transactions) {
  if (!Array.isArray(transactions)) {
    throw new Error('Transactions must be an array');
  }

  transactions.forEach(validateTransaction);

  const qualifyingByCustomer = new Map();
  const patternCustomers = new Set();
  const flaggedCustomers = new Set();

  for (const transaction of transactions) {
    const customerId = transaction.customerId;

    if (transaction.amount >= LARGE_AMOUNT) {
      flaggedCustomers.add(customerId);
    }

    if (transaction.amount >= REPEATED_AMOUNT) {
      if (!qualifyingByCustomer.has(customerId)) {
        qualifyingByCustomer.set(customerId, []);
      }

      qualifyingByCustomer.get(customerId).push(
        Date.parse(transaction.timestamp)
      );
    }
  }

  for (const [customerId, timestamps] of qualifyingByCustomer) {
    timestamps.sort((a, b) => a - b);

    let left = 0;

    for (let right = 0; right < timestamps.length; right++) {
      // Exactly 24 hours is included in this sample rule.
      while (timestamps[right] - timestamps[left] > WINDOW_MS) {
        left++;
      }

      if (right - left + 1 >= 3) {
        patternCustomers.add(customerId);
        flaggedCustomers.add(customerId);
        break;
      }
    }
  }

  const evaluations = transactions.map((transaction) => ({
    transactionId: transaction.transactionId,
    customerId: transaction.customerId,
    largeTransaction: transaction.amount >= LARGE_AMOUNT,

    // This is a customer-level finding, not a claim that
    // this individual transaction belongs to the detected window.
    customerHasRepeatedPattern:
      patternCustomers.has(transaction.customerId)
  }));

  return {
    flaggedCustomerIds: [...flaggedCustomers].sort(),
    repeatedPatternCustomerIds: [...patternCustomers].sort(),
    evaluations
  };
}

module.exports = { screenTransactions };