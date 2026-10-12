// Fictional customer records for training only.
const customerStatuses = new Map([
  ['CUST-001', 'Verified'],
  ['CUST-002', 'Pending']
]);

function getKycStatus(customerId) {
  if (!customerStatuses.has(customerId)) {
    return {
      found: false
    };
  }

  return {
    found: true,
    status: customerStatuses.get(customerId)
  };
}

module.exports = { getKycStatus };