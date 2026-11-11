# Contributing

1. Read `docs/ARCHITECTURE.md` and `docs/TEST_AUTHORING_GUIDE.md` first —
   this repo follows those conventions strictly.
2. One module per `cypress/pages/<module>/` + `cypress/e2e/<module>/` pair
   — layer-first, not a module-first folder.
3. Tags via `@cypress/grep`'s native `{ tags: [...] }` on `it()`, never
   embedded in the title string.
4. Construct page objects and factory data directly in the spec — there is
   no fixture-injection layer (see `docs/DATA_FACTORY_GUIDE.md`).
5. Update the docs the change matrix in `docs/DOCUMENTATION_POLICY.md`
   requires, in the same change.
6. Before opening a PR:
   ```bash
   npm run lint
   npx cypress run
   npm run docs:check
   ```
