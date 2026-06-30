# Cypress Test Project

Test automation project using Cypress framework.

## Setup

```bash
npm install
npm run cypress:open
```

## Firefox run

```bash
npm run test:firefox:confirm
```

Confirmation screenshot: `docs/firefox-launch-parameters.png`

## Docker Chrome run

Docker Desktop must be installed and running.

```bash
npm run docker:build
npm run test:docker:chrome
```

Run only the QAuto Chrome spec in Docker:

```bash
npm run test:docker:qauto:chrome
```

## Docker Firefox run

The Docker image uses Cypress `12.7.4` and runs tests in headless Firefox.

```bash
npm run docker:build:firefox
npm run test:docker:firefox
```

Confirmation run with a screenshot of the launch parameters:

```bash
npm run test:docker:firefox:confirm
```

The confirmation screenshot is saved under:

```text
cypress/screenshots/firefox-launch-parameters.cy.js/docker-firefox-launch-parameters.png
```
