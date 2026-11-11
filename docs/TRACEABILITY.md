# Requirement-to-Test Traceability

| Requirement ID | Requirement / behavior | Automated test | Status |
|---|---|---|---|
| ELM-TB-001 | User can submit text-box details and see the submitted values | `cypress/e2e/elements/text-box.cy.js` | Implemented |
| FRM-PF-001 | User can submit a valid practice form | `cypress/e2e/forms/practice-form.cy.js` | Implemented |
| BKS-API-001 | A Book Store API user can be created and authenticated | `cypress/e2e/bookstore/bookstore-api.cy.js` | Implemented |
| BKS-API-002 | Authenticated user can manage a book collection | `cypress/e2e/bookstore/bookstore-api.cy.js` | Implemented |
| DAT-FAC-001 | Factories produce fresh unique identifiers and support overrides | `cypress/e2e/factories/factory.cy.js` | Implemented |

## Rules

- Give each meaningful scenario a stable requirement ID.
- Keep requirement-to-test links current when specs are renamed, split,
  merged, or removed.
- Mark requirements with no automation as `Not automated` or `Blocked`;
  never imply coverage.
