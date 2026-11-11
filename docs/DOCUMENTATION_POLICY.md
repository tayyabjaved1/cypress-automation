# Documentation as Code Policy

Documentation is maintained as part of the product, not a one-time handover.
A code change is not complete until the relevant documentation describes the
new behavior.

## Source of truth

- Executable behavior is authoritative for implementation details.
- `docs/` explains architecture, conventions, and coverage.
- Each module has a section in `docs/MODULE_CATALOG.md` — centralized, not a
  README per module.
- `docs/TEST_CATALOG.md` and `docs/TRACEABILITY.md` describe current
  automated scenarios. A removed test is removed from both in the same
  change.
- `docs/CHANGELOG.md` records notable framework/coverage changes.

## Required update matrix

| Change | Required documentation |
|---|---|
| New/changed/removed spec | `docs/TEST_CATALOG.md`, `docs/TRACEABILITY.md`, that module's `docs/MODULE_CATALOG.md` section |
| New/changed/removed factory/builder | `docs/DATA_FACTORY_GUIDE.md`, `docs/FACTORY_CATALOG.md` |
| New/changed/removed module or page object | `docs/MODULE_CATALOG.md` (summary table row + section) |
| Playwright/Cypress/npm/env/CI configuration change | `README.md`, `docs/CONFIGURATION.md` |
| Architecture/core change | `docs/ARCHITECTURE.md` |

## Pull request workflow

1. Update implementation and tests together.
2. Update every documentation file the change matrix requires.
3. Add a `docs/CHANGELOG.md` entry for a meaningful change.
4. Run `npm run lint`, the relevant tests, and `npm run docs:check`.

## Quality rules

- Never claim a test is implemented unless its spec exists and passes.
- Keep coverage status explicit: `Implemented`, `Planned`, or
  `Implemented (partial)`.
- A known limitation (a site bug worked around, a selector fallback, an
  ecosystem incompatibility) is recorded in its module's or the relevant
  doc's "Known limitations" — not silently omitted.
