# Test Register

Generated at: 2026-10-12T06:37:25.516Z

IDs are assigned by sorted filename and test name.
Regenerate both reports together after changing tests.

| Test ID | Test name | File | Requirements | Actual status | Evidence |
|---|---|---|---|---|---|
| SETUP-001 | Jest setup is working | setup.test.js | Setup only | Passed | jest-results.json |
| AML-VALIDATION-001 | REQ-09: Repeated-transaction boundaries A qualifying window is found after an older transaction | aml-validation.test.js | REQ-09 | Passed | jest-results.json |
| AML-VALIDATION-002 | REQ-09: Repeated-transaction boundaries A transaction below INR 40,000 does not count | aml-validation.test.js | REQ-09 | Passed | jest-results.json |
| AML-VALIDATION-003 | REQ-09: Repeated-transaction boundaries Three transactions spanning exactly 24 hours are flagged | aml-validation.test.js | REQ-09 | Passed | jest-results.json |
| AML-VALIDATION-004 | REQ-09: Repeated-transaction boundaries Unsorted transactions are screened correctly | aml-validation.test.js | REQ-09 | Passed | jest-results.json |
| AML-VALIDATION-005 | REQ-10: Invalid transaction inputs empty customer ID is rejected | aml-validation.test.js | REQ-10 | Passed | jest-results.json |
| AML-VALIDATION-006 | REQ-10: Invalid transaction inputs impossible date timestamp is rejected | aml-validation.test.js | REQ-10 | Passed | jest-results.json |
| AML-VALIDATION-007 | REQ-10: Invalid transaction inputs infinite amount is rejected | aml-validation.test.js | REQ-10 | Passed | jest-results.json |
| AML-VALIDATION-008 | REQ-10: Invalid transaction inputs invalid hour timestamp is rejected | aml-validation.test.js | REQ-10 | Passed | jest-results.json |
| AML-VALIDATION-009 | REQ-10: Invalid transaction inputs invalid text timestamp is rejected | aml-validation.test.js | REQ-10 | Passed | jest-results.json |
| AML-VALIDATION-010 | REQ-10: Invalid transaction inputs missing amount is rejected | aml-validation.test.js | REQ-10 | Passed | jest-results.json |
| AML-VALIDATION-011 | REQ-10: Invalid transaction inputs missing customer ID is rejected | aml-validation.test.js | REQ-10 | Passed | jest-results.json |
| AML-VALIDATION-012 | REQ-10: Invalid transaction inputs missing timestamp is rejected | aml-validation.test.js | REQ-10 | Passed | jest-results.json |
| AML-VALIDATION-013 | REQ-10: Invalid transaction inputs NaN amount is rejected | aml-validation.test.js | REQ-10 | Passed | jest-results.json |
| AML-VALIDATION-014 | REQ-10: Invalid transaction inputs negative amount is rejected | aml-validation.test.js | REQ-10 | Passed | jest-results.json |
| AML-VALIDATION-015 | REQ-10: Invalid transaction inputs text amount is rejected | aml-validation.test.js | REQ-10 | Passed | jest-results.json |
| AML-VALIDATION-016 | REQ-10: Invalid transaction inputs Unsupported currency is rejected | aml-validation.test.js | REQ-10 | Passed | jest-results.json |
| AML-VALIDATION-017 | REQ-10: Invalid transaction inputs whitespace-only customer ID is rejected | aml-validation.test.js | REQ-10 | Passed | jest-results.json |
| AML-VALIDATION-018 | REQ-10: Invalid transaction inputs zero amount is rejected | aml-validation.test.js | REQ-10 | Passed | jest-results.json |
| AML-001 | REQ-08 and REQ-09: AML screening scenarios AML-DATA-01 - Amount below large-transaction threshold | aml.test.js | REQ-08 | Passed | jest-results.json |
| AML-002 | REQ-08 and REQ-09: AML screening scenarios AML-DATA-02 - Amount exactly at large-transaction threshold | aml.test.js | REQ-08 | Passed | jest-results.json |
| AML-003 | REQ-08 and REQ-09: AML screening scenarios AML-DATA-03 - Amount above large-transaction threshold | aml.test.js | REQ-08 | Passed | jest-results.json |
| AML-004 | REQ-08 and REQ-09: AML screening scenarios AML-DATA-04 - Three qualifying transactions within 24 hours | aml.test.js | REQ-09 | Passed | jest-results.json |
| AML-005 | REQ-08 and REQ-09: AML screening scenarios AML-DATA-05 - Only two qualifying transactions | aml.test.js | REQ-09 | Passed | jest-results.json |
| AML-006 | REQ-08 and REQ-09: AML screening scenarios AML-DATA-06 - Third transaction outside the 24-hour window | aml.test.js | REQ-09 | Passed | jest-results.json |
| AML-007 | REQ-08 and REQ-09: AML screening scenarios AML-DATA-07 - Qualifying transactions belong to different customers | aml.test.js | REQ-09 | Passed | jest-results.json |
| CHATBOT-INPUTS-001 | Chatbot: Empty and invalid questions empty question returns help | chatbot-inputs.test.js | REQ-03 | Passed | jest-results.json |
| CHATBOT-INPUTS-002 | Chatbot: Empty and invalid questions missing question returns help | chatbot-inputs.test.js | REQ-03 | Passed | jest-results.json |
| CHATBOT-INPUTS-003 | Chatbot: Empty and invalid questions null question returns help | chatbot-inputs.test.js | REQ-03 | Passed | jest-results.json |
| CHATBOT-INPUTS-004 | Chatbot: Empty and invalid questions numeric question returns help | chatbot-inputs.test.js | REQ-03 | Passed | jest-results.json |
| CHATBOT-INPUTS-005 | Chatbot: Empty and invalid questions whitespace-only question returns help | chatbot-inputs.test.js | REQ-03 | Passed | jest-results.json |
| CHATBOT-INPUTS-006 | KYC integration: Customer ID handling empty customer ID requests an ID | chatbot-inputs.test.js | REQ-04 | Passed | jest-results.json |
| CHATBOT-INPUTS-007 | KYC integration: Customer ID handling Missing customer ID does not call the service | chatbot-inputs.test.js | REQ-04 | Passed | jest-results.json |
| CHATBOT-INPUTS-008 | KYC integration: Customer ID handling missing customer ID requests an ID | chatbot-inputs.test.js | REQ-04 | Passed | jest-results.json |
| CHATBOT-INPUTS-009 | KYC integration: Customer ID handling Surrounding spaces in customer ID are removed | chatbot-inputs.test.js | REQ-04 | Passed | jest-results.json |
| CHATBOT-INPUTS-010 | KYC integration: Customer ID handling whitespace-only customer ID requests an ID | chatbot-inputs.test.js | REQ-04 | Passed | jest-results.json |
| CHATBOT-001 | REQ-01: Supported banking questions Account opening returns predefined guidance | chatbot.test.js | REQ-01 | Passed | jest-results.json |
| CHATBOT-002 | REQ-01: Supported banking questions KYC status returns the stored status | chatbot.test.js | REQ-01 | Passed | jest-results.json |
| CHATBOT-003 | REQ-01: Supported banking questions Transaction status returns predefined guidance | chatbot.test.js | REQ-01 | Passed | jest-results.json |
| CHATBOT-004 | REQ-02: Capitalization and surrounding spaces account opening produces the same response | chatbot.test.js | REQ-02 | Passed | jest-results.json |
| CHATBOT-005 | REQ-02: Capitalization and surrounding spaces kyc status produces the same response | chatbot.test.js | REQ-02 | Passed | jest-results.json |
| CHATBOT-006 | REQ-02: Capitalization and surrounding spaces transaction status produces the same response | chatbot.test.js | REQ-02 | Passed | jest-results.json |
| CHATBOT-007 | REQ-03: Unsupported questions Unsupported question returns the help message | chatbot.test.js | REQ-03 | Passed | jest-results.json |
| CHATBOT-008 | REQ-04: Simulated customer-service integration Known customer returns the stored Pending status | chatbot.test.js | REQ-04 | Passed | jest-results.json |
| CHATBOT-009 | REQ-04: Simulated customer-service integration Service failure returns a controlled error | chatbot.test.js | REQ-04 | Passed | jest-results.json |
| CHATBOT-010 | REQ-04: Simulated customer-service integration Unknown customer returns a not-found result | chatbot.test.js | REQ-04 | Passed | jest-results.json |
| KYC-BOUNDARY-001 | REQ-06: KYC age and date boundaries KYC-007: Customer turning exactly 18 is accepted | kyc-boundary.test.js | REQ-06 | Passed | jest-results.json |
| KYC-BOUNDARY-002 | REQ-06: KYC age and date boundaries KYC-008: Customer one day under 18 is rejected | kyc-boundary.test.js | REQ-06 | Passed | jest-results.json |
| KYC-BOUNDARY-003 | REQ-06: KYC age and date boundaries KYC-009: Impossible birth date is rejected | kyc-boundary.test.js | REQ-06 | Passed | jest-results.json |
| KYC-BOUNDARY-004 | REQ-06: KYC age and date boundaries KYC-010: Future birth date is rejected | kyc-boundary.test.js | REQ-06 | Passed | jest-results.json |
| KYC-FIELDS-001 | REQ-05: Required KYC fields Empty address is rejected | kyc-fields.test.js | REQ-05 | Passed | jest-results.json |
| KYC-FIELDS-002 | REQ-05: Required KYC fields Empty customerId is rejected | kyc-fields.test.js | REQ-05 | Passed | jest-results.json |
| KYC-FIELDS-003 | REQ-05: Required KYC fields Empty dateOfBirth is rejected | kyc-fields.test.js | REQ-05 | Passed | jest-results.json |
| KYC-FIELDS-004 | REQ-05: Required KYC fields Empty documentId is rejected | kyc-fields.test.js | REQ-05 | Passed | jest-results.json |
| KYC-FIELDS-005 | REQ-05: Required KYC fields Empty name is rejected | kyc-fields.test.js | REQ-05 | Passed | jest-results.json |
| KYC-FIELDS-006 | REQ-05: Required KYC fields Missing address is rejected | kyc-fields.test.js | REQ-05 | Passed | jest-results.json |
| KYC-FIELDS-007 | REQ-05: Required KYC fields Missing customerId is rejected | kyc-fields.test.js | REQ-05 | Passed | jest-results.json |
| KYC-FIELDS-008 | REQ-05: Required KYC fields Missing dateOfBirth is rejected | kyc-fields.test.js | REQ-05 | Passed | jest-results.json |
| KYC-FIELDS-009 | REQ-05: Required KYC fields Missing documentId is rejected | kyc-fields.test.js | REQ-05 | Passed | jest-results.json |
| KYC-FIELDS-010 | REQ-05: Required KYC fields Missing name is rejected | kyc-fields.test.js | REQ-05 | Passed | jest-results.json |
| KYC-FIELDS-011 | REQ-05: Required KYC fields Whitespace-only address is rejected | kyc-fields.test.js | REQ-05 | Passed | jest-results.json |
| KYC-FIELDS-012 | REQ-05: Required KYC fields Whitespace-only customerId is rejected | kyc-fields.test.js | REQ-05 | Passed | jest-results.json |
| KYC-FIELDS-013 | REQ-05: Required KYC fields Whitespace-only dateOfBirth is rejected | kyc-fields.test.js | REQ-05 | Passed | jest-results.json |
| KYC-FIELDS-014 | REQ-05: Required KYC fields Whitespace-only documentId is rejected | kyc-fields.test.js | REQ-05 | Passed | jest-results.json |
| KYC-FIELDS-015 | REQ-05: Required KYC fields Whitespace-only name is rejected | kyc-fields.test.js | REQ-05 | Passed | jest-results.json |
| KYC-FIELDS-016 | REQ-07: KYC document types Missing document type is rejected | kyc-fields.test.js | REQ-07 | Passed | jest-results.json |
| KYC-FIELDS-017 | REQ-07: KYC document types Supported document Driving License is accepted | kyc-fields.test.js | REQ-07 | Passed | jest-results.json |
| KYC-FIELDS-018 | REQ-07: KYC document types Supported document National ID is accepted | kyc-fields.test.js | REQ-07 | Passed | jest-results.json |
| KYC-FIELDS-019 | REQ-07: KYC document types Supported document Passport is accepted | kyc-fields.test.js | REQ-07 | Passed | jest-results.json |
| KYC-FIELDS-020 | REQ-07: KYC document types Unsupported document type is rejected | kyc-fields.test.js | REQ-07 | Passed | jest-results.json |
| KYC-001 | KYC customer validation KYC-DATA-01 - Valid adult customer | kyc.test.js | REQ-05, REQ-06, REQ-07 | Passed | jest-results.json |
| KYC-002 | KYC customer validation KYC-DATA-02 - Missing name | kyc.test.js | REQ-05 | Passed | jest-results.json |
| KYC-003 | KYC customer validation KYC-DATA-03 - Customer younger than 18 | kyc.test.js | REQ-06 | Passed | jest-results.json |
| KYC-004 | KYC customer validation KYC-DATA-04 - Unsupported document type | kyc.test.js | REQ-07 | Passed | jest-results.json |
| KYC-005 | KYC customer validation KYC-DATA-05 - Missing document ID | kyc.test.js | REQ-05 | Passed | jest-results.json |
| KYC-006 | KYC customer validation KYC-DATA-06 - Whitespace-only address | kyc.test.js | REQ-05 | Passed | jest-results.json |
| PERF-001 | 1000 transactions; 1000 evaluations; 9.822 ms | performance-check.js | REQ-11 | Passed | performance-results.json |
| PERF-002 | 10000 transactions; 10000 evaluations; 66.509 ms | performance-check.js | REQ-12 | Passed | performance-results.json |
| TRACE-001 | RTM contains all requirements and valid test references | generate-rtm.js | REQ-13 | Passed | Generated traceability reports |
