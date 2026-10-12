# Project Plan

## Planning assumptions

This is an individual training project.
The team and sprint plans represent a simulated delivery scenario.
Story points use the scale 1, 2, 3, 5 and 8.
Estimates are provisional and will be reviewed as implementation progresses.
High priority means essential functionality or assignment evidence.
Medium priority means supporting performance and scale evaluation.

## Epics

| Epic ID | Epic | Requirements |
|---|---|---|
| EP-01 | Banking chatbot and customer-service integration | REQ-01 to REQ-04 |
| EP-02 | KYC customer validation | REQ-05 to REQ-07 |
| EP-03 | AML transaction screening | REQ-08 to REQ-10 |
| EP-04 | Performance, batch processing and reporting | REQ-11 to REQ-13 |

## User stories

| Story ID | Epic | User story | Requirements | Points | Priority |
|---|---|---|---|---|---|
| US-01 | EP-01 | As a customer, I want answers to supported banking questions so that I can obtain basic assistance. | REQ-01 | 3 | High |
| US-02 | EP-01 | As a customer, I want capitalization and surrounding spaces handled so that my supported questions are understood. | REQ-02 | 2 | High |
| US-03 | EP-01 | As a customer, I want a helpful fallback for unsupported questions so that I know what to do next. | REQ-03 | 1 | High |
| US-04 | EP-01 | As a customer, I want my KYC status retrieved so that I can check my verification progress. | REQ-04 | 3 | High |
| US-05 | EP-02 | As a KYC reviewer, I want incomplete customer details rejected so that required information is available. | REQ-05 | 2 | High |
| US-06 | EP-02 | As a KYC reviewer, I want age eligibility checked so that the sample minimum-age rule is enforced. | REQ-06 | 3 | High |
| US-07 | EP-02 | As a KYC reviewer, I want document types validated so that only supported types are accepted. | REQ-07 | 2 | High |
| US-08 | EP-03 | As an AML analyst, I want large transactions flagged so that they can be reviewed. | REQ-08 | 2 | High |
| US-09 | EP-03 | As an AML analyst, I want repeated qualifying transactions detected so that suspicious patterns can be reviewed. | REQ-09 | 5 | High |
| US-10 | EP-03 | As an AML analyst, I want invalid transaction inputs rejected so that screening uses valid data. | REQ-10 | 3 | High |
| US-11 | EP-04 | As a test manager, I want processing time measured so that I can assess the local performance target. | REQ-11 | 2 | Medium |
| US-12 | EP-04 | As a test manager, I want a larger transaction batch evaluated so that I can check local batch handling. | REQ-12 | 2 | Medium |
| US-13 | EP-04 | As a test manager, I want requirements linked to actual test results so that I can identify coverage gaps. | REQ-13 | 3 | High |

Each story inherits the acceptance criteria of its linked requirements.
Synthetic data generation and test creation are tasks within the stories.

## Estimation rationale

- 1 point: a simple fallback response.
- 2 points: straightforward validation or a processing check.
- 3 points: several conditions, date boundaries, integration errors or report mapping.
- 5 points: grouping transactions by customer and evaluating rolling time windows.

## Proposed sprint plan

These are simulated one-week sprints, not completed delivery records.

| Sprint | Stories | Total points | Planned outcome |
|---|---|---|---|
| Sprint 1 | US-05, US-06, US-07 | 7 | Generate fictional KYC data, implement validation and execute KYC tests. |
| Sprint 2 | US-08, US-09, US-10 | 10 | Generate fictional AML transactions, implement screening and execute AML tests. |
| Sprint 3 | US-01, US-02, US-03, US-04 | 9 | Implement the basic chatbot and simulated customer-service integration, then test them. |
| Sprint 4 | US-11, US-12, US-13 | 7 | Measure batch processing, generate execution reports and complete the RTM. |

Total planned effort: 33 story points.
Sprint allocations are initial estimates, not measured team capacity.
Requirements and test IDs will be maintained throughout all sprints.

## Definition of Done

- The linked acceptance criteria are implemented.
- Positive, negative and relevant boundary tests are executed.
- Test results are recorded accurately, including failures.
- The RTM is updated.
- Known limitations and unresolved defects are documented.
- No real customer data is used.

## Progress monitoring

Track each story as:
To Do -> In Progress -> Testing -> Done

After each work session, record:
- Work completed.
- Actual test results.
- Blockers or defects.
- The next action.

Current status:
- Local setup: complete.
- Jest setup test: passed.
- Requirements baseline: documented.
- Feature implementation and tests: not started.

