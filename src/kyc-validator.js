function parseDate(value) {
  if (typeof value !== 'string' ||
      !/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return null;
  }

  const date = new Date(`${value}T00:00:00.000Z`);

  // Reject impossible dates such as February 30.
  if (Number.isNaN(date.getTime()) ||
      date.toISOString().slice(0, 10) !== value) {
    return null;
  }

  return date;
}

function validateKyc(customer, validationDate) {
  const referenceDate = parseDate(validationDate);

  if (!referenceDate) {
    throw new Error('Validation date must be a valid YYYY-MM-DD date.');
  }

  if (!customer || typeof customer !== 'object' ||
      Array.isArray(customer)) {
    return {
      valid: false,
      errors: ['Customer details are required']
    };
  }

  const errors = [];

  const requiredFields = [
    'customerId',
    'name',
    'dateOfBirth',
    'address',
    'documentId'
  ];

  for (const field of requiredFields) {
    if (typeof customer[field] !== 'string' ||
        customer[field].trim() === '') {
      errors.push(`${field} is required`);
    }
  }

  const birthDate = parseDate(customer.dateOfBirth);

  if (!birthDate) {
    errors.push('Date of birth is invalid');
  } else if (birthDate > referenceDate) {
    errors.push('Date of birth cannot be in the future');
  } else {
    let age =
      referenceDate.getUTCFullYear() - birthDate.getUTCFullYear();

    const birthdayNotReached =
      referenceDate.getUTCMonth() < birthDate.getUTCMonth() ||
      (
        referenceDate.getUTCMonth() === birthDate.getUTCMonth() &&
        referenceDate.getUTCDate() < birthDate.getUTCDate()
      );

    if (birthdayNotReached) {
      age--;
    }

    if (age < 18) {
      errors.push('Customer must be at least 18');
    }
  }

  const supportedDocuments = [
    'Passport',
    'Driving License',
    'National ID'
  ];

  if (!supportedDocuments.includes(customer.documentType)) {
    errors.push('Document type is unsupported or missing');
  }

  return {
    valid: errors.length === 0,
    errors
  };
}

module.exports = { validateKyc };