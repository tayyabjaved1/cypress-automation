# Test Catalog

Human-readable index of current automation. Keep synchronized with the
actual spec files — a test is not `Implemented` unless its spec exists and
passes.

| Module | Spec | Scenario | Tags |
|---|---|---|---|
| Elements | `cypress/e2e/elements/text-box.cy.js` | Submit generated text-box data and verify displayed output | `@smoke @ui` |
| Forms | `cypress/e2e/forms/practice-form.cy.js` | Submit generated student form data and verify confirmation | `@regression @ui` |
| Book Store | `cypress/e2e/bookstore/bookstore-api.cy.js` | Create account/token and exercise book collection API flow | `@api @regression` |
| Factories | `cypress/e2e/factories/factory.cy.js` | Verify generated data and factory customization behavior (3 scenarios) | `@regression` |

Tags are set via `@cypress/grep`'s native `{ tags: [...] }` option on each
`it()`, not embedded in the title string.

## Rules

- Add a row for every new spec or meaningful scenario.
- Remove rows when tests are deleted.
- State explicitly when a module's coverage is read-only or partial, rather
  than omitting a row.
