# Data Factory Guide

## Generators (`cypress/support/data/generators/common.generator.js`)

`CommonGenerator` wraps Faker for the primitives every factory needs: names,
username/email/password, phone, address, dates. Generators are
domain-agnostic — they know nothing about DemoQA.

## Factories (`cypress/support/data/factories/`)

One factory per domain object, parameter-free with override support:

```js
static create(overrides = {}) {
  return { ...generatedDefaults, ...overrides };
}
```

- A factory never makes network calls, except `BookStoreClient` (the API
  client, not a factory) which creates a real DemoQA account.
- Use overrides for scenario-specific values rather than duplicating
  factories.
- Use `StudentBuilder` when a scenario needs a readable combination of
  multiple overrides.
- DemoQA's book catalog is fixed, so `BookFactory` selects known catalog
  ISBNs rather than fabricating invalid ones.

## No fixture-injection layer — construct directly in the spec

Playwright's sibling framework injects factory data via Playwright
fixtures. Cypress has no equivalent dependency-injection mechanism for plain
JS objects — fixtures in Cypress are static JSON files loaded with
`cy.fixture()`, a different concept entirely (and not used here; this
framework's "fixtures" are all generated at runtime). Specs construct page
objects and factory data directly in their first step instead — see any spec
under `cypress/e2e/` for the pattern, and `docs/ARCHITECTURE.md` for why this
also matches core-pw-e2e-tests' own stance on fixtures ("don't use a fixture
as a parameter-hiding wrapper around a factory").

## Builders (`cypress/support/data/builders/`)

Fluent composition for a scenario that needs several related overrides at
once (`StudentBuilder.withGender().fromLocation().build()`) without a
one-off factory per combination.
