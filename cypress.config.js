const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: 'vc6i9w',
  e2e: {
    //experimentalSessionAndOrigin: true,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: 'https://companion-test.cialfo.sg/',
    viewportWidth: 1536,
    viewportHeight: 960,
    //chromeWebSecurity: false
  },
});