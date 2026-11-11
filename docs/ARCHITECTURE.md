# Architecture

## Goals

This is a Cypress + JavaScript reference framework demonstrated against
[DemoQA](https://demoqa.com) — deliberately built with the same scope,
layer-first layout, and conventions as the sibling
[demoqa-playwright-framework](https://github.com/tayyabjaved1/demoqa-playwright-framework),
so the two can be compared directly: same site, same four sample modules,
same data-factory design, same docs-as-code governance. Where Cypress's own
model forces a different idiom than Playwright's, that's called out
explicitly below rather than papered over.

This is a starter implementation, not a claim that every DemoQA feature is
automated. New feature-specific page objects, factories and specs are still
required as coverage expands.

## Layers

```
cypress/
  e2e/<module>/        the specs — one journey per test
  pages/<module>/      page objects — locators, actions, assertions (no API calls)
  support/
    core/               BasePage contract, the ad-overlay helper
    data/                generators / factories / builders
    api/                 API clients (Book Store)
    e2e.js, commands.js  Cypress's own required support files
```

Layer-first (`pages/<module>/`, `e2e/<module>/`), matching
core-pw-e2e-tests' and demoqa-playwright-framework's convention — one
top-level folder per layer, module as the subfolder inside it.

## Page readiness — the one real Cypress/Playwright difference

Playwright's `BasePage` holds a `page` instance per page object instance.
Cypress has no such instance — every command runs against the global `cy`,
which is already scoped to the current browser tab. `cypress/support/core/base-page.js`
mirrors the Playwright contract as closely as that difference allows:

- `path` — a getter, the page's URL relative to `baseUrl`.
- `waitForLoaded()` — **abstract**; each page implements its own, anchored on
  that page's own elements (its heading, same as the Playwright version).
- `open()` — `cy.visit(path)` + the ad-overlay dismiss + `waitForLoaded()`.
  Specs call `.open()`, not `cy.visit()` directly.

## Selector policy

Prefer, in order:

1. **`@testing-library/cypress`'s semantic queries** — `cy.findByRole`,
   `cy.findByLabelText`, `cy.findByPlaceholderText` — the direct Cypress
   equivalent of Playwright's `getByRole`/`getByLabel`/`getByPlaceholder`.
   This is an added dependency, not Cypress's own default (`cy.get` is
   CSS-selector-only out of the box) — deliberately added for the same
   reason Playwright's semantic locators are preferred: they survive markup
   churn that a raw selector doesn't.
2. **A documented raw `cy.get('#id')` or class selector** only when DemoQA's
   markup exposes no role/label/placeholder for that element. Document *why*
   inline — see `TextBoxPage`/`PracticeFormPage` for the applied examples
   (the Permanent Address field, the datepicker input, the Bootstrap modal).

Never use positional/`:nth-child` selectors. This is a third-party site —
don't invent attributes it doesn't have.

## No `test.step()` — Cypress's own command log fills that role

Playwright's `test.step()` groups a test's actions in its HTML report.
Cypress has no equivalent API, but its command log already shows every
enqueued command as a collapsible group in both the Test Runner UI and the
mochawesome/Allure reports. This framework's convention: a `cy.log('**label**')`
before each logical step, bolded with markdown so it stands out in the log —
see any spec under `cypress/e2e/` for the pattern. It's weaker than a true
step boundary (it doesn't group the commands under it, just labels where they
start), but it's the closest honest equivalent Cypress offers.

## Tags — `@cypress/grep`, not title-embedded strings

`it('title', { tags: ['@smoke', '@ui'] }, () => {...})` — Cypress's own
first-class tag syntax via the official `@cypress/grep` plugin, filtered with
`cypress run --env grepTags=@smoke` (wired as `npm run test:smoke`). Same
principle as Playwright's native `{ tag: [...] }`: never embed a tag in the
title string.

## Test integrity — assert real behaviour, never just green

A passing test must fail when the feature breaks.

- Assert the user-facing outcome the test claims (the output panel shows the
  submitted values, the confirmation modal shows the student's name), not a
  proxy that merely correlates with it.
- Prefer Cypress's own auto-retrying assertions (`.should('be.visible')`,
  `.should('contain', ...)`) over a manual wait — Cypress already retries
  these for you up to `defaultCommandTimeout`; a `cy.wait(ms)` is a smell.
- A fallback never substitutes for the action under test — if a submission
  fails, the test must fail, never route around it to reach a green end
  state by another path.

## Data strategy

Identical to demoqa-playwright-framework: each factory call creates fresh
data; collision-resistant usernames/emails reduce collisions. `BookFactory`
selects known, fixed catalog ISBNs rather than fabricating invalid ones
(DemoQA's Book Store catalog is static). The Book Store API spec creates its
own disposable account in a `beforeEach` and deletes it in `afterEach` —
Cypress's own hook model standing in for Playwright's automatic fixture
teardown (there is no Cypress fixture-injection equivalent; see
`docs/DATA_FACTORY_GUIDE.md`).

## Known limitations

- DemoQA is a public demo site, so availability, ads/overlays, rate limits
  and API behaviour can change. Run against it responsibly.
- The sample Practice Form covers the core required fields, same scope as
  the Playwright sibling. Subjects, hobbies, and state/city selection are
  planned, not automated.
- The Book Store API test needs outbound network access when run.
- UI selectors are based on DemoQA's current public markup and may need
  adjustment if the site changes.
