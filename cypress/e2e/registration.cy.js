// Overwrite type command to mask sensitive data (passwords) in logs
Cypress.Commands.overwrite('type', (originalFn, element, text, options = {}) => {
  if (options && options.sensitive) {
    // turn off original log
    options.log = false;
    // create our own log with masked message
    Cypress.log({
      $el: element,
      name: 'type',
      message: '*'.repeat(String(text).length),
    });
  }

  return originalFn(element, text, options);
});

const getNameField = () => cy.get('#signupName', { timeout: 10000 });
const getLastNameField = () => cy.get('#signupLastName', { timeout: 10000 });
const getEmailField = () => cy.get('#signupEmail', { timeout: 10000 });
const getPasswordField = () => cy.get('#signupPassword', { timeout: 10000 });
const getConfirmPasswordField = () => cy.get('#signupRepeatPassword', { timeout: 10000 });
const getSubmitButton = () => cy.contains('button', /^Register$/i, { timeout: 10000 });

const openRegistrationForm = () => {
  cy.visit('https://qauto.forstudy.space/', {
    failOnStatusCode: false,
    timeout: 120000,
    auth: {
      username: 'guest',
      password: 'welcome2qauto',
    },
  });

  cy.contains('button', /Sign In|Sign in/i, { timeout: 20000 }).click({ force: true });
  cy.contains('button', /Registration/i, { timeout: 20000 }).click({ force: true });
  getNameField().should('exist');
};

describe('QAuto Registration and Login', () => {
  const validName = 'Ira';
  const validLastName = 'Ira';
  const validPassword = '123456TF@s';
  const invalidEmail = 'not-an-email';
  const invalidPassword = 'short1A';
  const validEmail = `boroshok.iryna7+${Date.now()}@gmail.com`;

  it('validates the registration form fields and prevents submission when data is invalid', () => {
    openRegistrationForm();

    getNameField().clear().type(' ');
    getLastNameField().clear().type('a');
    getEmailField().clear().type(invalidEmail);
    getPasswordField().clear().type(invalidPassword, { sensitive: true });
    getConfirmPasswordField().clear().type('different', { sensitive: true });

    getSubmitButton().should('be.disabled');
    getNameField().should('have.class', 'ng-invalid');
    getLastNameField().should('have.class', 'ng-invalid');
    getEmailField().should('have.class', 'ng-invalid');
    getPasswordField().should('have.class', 'ng-invalid');
    getConfirmPasswordField().should('have.class', 'ng-invalid');
  });

  it('registers a new user with valid data and logs in using the custom login command', () => {
    openRegistrationForm();

    getNameField().clear().type(validName);
    getLastNameField().clear().type(validLastName);
    getEmailField().clear().type(validEmail);
    getPasswordField().clear().type(validPassword, { sensitive: true });
    getConfirmPasswordField().clear().type(validPassword, { sensitive: true });

    getSubmitButton().should('not.be.disabled').click({ force: true });

    cy.contains(/Success|Thank you|Welcome|Logout|Dashboard/i, { timeout: 20000 }).should('exist');

    cy.login(validEmail, validPassword);
    cy.contains(/Logout|Dashboard|Welcome/i, { timeout: 20000 }).should('exist');
  });
});