## Simulated team-member departure and plan adjustment

Scenario:
The team member responsible for chatbot integration leaves before Sprint 3.

Proposed resolution:
1. Review unfinished work and available handover notes.
2. Discuss remaining capacity and ownership with the team.
3. Reassign US-04 to an available developer.
4. Retain the agreed simulated integration scope.
5. Move US-12 from Sprint 4 to a proposed Sprint 5.
6. Use the released Sprint 4 capacity for integration spillover if needed.
7. Review the revised forecast with stakeholders.

US-12 remains in scope.
This is a planning exercise, not an event that occurred in this project.
Actual progress and adjustments will be recorded separately.
## Prompt 2: Project planning

Convert REQ-01 through REQ-13 into epics and user stories.
Map each story to its requirements, estimate relative effort using
Fibonacci story points, assign priorities and propose sprint allocations.

Include a Definition of Done, progress monitoring and a clearly
labelled simulated team-member departure with a revised plan.
Do not claim that planned work or simulated events actually occurred.

## Review of the generated plan

Checked requirement coverage and story-point totals.
Accepted the plan as provisional.
Actual execution evidence will be added as work progresses.

## Execution update: KYC

- Implemented required-field, age and document-type validation.
- Generated six fictional customer scenarios.
- Executed positive, negative and boundary tests.
- Actual result: 4 test suites passed; 31 tests passed.
- This includes 30 KYC tests and 1 setup test.
- Latest overall Jest execution time: 1.833 seconds.
- Resolved an import-path error by moving tests to the project root.
- US-05, US-06 and US-07: Testing complete; RTM mapping pending.
- Next activity: generate synthetic AML transactions.
## Execution update: AML

- Generated seven fictional AML scenarios.
- Implemented large-transaction and repeated-transaction screening.
- Implemented input validation for customer IDs, amounts, currencies
  and timestamps.
- Tested the exact 24-hour boundary, amounts below the qualifying
  threshold, unsorted inputs and rolling-window detection.
- Actual result: 6 test suites passed; 56 tests passed.
- Total: 30 KYC tests, 25 AML tests and 1 setup test.
- Latest overall Jest execution time: 3.641 seconds.
- Jest execution time is not an AML processing benchmark.
- US-08, US-09 and US-10: current tests passed; RTM mapping pending.
- Next activity: implement and test the banking chatbot.
## Execution update: Banking chatbot

- Implemented predefined responses for account opening,
  KYC status and transaction status.
- Implemented capitalization and surrounding-space normalization.
- Added a help response for unsupported, empty and invalid questions.
- Integrated a simulated customer service using fictional KYC statuses.
- Tested known customers, unknown customers and service failure.
- Tested missing customer IDs and surrounding spaces in customer IDs.
- Confirmed that a missing customer ID does not call the service.
- Actual result: 8 test suites passed; 76 tests passed.
- Total: 30 KYC, 25 AML, 20 chatbot/integration and 1 setup test.
- Latest overall Jest execution time: 5.975 seconds.
- This execution time is not a feature processing benchmark.
- US-01 through US-04: current tests passed; RTM mapping pending.
- Limitations: exact supported phrases only, simulated integration,
  and predefined transaction-status guidance without transaction lookup.
- Next activity: dedicated local performance and batch evaluation.
## Execution update: Local performance and batch evaluation

- REQ-11: processed 1,000 synthetic transactions in 9.822 ms.
- Returned 1,000 evaluations.
- Result: Passed against the proposed 2,000 ms target.
- REQ-12: processed 10,000 synthetic transactions in 66.509 ms.
- Returned 10,000 evaluations without crashing.
- Result: Passed.
- Evidence: reports/performance-results.json.
- Laptop environment details are recorded in the evidence file.
- Measurements cover AML screening only.
- Data generation and report writing are excluded from timing.
- Each batch was measured once using 100 fictional customers.
- These results describe local batch processing, not production
  performance or concurrent-user load.
- US-11 and US-12: checks passed; RTM mapping pending.
- Next activity: export Jest results and complete requirement traceability.
## Execution update: Traceability

- Exported actual Jest results to reports/jest-results.json.
- Generated reports/test-register.md with 79 checks.
- Generated reports/rtm.md covering REQ-01 through REQ-13.
- Every requirement has mapped checks with Passed execution status.
- TRACE-001 passed the RTM structure and reference checks.
- Some tests map to multiple requirements.
- Passed statuses describe the mapped checks, not exhaustive coverage.
- Acceptance-criteria coverage review remains pending.
- Next activity: prepare project documentation and review submission
  against the institute's assignment requirements.