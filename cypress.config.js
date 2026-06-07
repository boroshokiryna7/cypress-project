const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    viewportWidth: 1280,
    viewportHeight: 720,
    video: false,
    screenshotOnFailure: true,
    pageLoadTimeout: 120000,
    requestTimeout: 30000,
    responseTimeout: 30000,
    commandTimeout: 30000,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
  reporter: 'mochawesome',
  reporterOptions: {
    reportDir: 'cypress/results/default',
    overwrite: false,
    html: true,
    json: true,
  },
  component: {
    devServer: {
      framework: 'react',
      bundler: 'webpack',
    },
  },
});
