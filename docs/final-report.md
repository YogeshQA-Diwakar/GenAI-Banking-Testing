# Final Project Report: GenAI in Software Testing

## Assignment scenario

For this assignment, I assumed the role of a Test Manager at
TechSpark Solutions, using generative AI tools to support requirements
gathering, project planning, synthetic data generation, test development,
execution reporting and requirement traceability.

TechSpark Solutions is the organization named in the assignment scenario.
This project is an individual training exercise.

## 1. Project overview

This individual training project demonstrates how generative AI can
support requirements gathering, project planning, synthetic data
generation, test development and execution reporting.

The banking prototype includes KYC validation, AML screening and a
customer-support chatbot with simulated customer-service integration.

ChatGPT supported drafting and code development. JavaScript implemented
the prototype and reporting scripts, Faker generated fictional data
fields, and Jest executed unit and integration checks.

## 2. Requirements gathering

AI-assisted prompts produced 13 requirements covering chatbot responses,
phrase normalization, fallback handling, simulated integration, KYC,
AML, performance, batch processing and traceability.

Acceptance criteria defined observable outcomes and boundaries.
Sample banking rules and local performance targets were explicitly
treated as training assumptions.

The requirements are documented in docs/requirements.md.

## 3. Epics and user stories

The requirements were organized into four epics:

- Banking chatbot and customer-service integration.
- KYC customer validation.
- AML transaction screening.
- Performance, batch processing and reporting.

Thirteen user stories connected customer, reviewer, analyst and
test-manager needs to the requirements.

The planning details are recorded in docs/project-plan.md.

## 4. Estimation and prioritization

Stories used relative estimates of 1, 2, 3 and 5 points, totaling
33 story points.

Simple fallback behavior received a smaller estimate.
Validation and integration received larger estimates where several
conditions or errors needed handling.
Rolling-window AML detection received the largest estimate because
it required customer grouping, sorting and time-window evaluation.

Essential functionality and traceability were prioritized High.
Local performance and larger-batch evaluation were prioritized Medium.

These estimates were provisional planning judgments, not measured hours.

## 5. Sprint planning and progress monitoring

The proposed delivery plan contained four simulated one-week sprints:

- Sprint 1: KYC implementation and testing — 7 points.
- Sprint 2: AML implementation and testing — 10 points.
- Sprint 3: Chatbot and simulated integration — 9 points.
- Sprint 4: Performance and reporting — 7 points.

Actual work was recorded through execution updates containing completed
activities, test results, unresolved work and next actions.

The work followed these functional stages. The project does not claim
that four calendar sprints or a real team delivery occurred.

## 6. Simulated team-member departure and plan adjustment

A planning scenario assumed that the chatbot integration owner left
before Sprint 3.

The proposed response was to review handover information, discuss
capacity and ownership, reassign US-04 and retain the agreed simulated
integration scope.

US-12 was moved to a proposed Sprint 5, releasing Sprint 4 capacity
for possible integration spillover. The revised forecast would be
reviewed with stakeholders.

This was a simulated planning exercise. No actual team-member departure
or stakeholder approval is claimed.

## 7. Synthetic data and test design

The KYC generator created six fictional scenarios using a fixed seed
and validation date. Positive, negative and boundary tests covered
required fields, document types and age eligibility.

The AML generator created seven scenarios using fictional transaction
IDs and deliberately selected amounts and timestamps.

Additional AML tests covered invalid input, the inclusive 24-hour
boundary, transactions below the qualifying amount, unsorted input
and a qualifying window following an older transaction.

Chatbot tests covered supported phrases, capitalization, surrounding
spaces, fallback responses, customer ID handling and service failure.

Expected outcomes were defined before execution and kept separate
from actual test results.

## 8. Recorded execution results

The latest exported Jest execution reported:

- 8 test suites passed.
- 76 tests passed.
- Breakdown: 30 KYC, 25 AML, 20 chatbot/integration and 1 setup test.
- Overall Jest execution time: 3.5 seconds.

Dedicated local processing checks reported:

| Requirement | Transactions | Evaluations | Processing time | Result |
|---|---:|---:|---:|---|
| REQ-11 | 1,000 | 1,000 | 9.822 ms | Passed |
| REQ-12 | 10,000 | 10,000 | 66.509 ms | Passed |

REQ-11 met the proposed 2,000 ms target.
REQ-12 completed without crashing and returned one evaluation per input.

The processing timer excluded data generation and report writing.
Environment details were saved with the performance evidence.
Each batch was measured once.

## 9. Reporting and traceability

JavaScript generated a test register and RTM from saved execution data.

The register contains 79 checks:
76 Jest tests, 2 performance checks and 1 traceability structure check.

All 13 requirements have mapped checks with Passed execution status.
Some checks support more than one requirement.

TRACE-001 validated report structure, unique IDs and mapping references.
It does not independently establish that every acceptance criterion
has exhaustive test coverage.

## 10. Challenges and resolutions

An import-path error occurred because the tests folder was placed inside
another folder. Moving it directly into the project root resolved the
problem. Subsequent Jest executions passed.

Repeatability was improved with fixed Faker seeds, a fixed KYC reference
date and deterministic performance data.

Specific rejection reasons were asserted in tests to reduce the risk
of accepting a failure caused by the wrong validation rule.

Integration failure was deliberately simulated to verify that the
chatbot returned a controlled error rather than exposing an exception.

## 11. Critical analysis of generative AI use

ChatGPT helped translate requirements into planning artifacts, draft
synthetic-data generators, develop tests and automate reporting.

Human review remained necessary to check assumptions, file locations,
test expectations and execution evidence.

No measured comparison with a non-AI workflow was performed.
Therefore, this project does not claim a quantified productivity gain.

Passing tests demonstrate the observed behavior of the implemented
training prototype. They do not demonstrate production banking
readiness or regulatory compliance.

## 12. Limitations and future improvements

- KYC and AML rules are sample assumptions.
- The chatbot uses exact phrase matching after normalization.
- Integration uses fictional stored records.
- Transaction-status guidance does not retrieve live transactions.
- Performance evidence consists of single-run local batch measurements.
- Test IDs may change when test names or files change.
- Acceptance-criteria coverage needs a final manual review.

Future improvements could include broader language recognition,
additional malformed-input tests, repeated performance measurements,
a real service contract and stable test IDs maintained in test definitions.

## 13. Evidence locations

- docs/requirements.md
- docs/project-plan.md
- docs/ai-prompts.md
- reports/jest-results.json
- reports/performance-results.json
- reports/test-register.md
- reports/rtm.md
- src/
- tests/
- data/