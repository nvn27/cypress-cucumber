const report = require("multiple-cucumber-html-reporter");
const os = require('os');

report.generate({
  jsonDir: "./cypress/reports/cucumber-json",
  reportPath: "./cypress/reports/html-reports/",
  metadata: {
    browser: {
      name: "chrome",
      version: "TODO",
    },
    device: `${os.hostname}`,
    platform: {
      name: `${os.type}`,
      version: `${os.version}`,
    },
  },
  customData: {
    title: "Run info",
    data: [
      { label: "Project", value: "Cypress Cucumber Demo" },
      { label: "Release", value: "NA" },
      { label: "Cycle", value: "NA" },
      { label: "Execution Start Time", value: "TODO" },
      { label: "Execution End Time", value: `${new Date().toString()}` },
    ],
  },
});