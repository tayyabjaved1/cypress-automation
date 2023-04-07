const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: 'vc6i9w',
  e2e: {
    reporter: 'cypress-mochawesome-reporter',
    reporterOptions: {
      charts: true,
      reportPageTitle: 'Automation-Report',
      embeddedScreenshots: true,
      inlineAssets: true,
      saveAllAttempts: false,
      reportFilename: "[status]_[datetime]-[name]-report",
      code: false,
      autoOpen: true,
      overwrite: false
    },
    //experimentalSessionAndOrigin: true,
    setupNodeEvents(on, config) {
      // implement node event listeners here
      require('cypress-mochawesome-reporter/plugin')(on);
    },
    baseUrl: 'https://companion-test.cialfo.sg/',
    viewportWidth: 1536,
    viewportHeight: 960,
    //chromeWebSecurity: false
  },
});