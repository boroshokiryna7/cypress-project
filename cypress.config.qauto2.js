const { defineConfig } = require('cypress');
const baseConfig = require('./cypress.config');

module.exports = defineConfig({
  ...baseConfig,
  e2e: {
    ...baseConfig.e2e,
    baseUrl: 'https://qauto2.forstudy.space/',
  },
  reporterOptions: {
    ...baseConfig.reporterOptions,
    reportDir: 'cypress/results/qauto2',
  },
  env: {
    appName: 'qauto2',
    basicAuthUsername: 'guest',
    basicAuthPassword: 'welcome2qauto',
    email: `student.qauto2.${Date.now()}@example.com`,
    password: 'Qwerty12345!',
  },
});
