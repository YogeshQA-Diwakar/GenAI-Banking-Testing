# Generative AI Prompt Log

## Prompt 1: Requirements generation

Create measurable requirements for a beginner JavaScript testing
project covering a banking customer-support chatbot, basic intent
recognition, customer-service integration, KYC validation, AML
transaction screening, performance and scalability.

Assign requirement IDs and acceptance criteria. Clearly identify
sample business rules and simulated functionality. Make the
requirements suitable for later mapping to Jest tests and an RTM.

## Review of the generated output

Accepted as the initial training-project baseline.
KYC and AML thresholds are sample assumptions.
Integration will be simulated, and performance results will describe
only the local test environment.
## Prompt 3: Generate synthetic KYC data

Write a beginner-friendly JavaScript script using Faker to generate
fictional KYC customer data. Include a valid adult customer and
negative scenarios for missing name, underage customer, unsupported
document type, missing document ID and whitespace-only address.

Use a fixed seed and validation date for repeatability.
Save the scenarios and expected outcomes to a JSON file.
Expected outcomes must not be presented as executed test results.

## Review

The script includes six scenarios.
Generated data and script execution will be checked locally.
Additional boundary scenarios will be added during test development.
## Prompt 4: KYC implementation and testing

Create a beginner-friendly JavaScript KYC validator for REQ-05,
REQ-06 and REQ-07. Use Jest to test generated customer scenarios,
missing and blank required fields, supported and unsupported document
types, exact age boundaries, impossible dates and future birth dates.

Use a fixed validation date and check specific rejection reasons.

## Review and execution

Reviewed the generated code against the acceptance criteria.
Corrected the test-folder location after an import error.
Actual result: 30 KYC tests and 1 setup test passed.
RTM mapping remains pending.
## Prompt 5: AML data, screening and testing

Generate fictional AML transactions using Faker.
Implement sample rules that flag customers with a transaction of
INR 100,000 or more, or at least three transactions of INR 40,000
or more within an inclusive rolling 24-hour window.

Validate customer IDs, positive finite amounts, INR currency and
valid UTC timestamps. Reject the batch when an input is invalid.

Create Jest tests for positive, negative, boundary and unsorted-input
scenarios. These rules are training assumptions, not regulatory rules.

## Review and execution

Actual result: all 25 AML tests passed.
Overall result: 56 tests passed across 6 suites.
RTM mapping and dedicated performance measurements remain pending.
## Prompt 6: Banking chatbot and simulated integration

Implement REQ-01 through REQ-04 in beginner-friendly JavaScript.

Recognize the phrases account opening, kyc status and transaction status.
Ignore capitalization and surrounding spaces.
Return predefined guidance and a help message for unsupported questions.

Retrieve fictional KYC statuses through a simulated customer-service
interface. Handle known customers, unknown customers, missing customer
IDs and service failures.

Create Jest tests for these behaviors, including empty and invalid
questions. Verify that missing customer IDs do not call the service.

## Review and execution

Actual result: all 20 chatbot/integration tests passed.
Overall result: 76 tests passed across 8 suites.
The implementation uses phrase matching, not a trained NLP model.
Customer-service integration is simulated.
RTM mapping remains pending.
## Prompt 7: Local performance and batch evaluation

Create a JavaScript script to measure AML screening with
1,000 and 10,000 deterministic synthetic transactions.

For REQ-11, compare actual processing time against 2 seconds.
For REQ-12, confirm that every transaction receives an evaluation.

Exclude data generation and report writing from processing time.
Save actual measurements, pass/fail results, environment details
and measurement limitations to a JSON report.

## Review and execution

REQ-11: 1,000 transactions, 1,000 evaluations, 9.822 ms, Passed.
REQ-12: 10,000 transactions, 10,000 evaluations, 66.509 ms, Passed.
Evidence saved in reports/performance-results.json.
Results represent one local execution per batch.
## Prompt 8: Requirement traceability

Read the saved Jest and local performance results.
Generate a test register with individual test IDs, names,
requirement mappings, actual statuses and evidence references.

Generate an RTM covering REQ-01 through REQ-13.
Keep requirements without executed evidence marked Not Run.
Validate requirement IDs, unique test IDs and mapping references.
Do not present passing mapped tests as proof of exhaustive coverage.

## Review and execution

Generated a register containing 79 checks.
All 13 requirements have mapped checks with Passed status.
TRACE-001 passed the structure and reference checks.
Acceptance-criteria coverage review remains pending.