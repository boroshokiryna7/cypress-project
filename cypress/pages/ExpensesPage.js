class ExpensesPage {
  get expensesLink() {
    return cy.get('a[routerlink="/panel/expenses"]').filter(':visible').first();
  }

  get addExpenseButton() {
    return cy.contains('button', /^Add an expense$/i);
  }

  get carSelect() {
    return cy.get('#addExpenseCar');
  }

  get mileageInput() {
    return cy.get('#addExpenseMileage');
  }

  get litersInput() {
    return cy.get('#addExpenseLiters');
  }

  get totalCostInput() {
    return cy.get('#addExpenseTotalCost');
  }

  get submitButton() {
    return cy.get('.modal-footer button.btn-primary').contains(/^Add$/i);
  }

  open() {
    this.expensesLink.should('be.visible').click();
    cy.url({ timeout: 15000 }).should('include', '/panel/expenses');
  }

  addFuelExpense(car, expense) {
    this.open();
    this.addExpenseButton.should('be.visible').and('be.enabled').click();
    this.carSelect.should('be.visible').select(`${car.brand} ${car.model}`);
    this.mileageInput.should('be.visible').clear().type(String(expense.mileage));
    this.litersInput.should('be.visible').clear().type(String(expense.liters));
    this.totalCostInput.should('be.visible').clear().type(String(expense.totalCost));
    this.submitButton.should('be.visible').and('be.enabled').click();

    cy.contains(String(expense.mileage), { timeout: 15000 }).should('be.visible');
    cy.contains(`${expense.liters}L`).should('be.visible');
  }
}

export default new ExpensesPage();
