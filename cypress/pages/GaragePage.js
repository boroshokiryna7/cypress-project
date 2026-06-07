class GaragePage {
  get addCarButton() {
    return cy.contains('button', /^Add car$/i);
  }

  get brandSelect() {
    return cy.get('#addCarBrand');
  }

  get modelSelect() {
    return cy.get('#addCarModel');
  }

  get mileageInput() {
    return cy.get('#addCarMileage');
  }

  get submitButton() {
    return cy.get('.modal-footer button.btn-primary').contains(/^Add$/i);
  }

  addCar(car) {
    this.addCarButton.should('be.visible').and('be.enabled').click();
    this.brandSelect.should('be.visible').select(car.brand);
    this.modelSelect.should('be.visible').select(car.model);
    this.mileageInput.should('be.visible').clear().type(String(car.mileage));
    this.submitButton.should('be.visible').and('be.enabled').click();

    cy.contains(`${car.brand} ${car.model}`, { timeout: 15000 }).should('be.visible');
  }
}

export default new GaragePage();
