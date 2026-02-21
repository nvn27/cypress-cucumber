const { defineConfig } = require("cypress");
const cucumber = require('cypress-cucumber-preprocessor').default
const fs = require("fs");
const path = require("path");

module.exports = defineConfig({
  // allowCypressEnv: false,

  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      on('file:preprocessor', cucumber());

      on("task", {
        log(message) {
          console.log(message);

          const filePath = path.join(__dirname, "cypress/logs/execution-logs.txt");

          // Create folder if not exists
          if (!fs.existsSync(path.dirname(filePath))) {
            fs.mkdirSync(path.dirname(filePath), { recursive: true });
          }
          // Append message with timestamp
          const logMessage =
            `[${new Date().toISOString()}] ${message}\n`;
          fs.appendFileSync(filePath, logMessage);

          return null;
        }
      });
    },
    baseUrl: "https://the-internet.herokuapp.com/",
    specPattern: "cypress/e2e/features/*.feature",
    supportFile: "cypress/support/e2e.js",
    // excludeSpecPattern: ["cypress/e2e/1-getting-started/*", "cypress/e2e/2-advanced-examples/*"],
    // screenshotsFolder: "cypress/screenshots"
  },
});
