# Banking Customer Support, KYC and AML Testing

## Project scope
This training project uses ChatGPT to assist with requirements,
synthetic data, test scenarios and reporting. JavaScript and Jest
execute the tests locally.

The application logic will be a sample implementation for learning.
KYC and AML rules below are project assumptions, not regulatory rules.
All customer and transaction data must be fictional.

## Requirements

| ID | Feature | Requirement | Acceptance criteria |
|---|---|---|---|
| REQ-01 | Chatbot | Answer supported banking questions. | Questions about account opening, KYC status and transaction status return the corresponding predefined response. |
| REQ-02 | NLP | Recognize supported intents despite differences in capitalization and surrounding spaces. | Supported phrases with changed capitalization or surrounding spaces produce the same intent. |
| REQ-03 | Chatbot fallback | Handle unsupported questions. | An unsupported question returns a help message without inventing an answer. |
| REQ-04 | Integration | Retrieve KYC status through a customer-service interface. | A known customer returns the stored status; an unknown customer returns a not-found result; a service failure returns a controlled error. |
| REQ-05 | KYC required fields | Validate customer ID, name, date of birth, address and document ID. | Missing, empty or whitespace-only required fields cause validation to fail. |
| REQ-06 | KYC age | Accept customers aged 18 or older. | A customer turning 18 on the validation date passes; a younger customer fails; an invalid or future birth date fails. |
| REQ-07 | KYC documents | Accept Passport, Driving License or National ID as document types. | Supported document types pass; unsupported or missing document types fail. |
| REQ-08 | AML large transaction | Flag a transaction of INR 100,000 or more for review. | INR 99,999 is not flagged by this rule; INR 100,000 and above are flagged. |
| REQ-09 | AML transaction pattern | Flag three or more transactions of INR 40,000 or more by the same customer within a rolling 24-hour window. | Three qualifying transactions within 24 hours are flagged; two are not; unrelated customers are evaluated separately. |
| REQ-10 | Input validation | Reject invalid transaction data. | Missing customer IDs, non-numeric or non-positive amounts, and invalid timestamps are rejected. |
| REQ-11 | Performance | Meet a proposed local processing benchmark. | Process 1,000 synthetic transactions within 2 seconds on the documented test laptop; record actual elapsed time. |
| REQ-12 | Scalability | Support a larger local batch. | Process 10,000 synthetic transactions without crashing and return an evaluation for each transaction. |
| REQ-13 | Traceability | Map requirements to test cases and execution results. | The RTM lists every requirement with its test IDs and actual execution status; untested requirements remain marked Not Run. |

## Testing limitations
Chatbot intent detection will use simple phrase matching.
Customer-service integration will be simulated.
Local batch tests do not establish production concurrency or scalability.
An AML flag means review is required; it does not prove money laundering.