# Configuration

## Environment variables

| Variable | Purpose |
|---|---|
| `BASE_URL` | Target instance — defaults to the public DemoQA site |
| `API_BASE_URL` | API base — defaults to the same DemoQA origin |

Both are read in `cypress.config.js` from `process.env` at config-load time
(Node side), then re-exposed to spec code via `expose` (see below) — never
hardcode a URL in a page object or spec.

## `cypress.config.js`

- **`baseUrl`** — DemoQA's public site.
- **`expose: { API_BASE_URL }`** — `Cypress.env()` was removed in Cypress
  16.0 (deprecated starting 15.21); `Cypress.expose(key)` is its replacement
  for a non-sensitive, synchronously-readable value. This framework pins to
  the latest Cypress **15.x** specifically because the two community plugins
  it depends on for reporting and tagging (`@shelex/cypress-allure-plugin`,
  `@cypress/grep`) still call the now-fully-removed `Cypress.env()`
  internally and crash outright on Cypress 16 — verified live, not assumed.
  Revisit the pin once both plugins ship a fix; see `docs/CHANGELOG.md`.
- **`retries: { runMode: 2, openMode: 0 }`** — CI retries twice; local
  interactive runs don't, so a real failure is visible immediately.
- **`defaultCommandTimeout: 10_000`** — DemoQA's own responsiveness as a
  public demo site, not a fixed app-specific budget.
- **Reporters**: `cypress-mochawesome-reporter` (local HTML report,
  `cypress/reports/mochawesome-report/`) + `@shelex/cypress-allure-plugin`
  (raw results to `allure-results/`, rendered via `npm run report:allure*`).
  `cypress-mochawesome-reporter/plugin` registers its own
  `before:run`/`after:run` hooks internally — **do not** also register them
  in `setupNodeEvents`, or the report merge runs twice and the second pass
  fails (verified live: this was a real bug in an earlier draft of this
  config).
- **`@cypress/grep`** — registered both in `setupNodeEvents` (filters which
  specs CI actually runs) and imported in `cypress/support/e2e.js` (filters
  which `it()`s inside a loaded spec actually run).

## CI (`.github/workflows/`)

- `cypress.yml` — installs deps, lints, runs the suite via
  `cypress-io/github-action`, generates the Allure report, uploads both the
  mochawesome and Allure reports as artifacts.
- `docs-check.yml` — runs `scripts/check-docs-changes.mjs` against the PR
  diff; see `docs/DOCUMENTATION_POLICY.md`.
