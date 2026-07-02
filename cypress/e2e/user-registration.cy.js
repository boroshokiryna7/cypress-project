/// <reference types="cypress" />

const describeOrSkip = Cypress.env('skipExternalUiTests') ? describe.skip : describe;

describeOrSkip('User Registration for QAuto and QAuto2', () => {
  
  it('Should register user olga1 on qauto', () => {
    // Using HTTP basic auth
    cy.visit('https://qauto.forstudy.space/', {
      auth: {
        username: 'guest',
        password: 'welcome2qauto',
      },
      failOnStatusCode: false,
      timeout: 120000,
    });

    cy.get('body', { timeout: 30000 }).should('be.visible');

    // Wait for page to load and inspect structure
    cy.wait(3000);

    // Look for Sign Up button - try different selectors
    cy.get('button', { timeout: 10000 }).then(($buttons) => {
      const signUpBtn = Array.from($buttons).find((btn) =>
        /Sign Up|Register/i.test(btn.textContent)
      );

      if (signUpBtn) {
        cy.wrap(signUpBtn).click({ force: true });
        cy.log('Clicked Sign Up button');
      }
    });

    cy.wait(2000);

    // Fill registration form - look for any input fields
    cy.get('input', { timeout: 15000 }).then(($inputs) => {
      cy.log(`Found ${$inputs.length} input fields`);
      
      if ($inputs.length >= 3) {
        cy.get('input').eq(0).type('boroshok.irynaa7@gmail.com', { delay: 50 });
        cy.get('input').eq(1).type('welcome2qauto', { delay: 50, sensitive: true });
        cy.get('input').eq(2).type('welcome2qauto', { delay: 50, sensitive: true });
      }
    });

    // Click Register button
    cy.get('button', { timeout: 10000 }).then(($buttons) => {
      const registerBtn = Array.from($buttons).find((btn) =>
        /Register|Sign Up|Submit/i.test(btn.textContent)
      );
      if (registerBtn) {
        cy.wrap(registerBtn).click({ force: true });
      }
    });

    // Verify registration success
    cy.url({ timeout: 20000 }).should('include', '/garage');
    cy.get('body').should('be.visible');
    
    cy.log('✓ User olga1 registered successfully on qauto');
  });

  it('Should register user olga2 on qauto2', () => {
    // Using HTTP basic auth
    cy.visit('https://qauto2.forstudy.space/', {
      auth: {
        username: 'guest',
        password: 'welcome2qauto',
      },
      failOnStatusCode: false,
      timeout: 120000,
    });

    cy.get('body', { timeout: 30000 }).should('be.visible');

    // Wait for page to load and inspect structure
    cy.wait(3000);

    // Look for Sign Up button - try different selectors
    cy.get('button', { timeout: 10000 }).then(($buttons) => {
      const signUpBtn = Array.from($buttons).find((btn) =>
        /Sign Up|Register/i.test(btn.textContent)
      );

      if (signUpBtn) {
        cy.wrap(signUpBtn).click({ force: true });
        cy.log('Clicked Sign Up button');
      }
    });

    cy.wait(2000);

    // Fill registration form - look for any input fields
    cy.get('input', { timeout: 15000 }).then(($inputs) => {
      cy.log(`Found ${$inputs.length} input fields`);
      
      if ($inputs.length >= 3) {
        cy.get('input').eq(0).type('boroshok.irynka7@gmail.com', { delay: 50 });
        cy.get('input').eq(1).type('welcome2qauto', { delay: 50, sensitive: true });
        cy.get('input').eq(2).type('welcome2qauto', { delay: 50, sensitive: true });
      }
    });

    // Click Register button
    cy.get('button', { timeout: 10000 }).then(($buttons) => {
      const registerBtn = Array.from($buttons).find((btn) =>
        /Register|Sign Up|Submit/i.test(btn.textContent)
      );
      if (registerBtn) {
        cy.wrap(registerBtn).click({ force: true });
      }
    });

    // Verify registration success
    cy.url({ timeout: 20000 }).should('include', '/garage');
    cy.get('body').should('be.visible');
    
    cy.log('✓ User olga2 registered successfully on qauto2');
  });
});
