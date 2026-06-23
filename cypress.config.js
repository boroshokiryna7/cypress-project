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
      on('before:browser:launch', (browser, launchOptions) => {
        if (browser.family === 'firefox') {
          launchOptions.args.push('-width=1280');
          launchOptions.args.push('-height=720');
        }

        if (browser.family === 'chromium') {
          launchOptions.args.push('--disable-dev-shm-usage');
        }

        return launchOptions;
      });
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
