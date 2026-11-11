# Changelog

Notable framework changes are recorded here.

## 2.0.0 - Full architecture revamp

Replaces the old training-exercise content (`cypress/e2e/First-Module/`,
OpenCart specs, placeholder AIO Tests/Jira config) with a from-scratch
framework matching the architecture, scope, and conventions of the sibling
`demoqa-playwright-framework` — same site, same four sample modules
(Elements, Forms, Book Store, Factory checks), same documentation-as-code
governance, so the two can be compared directly.

- Upgraded Cypress from `10.11.0` to the latest `15.x` — six majors behind,
  now current, with one deliberate exception: **not** pinned to the newest
  `16.x`. Verified live that `16.0` removes `Cypress.env()` outright, which
  both `@cypress/grep` (tags) and `@shelex/cypress-allure-plugin` still call
  internally — each crashes the whole run on `16.x` as a result. `15.21.1`
  is the latest version where that API still exists (deprecated, not yet
  removed), so this stays genuinely current without shipping a broken
  reporting/tagging setup. See `docs/CONFIGURATION.md`.
- Layer-first structure: `cypress/pages/<module>/` + `cypress/e2e/<module>/`,
  replacing the old flat `PageObjects/` + `First-Module/2-trainings/` layout.
- `BasePage` contract (`path` / `waitForLoaded()` / `open()`), ad-overlay
  handling, a data layer (generators/factories/builders), and an API client
  for the Book Store — all mirroring the Playwright sibling's design,
  translated to Cypress idiom (no `test.step()` equivalent exists; a
  `cy.log('**label**')` convention stands in — see `docs/ARCHITECTURE.md`).
- `@cypress/grep` for native tags, replacing nothing (the old repo had no
  tagging at all).
- Full docs-as-code governance set (architecture, test authoring guide,
  module/factory catalogs, traceability, change-impact matrix, docs-check CI
  gate, PR template) — centralized in `docs/MODULE_CATALOG.md`, not a README
  per module (a lesson carried over from the Playwright frameworks' own
  revision history).
- Removed the old `cypress-aiotests-reporter`/Jira AIO Tests integration —
  it was never actually configured (`"your AIO project Key"` placeholder
  literally left in the shipped config) and added dead weight; kept
  `cypress-mochawesome-reporter` (upgraded to v4) and added
  `@shelex/cypress-allure-plugin` for parity with the Playwright frameworks'
  reporting.
- Fixed a real bug found while verifying this build against the live site:
  `PracticeFormPage` originally cleared the DOB field before typing a new
  date; DemoQA's `react-datepicker` crashes the whole app
  (`Cannot read properties of null (reading 'getMonth')`) when that field is
  briefly empty. Fixed by overwriting via select-all instead of clearing.
  This also led to **not** blanket-suppressing `uncaught:exception` (a very
  common Cypress boilerplate pattern) — doing so had been masking exactly
  this crash, turning a clear root cause into a confusing "element not
  found" failure instead.

Verified: `npm run lint` clean; full suite passing against the live site,
including tag-filtered runs (`npm run test:smoke`).

## 1.0.0 - Training-exercise scaffold (superseded)

The original repo: Cypress 10.11, OpenCart + DemoQA practice specs under
`First-Module/2-trainings/`, a flat `PageObjects/` folder, unconfigured
mochawesome/AIO Tests/Cypress Dashboard placeholders. Superseded entirely by
2.0.0 above.
