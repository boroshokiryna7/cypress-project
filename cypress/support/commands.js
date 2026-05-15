// ***********************************************
// Custom Commands for QAuto Testing
// ***********************************************

// Custom command for login
Cypress.Commands.add('loginToQAuto', (email = 'guest', password = 'welcome2qauto') => {
  // Visit the site
  cy.visit('https://qauto.forstudy.space/', { 
    failOnStatusCode: false,
    timeout: 120000
  });
  
  // Wait for body to be ready
  cy.get('body', { timeout: 30000 }).should('exist');
  
  // Wait and find email input field
  cy.get('input[type="email"], input[name*="email"], input[name*="login"]', { 
    timeout: 30000 
  }).first().type(email, { delay: 50 });
  
  // Find and fill password field
  cy.get('input[type="password"]', { timeout: 10000 })
    .type(password, { delay: 50 });
  
  // Find and click submit button
  cy.get('button[type="submit"]', { timeout: 10000 })
    .click({ force: true });
  
  // Wait for page to load after login
  cy.get('body', { timeout: 30000 }).should('be.visible');
});

// Custom command to get all header buttons
Cypress.Commands.add('getHeaderButtons', () => {
  cy.get('header', { timeout: 10000 }).within(() => {
    cy.get('button');
  });
});

// Custom command to get all footer links
Cypress.Commands.add('getFooterLinks', () => {
  cy.get('footer', { timeout: 10000 }).within(() => {
    cy.get('a');
  });
});

// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })

// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })

// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: ['optional', 'window', 'document']}, (subject) => { ... })
