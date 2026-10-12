# GenAI in Software Testing — Banking Training Project

Assignment role: Test Manager at TechSpark Solutions.
This project was completed as an individual training exercise.

A JavaScript training project using ChatGPT-assisted development,
Faker synthetic data and Jest testing.

## Features

- KYC required-field, age and document-type validation.
- AML large-transaction and repeated-transaction screening.
- Banking chatbot with predefined responses.
- Simulated customer-service integration for KYC status.
- Local processing measurements and requirement traceability.

## Tools

- Node.js and npm
- JavaScript
- Jest
- @faker-js/faker
- Visual Studio Code
- ChatGPT

AI prompts and review notes are documented in docs/ai-prompts.md.

## Project folders

| Folder | Contents |
|---|---|
| src | Application code, data generators and reporting scripts |
| tests | KYC, AML and chatbot Jest tests |
| data | Generated fictional customer and transaction scenarios |
| docs | Requirements, planning and AI prompt records |
| reports | Execution evidence, performance results and RTM |

The project root also contains setup.test.js and npm package files.

## Installation

Install Node.js, then open a terminal in the project folder:

```bash
npm ci
```

## Generate synthetic data

```bash
node src/generate-kyc-data.js
node src/generate-aml-data.js
```

## Run tests and generate reports

Run these commands one at a time:

```bash
npm test -- --json --outputFile=reports/jest-results.json
node src/performance-check.js
node src/generate-rtm.js
```

The reports folder must exist before exporting Jest results.
For a fresh checkout, run the performance script first to create it.

Regenerate execution evidence and traceability reports after changes.

## Recorded execution results

- Jest: 76 tests passed across 8 suites.
- REQ-11: 1,000 transactions screened in 9.822 ms;
  1,000 evaluations returned.
- REQ-12: 10,000 transactions screened in 66.509 ms;
  10,000 evaluations returned.
- Test register: 79 checks.
- RTM: all 13 requirements have mapped checks with Passed status.

These results describe the recorded local executions.
Future runs may produce different timings or statuses.

## Limitations

- Data is fictional and intended for training only.
- KYC and AML rules are sample assumptions, not regulatory guidance.
- The chatbot recognizes exact supported phrases after normalization.
- Customer-service integration uses stored fictional records.
- Transaction-status responses provide guidance without live lookup.
- Performance results cover single-run local batch processing.
- Passing mapped checks do not establish exhaustive test coverage.
- Sprint plans and team-member departure are simulated exercises.