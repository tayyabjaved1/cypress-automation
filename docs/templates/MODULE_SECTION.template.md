## <Module Name>

**Scope.** What user-visible capability does this module cover?

**Navigation.** Entry route(s). Preconditions. Required role/account.

**Architecture.** Page Objects (name each; confirm it extends `BasePage` and
implements `waitForLoaded()` — see `docs/ARCHITECTURE.md`). Factories/builders.
API clients.

**Test data.** Generated fields, required constraints, uniqueness, overrides,
and static reference data.

**Lifecycle.** Persisted resources, ownership, teardown, and unsupported
cleanup cases.

**Coverage** (`cypress/e2e/<module>/<file>.cy.js`): scenario description —
tag(s), e.g. `@smoke @ui`.

**Known limitations.** Environment dependencies, unstable demo-site
behaviour, unimplemented scenarios, and any raw-selector fallback used
because an element has no accessible role/label/placeholder — state why.

---

Add this section to `docs/MODULE_CATALOG.md` (and a row to its summary table)
in the same change that introduces the module.
