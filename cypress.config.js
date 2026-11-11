const { defineConfig } = require('cypress');
const allureWriter = require('@shelex/cypress-allure-plugin/writer');

module.exports = defineConfig({
  e2e: {
    baseUrl: process.env.BASE_URL || 'https://demoqa.com',
    viewportWidth: 1366,
    viewportHeight: 900,
    specPattern: 'cypress/e2e/**/*.cy.js',
    supportFile: 'cypress/support/e2e.js',
    defaultCommandTimeout: 10_000,
    retries: { runMode: 2, openMode: 0 },
    // `Cypress.env()` was removed in Cypress 16 -- `expose` is its replacement
    // for a non-sensitive, synchronously-readable config value (`cy.env()`
    // remains for anything secret, since it's a queued command, not a
    // synchronous read). See docs/CONFIGURATION.md.
    expose: {
      API_BASE_URL: process.env.API_BASE_URL || 'https://demoqa.com',
    },
    // Node-side config (read inside setupNodeEvents, never in spec code), so
    // unrelated to the removed/deprecated browser-side `Cypress.env()` API
    // above. `@shelex/cypress-allure-plugin` writes nothing at all unless
    // `env.allure` is explicitly true -- verified live: without this, the
    // plugin registers silently and allure-results/ is simply never created.
    env: {
      allure: true,
    },
    setupNodeEvents(on, config) {
      require('@cypress/grep/src/plugin')(config);
      // Registers its own before:run/after:run hooks internally -- do not
      // also register them here, or the report merge runs twice and the
      // second pass fails with "matched no report files" (the first pass
      // already consumed them).
      require('cypress-mochawesome-reporter/plugin')(on);
      allureWriter(on, config);

      return config;
    },
  },
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    charts: true,
    reportDir: 'cypress/reports/mochawesome-report',
    reportPageTitle: 'DemoQA Cypress Report',
    embeddedScreenshots: true,
    inlineAssets: true,
    overwrite: false,
  },
});
