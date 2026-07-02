/// <reference types="cypress" />

import garagePage from '../pages/GaragePage';
import expensesPage from '../pages/ExpensesPage';

const describeOrSkip = Cypress.env('skipExternalUiTests') ? describe.skip : describe;

const basicAuth = {
  username: Cypress.env('basicAuthUsername'),
  password: Cypress.env('basicAuthPassword'),
};

const user = {
  name: 'Iryna',
  lastName: 'Student',
  email: Cypress.env('email'),
  password: Cypress.env('password'),
};

const car = {
  brand: 'Ford',
  model: 'Fiesta',
  mileage: 10000,
};

const expense = {
  mileage: 11000,
  liters: 50,
  totalCost: 100,
};

const openHomePage = () => {
  cy.visit('/', {
    auth: basicAuth,
    failOnStatusCode: false,
  });
};

const registerUser = () => {
  openHomePage();

  cy.contains('button', /Sign In/i, { timeout: 20000 })
    .should('be.visible')
    .and('be.enabled')
    .click();

  cy.contains('button', /Registration/i, { timeout: 20000 })
    .should('be.visible')
    .and('be.enabled')
    .click();

  cy.get('#signupName').should('be.visible').clear().type(user.name);
  cy.get('#signupLastName').should('be.visible').clear().type(user.lastName);
  cy.get('#signupEmail').should('be.visible').clear().type(user.email);
  cy.get('#signupPassword').should('be.visible').clear().type(user.password, { log: false });
  cy.get('#signupRepeatPassword').should('be.visible').clear().type(user.password, { log: false });

  cy.contains('button', /^Register$/i)
    .should('be.visible')
    .and('be.enabled')
    .click();

  cy.url({ timeout: 20000 }).should('include', '/panel/garage');
};

describeOrSkip('Student garage and fuel expenses', () => {
  it('registers a user, adds a car, and adds fuel expenses through UI', () => {
    cy.log(`Testing ${Cypress.env('appName')}`);

    registerUser();
    garagePage.addCar(car);
    expensesPage.addFuelExpense(car, expense);
  });
});
