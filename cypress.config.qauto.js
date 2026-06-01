const { defineConfig } = require('cypress');
const baseConfig = require('./cypress.config');

module.exports = defineConfig({
  ...baseConfig,
  e2e: {
    ...baseConfig.e2e,
    baseUrl: 'https://qauto.forstudy.space/',
  },
  reporterOptions: {
    ...baseConfig.reporterOptions,
    reportDir: 'cypress/results/qauto',
  },
  env: {
    appName: 'qauto',
    basicAuthUsername: 'guest',
    basicAuthPassword: 'welcome2qauto',
    email: `student.qauto.${Date.now()}@example.com`,
    password: 'Qwerty12345!',
  },
});
