/// <reference types="cypress" />

/**
 * Test Suite: Car Creation with Request Interception and Expense Management
 * Topic: Intercepting Requests (cy.intercept)
 *
 * Requirements:
 * 1. Intercept POST /api/cars request and validate status code
 * 2. Save car ID from intercepted response to variable
 * 3. Validate car in cars list via API (getCars endpoint)
 * 4. Create custom command to create expense via API (postExpense endpoint)
 * 5. Validate expense creation through UI
 * 6. Run all tests in headless mode
 */

const appOrigin = 'https://qauto.forstudy.space';

describe('Student - Intercepting Requests: Car and Expense Management', () => {
  const baseUrl = appOrigin;
  const apiBaseUrl = `${baseUrl}/api`;
  const initialMileage = 45000 + Math.floor(Date.now() % 1000);
  const testUser = {
    name: 'Test',
    lastName: 'User',
    email: `car.expense.${Date.now()}@example.com`,
    password: 'Qwerty12345!',
  };

  const testCarData = {
    brand: 'Ford',
    model: 'Fiesta',
    brandId: 3,
    modelId: 11,
    mileage: initialMileage,
  };

  const testExpenseData = {
    mileage: initialMileage + 250,
    liters: 55,
    pricePerLiter: 1.8,
    totalCost: 99,
    date: new Date().toISOString().split('T')[0],
  };

  let carId;
  let createdExpense;

  const visitApp = (path = '/') => {
    cy.visit(`${baseUrl}${path}`, {
      failOnStatusCode: false,
      timeout: 120000,
      auth: {
        username: 'guest',
        password: 'welcome2qauto',
      },
    });
  };

  const registerAndLogin = () => {
    cy.session(`qauto-user-${testUser.email}`, () => {
      visitApp();

      cy.contains('button', /Sign In|Sign in/i, { timeout: 20000 })
        .should('be.visible')
        .and('be.enabled')
        .click();

      cy.contains('button', /Registration/i, { timeout: 20000 })
        .should('be.visible')
        .and('be.enabled')
        .click();

      cy.get('#signupName', { timeout: 10000 }).clear().type(testUser.name);
      cy.get('#signupLastName').clear().type(testUser.lastName);
      cy.get('#signupEmail').clear().type(testUser.email);
      cy.get('#signupPassword').clear().type(testUser.password, { log: false });
      cy.get('#signupRepeatPassword').clear().type(testUser.password, { log: false });
      cy.contains('button', /^Register$/i)
        .should('be.visible')
        .and('be.enabled')
        .click();

      cy.url({ timeout: 30000 }).should('include', '/panel/garage');
    });
  };

  beforeEach(() => {
    registerAndLogin();
    visitApp('/panel/garage');
  });

  it('TEST 1: Should intercept POST /api/cars request, validate status code, and save car ID', () => {
    cy.intercept('POST', '**/api/cars*').as('createCar');

    cy.contains('button', /^Add car$/i, { timeout: 20000 }).click();
    cy.get('#addCarBrand', { timeout: 10000 }).select(testCarData.brand);
    cy.get('#addCarModel').select(testCarData.model);
    cy.get('#addCarMileage').clear().type(String(testCarData.mileage));
    cy.get('.modal-footer button.btn-primary')
      .contains(/^Add$/i)
      .should('not.be.disabled')
      .click();

    cy.wait('@createCar').then((interception) => {
      expect(interception.response.statusCode).to.equal(201);

      const createdCar = interception.response.body.data;
      carId = createdCar.id;

      expect(carId).to.be.a('number');
      expect(createdCar.brand).to.equal(testCarData.brand);
      expect(createdCar.model).to.equal(testCarData.model);
      expect(createdCar.initialMileage).to.equal(testCarData.mileage);
    });
  });

  it('TEST 2: Should fetch cars list via API and validate created car', () => {
    expect(carId, 'carId from intercepted response').to.be.a('number');

    cy.apiRequestFromApp('GET', '/api/cars').then((response) => {
      expect(response.status).to.equal(200);
      expect(response.body.data).to.be.an('array');

      const createdCar = response.body.data.find((car) => car.id === carId);

      expect(createdCar).to.exist;
      expect(createdCar.brand).to.equal(testCarData.brand);
      expect(createdCar.model).to.equal(testCarData.model);
      expect(createdCar.initialMileage).to.equal(testCarData.mileage);
    });
  });

  it('TEST 3: Should create expense via API using custom command and validate response', () => {
    expect(carId, 'carId from intercepted response').to.be.a('number');

    cy.createExpenseViaAPI(carId, testExpenseData).then((expenseResponse) => {
      createdExpense = expenseResponse.body.data;

      expect(expenseResponse.status).to.equal(200);
      expect(createdExpense).to.exist;
      expect(createdExpense.id).to.be.a('number');
      expect(createdExpense.carId).to.equal(carId);
      expect(createdExpense.mileage).to.equal(testExpenseData.mileage);
      expect(Number(createdExpense.liters)).to.equal(testExpenseData.liters);
      expect(Number(createdExpense.totalCost)).to.equal(testExpenseData.totalCost);
    });
  });

  it('TEST 4: Should find car in UI and validate created expense through UI', () => {
    expect(carId, 'carId from intercepted response').to.be.a('number');
    expect(createdExpense, 'expense from API response').to.exist;

    visitApp('/panel/expenses');

    cy.contains(`${testCarData.brand} ${testCarData.model}`, { timeout: 20000 }).should('be.visible');
    cy.contains(String(testExpenseData.mileage), { timeout: 20000 }).should('be.visible');
    cy.contains(`${testExpenseData.liters}L`).should('be.visible');
    cy.contains(`${testExpenseData.totalCost.toFixed(2)} USD`).should('be.visible');
  });

  it('TEST 5: Should verify complete data consistency between API and UI', () => {
    expect(carId, 'carId from intercepted response').to.be.a('number');
    expect(createdExpense, 'expense from API response').to.exist;

    const getCreatedExpense = (retriesLeft = 5) => {
      return cy.apiRequestFromApp('GET', `/api/expenses?carId=${carId}`).then((expensesResponse) => {
        expect(expensesResponse.status).to.equal(200);

        const expenseFromApi = expensesResponse.body.data.find((expense) => expense.id === createdExpense.id);

        if (!expenseFromApi && retriesLeft > 0) {
          cy.wait(1000);
          return getCreatedExpense(retriesLeft - 1);
        }

        return cy.wrap(expenseFromApi);
      });
    };

    cy.apiRequestFromApp('GET', `/api/cars/${carId}`).then((carResponse) => {
      expect(carResponse.status).to.equal(200);
      expect(carResponse.body.data.brand).to.equal(testCarData.brand);
      expect(carResponse.body.data.model).to.equal(testCarData.model);
    });

    getCreatedExpense().then((expenseFromApi) => {
      expect(expenseFromApi).to.exist;
      expect(expenseFromApi.carId).to.equal(carId);
      expect(expenseFromApi.mileage).to.equal(testExpenseData.mileage);
      expect(Number(expenseFromApi.liters)).to.equal(testExpenseData.liters);
      expect(Number(expenseFromApi.totalCost)).to.equal(testExpenseData.totalCost);
    });
  });
});
