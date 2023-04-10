const { defineConfig } = require("cypress");
const { registerAIOTestsPlugin } = require('cypress-aiotests-reporter/src')
const { beforeRunHook, afterRunHook } = require('cypress-mochawesome-reporter/lib');

module.exports = defineConfig({
  projectId: 'vc6i9w',
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    charts: true,
    reportPageTitle: 'Automation-Report',
    embeddedScreenshots: true,
    inlineAssets: true,
    saveAllAttempts: false,
    reportFilename: "[status]_[datetime]-[name]-report",
    code: false,
    autoOpen: false,
    overwrite: false,
    mochaFile: 'results/my-test-output.xml'
  },
  env: {
    "aioTests": {
      "enableReporting": true,
      "cloud": { //Replace with server authentication if using Jira Server
        "apiKey": "OTM2ZWM3YmMtNGZhZi00OWFkLTg0ZDAtMzM0NzZkMDk1Mjcx"
      },
      "jiraProjectId": "10051", // Jira Project ID for Godspeed is 10051 //
      "cycleDetails": {
        "createNewCycle": false,
        "cycleName": "Cypress Test Cyle Run on AIO",
        "cycleKey": "GOD-CY-89"
      },
      "addNewRun": true,
      "addAttachmentToFailedCases": true,
      "createNewRunForRetries": true
    },
  },
  e2e: {
    //experimentalSessionAndOrigin: true,
    setupNodeEvents(on, config) {
      // implement node event listeners here
      require('cypress-mochawesome-reporter/plugin')(on);
      registerAIOTestsPlugin(on,config);
    },
    baseUrl: 'https://companion-test.cialfo.sg/',
    viewportWidth: 1536,
    viewportHeight: 960,
    //chromeWebSecurity: false
  },
});