/// <reference types="cypress" />

describe('Firefox launch parameters confirmation', () => {
  it('captures Cypress run parameters for Firefox', () => {
    const isDockerRun = Cypress.env('dockerRun') === true || Cypress.env('dockerRun') === 'true';
    const command = isDockerRun
      ? 'docker compose run --rm cypress-firefox npx cypress run --browser firefox --headless --config-file cypress.config.qauto.js --spec cypress/e2e/firefox-launch-parameters.cy.js --env dockerRun=true,runTarget=docker-firefox'
      : 'cypress run --browser "%LOCALAPPDATA%\\Mozilla Firefox 115 ESR\\core\\firefox.exe" --headless --config-file cypress.config.qauto.js';
    const screenshotName = isDockerRun ? 'docker-firefox-launch-parameters' : 'firefox-launch-parameters';

    const runParameters = [
      ['Run target', Cypress.env('runTarget') || 'local-firefox'],
      ['Browser', Cypress.browser.displayName],
      ['Browser name', Cypress.browser.name],
      ['Browser family', Cypress.browser.family],
      ['Headless', String(Cypress.browser.isHeadless)],
      ['Cypress version', Cypress.version],
      ['Docker run', String(isDockerRun)],
      ['Config file', 'cypress.config.qauto.js'],
      ['Base URL', Cypress.config('baseUrl')],
      ['Viewport', `${Cypress.config('viewportWidth')}x${Cypress.config('viewportHeight')}`],
      ['Spec', Cypress.spec.relative],
      ['Command', command],
    ];

    const rows = runParameters
      .map(([name, value]) => `<tr><th>${name}</th><td>${value}</td></tr>`)
      .join('');

    const html = `
      <!doctype html>
      <html lang="en">
        <head>
          <meta charset="utf-8" />
          <title>Firefox launch parameters</title>
          <style>
            body {
              margin: 0;
              min-height: 100vh;
              display: grid;
              place-items: center;
              background: #f5f7fb;
              color: #172033;
              font-family: Arial, sans-serif;
            }

            main {
              width: min(920px, calc(100vw - 64px));
              border: 1px solid #cfd8e3;
              border-radius: 8px;
              background: #ffffff;
              padding: 32px;
            }

            h1 {
              margin: 0 0 24px;
              font-size: 28px;
            }

            table {
              width: 100%;
              border-collapse: collapse;
              font-size: 16px;
            }

            th,
            td {
              border-top: 1px solid #e5e9f0;
              padding: 12px 10px;
              text-align: left;
              vertical-align: top;
            }

            th {
              width: 220px;
              color: #4f5d75;
              font-weight: 700;
            }

            td {
              font-family: Consolas, "Courier New", monospace;
              overflow-wrap: anywhere;
            }
          </style>
        </head>
        <body>
          <main>
            <h1>Cypress Firefox run parameters</h1>
            <table>${rows}</table>
          </main>
        </body>
      </html>
    `;

    // Avoid navigating to the app (which requires auth) by writing
    // the HTML directly into the current document instead of visiting a URL.
    cy.document().then((document) => {
      document.open();
      document.write(html);
      document.close();
    });

    cy.contains('td', 'firefox').should('be.visible');
    cy.screenshot(screenshotName, { capture: 'viewport' });
  });
});
