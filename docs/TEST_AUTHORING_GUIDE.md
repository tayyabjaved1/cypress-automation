# Test Authoring Guide

## 1. Spec file conventions

- Name files `*.cy.js`, one folder per module under `cypress/e2e/<module>/`.
- `describe('<Module> - <Journey>', () => {...})` — one `describe` per
  journey, not per file (a module can hold more than one file once it grows).
- Tags on the `it()` itself: `it('title', { tags: ['@smoke', '@ui'] }, () => {...})`
  — never embedded in the title string. `@smoke` for the one or two most
  important journeys per module, `@regression` for the rest, `@ui`/`@api`
  always.
- `cy.log('**label**')` before each logical step (Data preparation, the
  action, the verification) — see `docs/ARCHITECTURE.md`'s note on why
  Cypress has no true step boundary.

## 2. Example

```js
import { PracticeFormPage } from '../../pages/forms/practice-form.page';
import { StudentFactory } from '../../support/data/factories/student.factory';

describe('Forms - Practice Form', () => {
  it('submits a dynamically generated student profile', { tags: ['@regression', '@ui'] }, () => {
    cy.log('**Data preparation and initialisation**');
    const practiceFormPage = new PracticeFormPage();
    const student = StudentFactory.create();

    cy.log('**Open the Practice Form page**');
    practiceFormPage.open();

    cy.log('**Submit the generated student profile**');
    practiceFormPage.submit(student);

    cy.log('**Verify the confirmation modal shows the submitted profile**');
    practiceFormPage.expectSubmission(student);
  });
});
```

Construct page objects and factory data directly in the test body — there is
no fixture-injection layer (see `docs/DATA_FACTORY_GUIDE.md`).

## 3. Page object conventions

- One page object per unique DemoQA route.
- Every page object extends `BasePage` (`cypress/support/core/base-page.js`):
  a `path` getter, `waitForLoaded()` anchored on the page's own heading, and
  specs call `.open()` — never `cy.visit()` directly.
- Follow the selector policy in `docs/ARCHITECTURE.md` (semantic queries via
  `@testing-library/cypress` first; a raw selector only when genuinely
  nothing else resolves, with the reason documented inline).
- Assertion methods contain the `.should(...)`/`expect(...)` calls — specs
  call these, never a raw `cy.get(...).should(...)` chain of their own.

## 4. No `async`/`await` with `cy` commands

Cypress commands are enqueued, not promises — never `await cy.get(...)`.
When you need a previous command's yielded value, use `.then(value => {...})`.
Plain JavaScript (constructing a factory object, a conditional on a value you
already have) runs synchronously and needs neither.

## 5. Isolation and parallel safety

- Generate unique records per test (the data factories already do this).
- A test that creates data via the API (Book Store) cleans it up in
  `afterEach`, not relying on the account being disposable by inaction.
- Avoid `cy.wait(ms)`; prefer an assertion Cypress will retry
  (`.should('be.visible')`) over a fixed delay.
- Keep worker/parallel counts modest against public DemoQA infrastructure.

## 6. Before committing

```bash
npm run lint
npm test
```

For a focused module:

```bash
npx cypress run --spec "cypress/e2e/forms/**"
```

Inspect `cypress/reports/mochawesome-report` (or run `npm run report:allure`)
when a test fails.
