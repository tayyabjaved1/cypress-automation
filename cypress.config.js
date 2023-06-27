const { defineConfig } = require("cypress");
const { registerAIOTestsPlugin } = require('cypress-aiotests-reporter/src')
const { beforeRunHook, afterRunHook } = require('cypress-mochawesome-reporter/lib');

module.exports = defineConfig({
  projectId: 'add cypress dashboard project ID',
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    charts: true,
    reportDir: "cypress/reports/mochawesome-report",
    reportPageTitle: 'Test-Automation-Report',
    embeddedScreenshots: true,
    inlineAssets: true,
    saveAllAttempts: false,
    reportFilename: "[status]_[datetime]-[name]-report",
    code: false,
    autoOpen: false,
    overwrite: false,
  },
  env: {
    "aioTests": {
      "enableReporting": true,
      "cloud": { //Replace with server authentication if using Jira Server
        "apiKey": "your AIO project Key"
      },
      "jiraProjectId": "Your Jira project ID", // Jira Project ID ##### //
      "cycleDetails": {
        "createNewCycle": false,
        "cycleName": "Cypress Test Cyle Run on AIO",
        "cycleKey": "Your AIO Cycle ID"
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
      on('before:run', async (details) => {
        console.log('override before:run');
        await beforeRunHook(details);
      });

      on('after:run', async () => {
        console.log('override after:run');
        await afterRunHook();
      });
      require('cypress-mochawesome-reporter/plugin')(on);
      registerAIOTestsPlugin(on,config);
    },
    baseUrl: 'Add your website base URL here',
    viewportWidth: 1536,
    viewportHeight: 960,
    //chromeWebSecurity: false
  },
});
