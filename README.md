# Cypress + Playwright parity framework

A Cypress + JavaScript E2E framework for the public [DemoQA](https://demoqa.com)
demo — built with the same architecture, scope, and conventions as the
sibling [demoqa-playwright-framework](https://github.com/tayyabjaved1/demoqa-playwright-framework),
for a direct Cypress/Playwright comparison on the same site.

## Documentation

- [Architecture and conventions](docs/ARCHITECTURE.md)
- [Test authoring guide](docs/TEST_AUTHORING_GUIDE.md)
- [Data factory guide](docs/DATA_FACTORY_GUIDE.md) / [Factory catalog](docs/FACTORY_CATALOG.md)
- [Module catalog](docs/MODULE_CATALOG.md) / [Test catalog](docs/TEST_CATALOG.md) / [Traceability](docs/TRACEABILITY.md)
- [Configuration guide](docs/CONFIGURATION.md)
- [Documentation as Code policy](docs/DOCUMENTATION_POLICY.md) / [Change impact matrix](docs/CHANGE_IMPACT_MATRIX.md)
- [Contributing](CONTRIBUTING.md)
- [Changelog](docs/CHANGELOG.md)

## Requirements
- Node.js 20+
- Java 17+ (only for `npm run report:allure*` — the Allure CLI needs it)

## Setup
```bash
npm install
cp .env.example .env
```

## Run
```bash
npm test                 # cypress run, full suite
npm run test:smoke       # @smoke-tagged tests
npm run test:regression  # @regression-tagged tests
npm run cy:open          # interactive runner
npm run lint             # eslint
npm run docs:check       # enforce documentation updates for changed code
npm run report:allure    # render + open the Allure report
```

## Architecture
- `cypress/support/core`: `BasePage` readiness contract (`path` /
  `waitForLoaded()` / `open()`), ad-overlay handling.
- `cypress/support/data`: generators, factories, builders — fresh runtime
  data per test, no fixture-injection layer (see `docs/DATA_FACTORY_GUIDE.md`).
- `cypress/support/api`: the Book Store API client.
- `cypress/pages/<module>/` + `cypress/e2e/<module>/`: layer-first, one
  subfolder per DemoQA module in each layer.

See [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) for the full picture,
including the places Cypress's own model forces a different idiom than
Playwright's (no `test.step()` equivalent, tags via `@cypress/grep` instead
of a native option, a page-object base class lighter than Playwright's since
Cypress has no `page` instance to hold).

## Why Cypress 15, not 16

Verified live, not assumed: Cypress 16.0 removes `Cypress.env()` outright,
and both `@cypress/grep` (tags) and `@shelex/cypress-allure-plugin`
(reporting) still call it internally — each crashes the whole run on 16.x.
`15.21.1` is the latest version where that API still exists, so this stays
genuinely current without shipping a broken setup. See
[docs/CONFIGURATION.md](docs/CONFIGURATION.md) and
[docs/CHANGELOG.md](docs/CHANGELOG.md).

## Current sample coverage

Same four modules as the Playwright sibling:

- Elements: Text Box
- Forms: Practice Form
- Book Store: API account and collection flow
- Factory checks: data uniqueness/overrides/builders

The remaining DemoQA sections (Alerts, Frames, Windows, Widgets and
Interactions) are planned extensions, not yet implemented.

## License

[MIT](LICENSE)
