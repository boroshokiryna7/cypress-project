// ***********************************************
// Custom Commands for QAuto Testing
// ***********************************************

// Custom command for login
Cypress.Commands.add('loginToQAuto', (email = 'guest', password = 'welcome2qauto') => {
  cy.visit('https://qauto.forstudy.space/', {
    failOnStatusCode: false,
    timeout: 120000,
    auth: {
      username: 'guest',
      password: 'welcome2qauto',
    },
  });

  cy.document().then((doc) => {
    const signInButton = doc.querySelector('button.header_signin') ||
      Array.from(doc.querySelectorAll('button')).find((btn) => /Sign In/i.test(btn.innerText));

    if (signInButton) {
      cy.wrap(signInButton).should('be.visible').click();
      cy.get('#signinEmail', { timeout: 20000 }).type(email, { delay: 50 });
      cy.get('#signinPassword', { timeout: 20000 }).type(password, {
        delay: 50,
        sensitive: true,
      });
      cy.contains('button', /^Login$/i, { timeout: 10000 }).should('be.visible').and('be.enabled').click();
    } else {
      cy.log('Sign In button not found; user may already be signed in');
    }
  });

  cy.get('body', { timeout: 30000 }).should('be.visible');
});

Cypress.Commands.add('login', (email = 'guest', password = 'welcome2qauto') => {
  cy.visit('https://qauto.forstudy.space/', {
    failOnStatusCode: false,
    timeout: 120000,
    auth: {
      username: 'guest',
      password: 'welcome2qauto',
    },
  });

  cy.document().then((doc) => {
    const signInButton = doc.querySelector('button.header_signin') ||
      Array.from(doc.querySelectorAll('button')).find((btn) => /Sign In/i.test(btn.innerText));

    if (signInButton) {
      cy.wrap(signInButton).should('be.visible').click();
      cy.get('#signinEmail', { timeout: 20000 }).type(email, { delay: 50 });
      cy.get('#signinPassword', { timeout: 20000 }).type(password, {
        delay: 50,
        sensitive: true,
      });
      cy.contains('button', /^Login$/i, { timeout: 10000 }).should('be.visible').and('be.enabled').click();
    } else {
      cy.log('Sign In button not found; user may already be signed in');
    }
  });

  cy.get('body', { timeout: 30000 }).should('be.visible');
});

Cypress.Commands.overwrite('type', (originalFn, element, text, options = {}) => {
  if (options && options.sensitive) {
    options.log = false;

    Cypress.log({
      $el: element,
      name: 'type',
      message: '*'.repeat(String(text).length),
    });
  }

  return originalFn(element, text, options);
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

Cypress.Commands.add('apiRequestFromApp', (method, path, body) => {
  return cy.window().then((win) => {
    return win.fetch(path, {
      method,
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: body ? JSON.stringify(body) : undefined,
    }).then(async (response) => ({
      status: response.status,
      body: await response.json(),
    }));
  });
});

Cypress.Commands.add('createExpenseViaAPI', (carId, expenseData) => {
  return cy.apiRequestFromApp('POST', '/api/expenses', {
    carId,
    reportedAt: expenseData.date,
    mileage: expenseData.mileage,
    liters: expenseData.liters,
    totalCost: expenseData.totalCost,
    forceMileage: false,
  });
});

// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })

// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })

// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: ['optional', 'window', 'document']}, (subject) => { ... })
