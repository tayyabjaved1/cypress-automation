# Module Catalog

Only modules with code in the repository are marked `Implemented`. Planned
modules must not be represented as completed automation. Centralized here
rather than one file per module, matching core-pw-e2e-tests' approach — a
handful of `docs/*.md` files, no per-module READMEs — and the same choice
made later in demoqa-playwright-framework and orangehrm-playwright-framework.

| Module | Current implementation | Coverage | Status |
|---|---|---|---|
| [Elements](#elements) | Text Box Page Object and spec | Submit values and verify output | Implemented (partial) |
| [Forms](#forms) | Practice Form Page Object and spec | Dynamic student data and form submission | Implemented (partial) |
| [Book Store](#book-store) | API client and API spec | Account/token and collection workflow | Implemented (partial) |
| [Factory checks](#factory-checks-data-factory-engine) | Factory behavior specs | Uniqueness, overrides and builder behavior | Implemented |
| Alerts, Frames & Windows | Not yet implemented | Planned | Planned |
| Widgets | Not yet implemented | Planned | Planned |
| Interactions | Not yet implemented | Planned | Planned |

## Module conventions

Each implemented module keeps its Page Objects under `cypress/pages/<module>/`
and its specs under `cypress/e2e/<module>/` — layer-first. Factories (only
when domain-specific data is needed) live in the shared
`cypress/support/data/factories/`, not inside the module folder.

Add a section below (copy the structure of an existing one) when a module is
introduced — see `docs/templates/MODULE_SECTION.template.md`.

---

## Elements

**Scope.** The Elements section's Text Box widget: fill in a name, email and
two addresses, submit, and verify DemoQA echoes the submitted values back in
the output panel.

**Navigation.** `/text-box`. No preconditions — unauthenticated, public page.

**Architecture.** `pages/elements/text-box.page.js` (`TextBoxPage`) — extends
`BasePage`, `waitForLoaded()` anchored on the `Text Box` heading. `open()`
navigates, clears DemoQA's ad overlay, then waits. Factory:
`FormFactory.textBox()` (`support/data/factories/form.factory.js`).

**Test data.** `fullName`, `email`, `currentAddress`, `permanentAddress`.
Each factory call generates fresh values — no fixed personal data, no
cross-test reuse.

**Lifecycle.** Nothing persisted server-side; DemoQA reflects the submitted
form back on the same page. No teardown required.

**Coverage** (`cypress/e2e/elements/text-box.cy.js`): submit generated data,
verify the output panel shows every field — `@smoke @ui`.

**Known limitations.**
- Only the Text Box widget is implemented. Check Box, Radio Button, Web
  Tables, Buttons, Links, Broken Links/Images, Upload and Download, and
  Dynamic Properties are planned, not automated.
- The **Permanent Address** field exposes no placeholder or accessible name
  on the live site (unlike every other field) — `TextBoxPage.submit()` falls
  back to the raw `#permanentAddress` id for that one field.
- DemoQA's ad banner/iframes can overlap this page and intercept clicks;
  `BasePage.open()` clears them best-effort (`support/core/ad-overlay.js`).

## Forms

**Scope.** The Practice Form: submit a generated student profile (name,
email, gender, mobile, date of birth, address) and verify the confirmation
modal echoes it back.

**Navigation.** `/automation-practice-form`. No preconditions —
unauthenticated, public page.

**Architecture.** `pages/forms/practice-form.page.js` (`PracticeFormPage`) —
extends `BasePage`, `waitForLoaded()` anchored on the `Practice Form`
heading. Factory: `StudentFactory.create()`
(`support/data/factories/student.factory.js`); `StudentBuilder`
(`support/data/builders/student.builder.js`) is available for scenario
variants (gender, location, subjects) without a one-off factory per variant.

**Test data.** `StudentData` extends the base user shape with `gender`,
`mobile`, `dateOfBirth`, `subjects`, `hobbies`, `address`, `state`, `city`.
`state`/`city` default to `'NCR'`/`'Delhi'`, override via the factory or
`StudentBuilder.fromLocation()`.

**Lifecycle.** Nothing persisted server-side; DemoQA renders the
confirmation modal from the submitted form data only. No teardown required.

**Coverage** (`cypress/e2e/forms/practice-form.cy.js`): submit a generated
profile, verify the confirmation modal shows name/email/mobile —
`@regression @ui`.

**Known limitations.**
- The sample only drives the fields required to reach the confirmation
  modal. `subjects`, `hobbies`, and the state/city dropdowns exist on the
  data shape but aren't yet exercised by `submit()` or asserted in
  `expectSubmission()`.
- `#dateOfBirthInput` is a third-party `react-datepicker` field with no
  accessible label or placeholder — falls back to its raw id.
- The confirmation modal (`.modal-content`) is Bootstrap markup with no
  distinguishing accessible name, so it's also a documented raw-selector
  fallback.

## Book Store

**Scope.** The Book Store API: create a disposable account, generate an auth
token, add a catalog book to the account's collection, and verify it
appears — end to end, no UI.

**Navigation.** No entry route — API-only, driven against `Cypress.env('API_BASE_URL')`.
Requires outbound network access to the public DemoQA API. No persistent
account — each test provisions and tears down its own via
`beforeEach`/`afterEach`.

**Architecture.** No Page Objects (never touches the browser). Factories:
`UserFactory.bookstoreUser()` (account credentials), `BookFactory.catalog()` /
`BookFactory.first()` (known catalog ISBNs). API client: `BookStoreClient`
(`support/api/bookstore.client.js`) — every method returns the `cy.request(...)`
chain and throws on a non-2xx status.

**Test data.** `beforeEach` calls `BookStoreClient.createAccount()` with a
fresh `UserFactory.bookstoreUser()`; `afterEach` deletes it. DemoQA's catalog
is fixed, so the factory selects known valid ISBNs rather than fabricating
invalid ones.

**Lifecycle.** The account created in `beforeEach` is deleted in `afterEach`
regardless of test outcome. `deleteAccount()` tolerates a `404` (already
gone) but throws on any other failure.

**Coverage** (`cypress/e2e/bookstore/bookstore-api.cy.js`): add a catalog
book to a fresh account, verify it's in the collection — `@api @regression`.

**Known limitations.**
- Hits the live public DemoQA API; availability, rate limits, and response
  shape are outside this repo's control.
- Catalog ISBNs are fixed by the application.
- No search, update, or multi-book removal scenarios yet — only
  add-and-verify.

## Factory checks (Data Factory Engine)

**Scope.** Unit-like checks of the data layer itself — not a DemoQA page or
API. Verifies the factories every other module depends on actually generate
unique data, support role presets/overrides, and compose fluently through
builders.

**Navigation.** No entry route — no browser, no network.

**Architecture.** No Page Objects, no API clients. Factories exercised:
`UserFactory` (create/admin/bookstoreUser), `StudentFactory.create()`,
`StudentBuilder`.

**Test data.** These tests call the factories directly to assert their own
contract: fresh `id`/`email`/`username` per call, `UserFactory.admin()`
setting `role: 'admin'`, override objects reaching the returned data, and
`StudentBuilder`'s fluent chain producing the same shape as the underlying
factory.

**Lifecycle.** Nothing persisted — pure in-memory data generation.

**Coverage** (`cypress/e2e/factories/factory.cy.js`), three scenarios:
uniqueness, role presets/overrides, fluent builder composition — all
`@regression`.

**Known limitations.**
- Deliberately decoupled from the browser — these are checks on the factory
  layer in isolation.
- Covers `UserFactory`/`StudentFactory`/`StudentBuilder` only; `FormFactory`
  and `BookFactory` have no equivalent standalone checks yet (exercised
  indirectly through the Elements, Forms, and Book Store specs).
