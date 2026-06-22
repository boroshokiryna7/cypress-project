class LoginPage {
  // Selectors
  getSignInButton() {
    return cy.get('button.header_signin, button[class*="signin"], button[class*="sign-in"]').first();
  }

  getEmailInput() {
    return cy.get('#signinEmail, input[name="email"], input[type="email"]').first();
  }

  getPasswordInput() {
    return cy.get('#signinPassword, input[name="password"], input[type="password"]').first();
  }

  getLoginButton() {
    return cy.contains('button', /^Login$/i, { timeout: 10000 });
  }

  getSignUpButton() {
    return cy.contains('button', /Sign Up|Register/i);
  }

  getSignUpEmailInput() {
    return cy.get('input[id*="email"], input[name*="email"]').eq(0);
  }

  getSignUpPasswordInput() {
    return cy.get('input[id*="password"], input[name*="password"]').eq(0);
  }

  getSignUpRepeatPasswordInput() {
    return cy.get('input[id*="password"], input[name*="password"]').eq(1);
  }

  getRegisterButton() {
    return cy.contains('button', /Register|Sign Up/i);
  }

  // Methods
  openLoginModal() {
    this.getSignInButton().should('be.visible').click({ force: true });
    cy.get('#signinEmail, input[type="email"]', { timeout: 15000 }).should('be.visible');
  }

  login(email, password) {
    this.openLoginModal();
    this.getEmailInput().clear().type(email, { delay: 50 });
    this.getPasswordInput().clear().type(password, { delay: 50, sensitive: true });
    this.getLoginButton().should('not.be.disabled').click({ force: true });
    
    // Wait for successful login
    cy.get('body', { timeout: 20000 }).should('be.visible');
    cy.url({ timeout: 15000 }).should('not.include', '/login');
  }

  register(email, password) {
    this.getSignUpButton().should('be.visible').click({ force: true });
    cy.get('input[type="email"], input[id*="email"]', { timeout: 15000 }).should('be.visible');
    
    this.getSignUpEmailInput().clear().type(email, { delay: 50 });
    this.getSignUpPasswordInput().clear().type(password, { delay: 50, sensitive: true });
    this.getSignUpRepeatPasswordInput().clear().type(password, { delay: 50, sensitive: true });
    
    this.getRegisterButton().should('not.be.disabled').click({ force: true });
    
    // Wait for registration success
    cy.url({ timeout: 20000 }).should('include', '/garage');
  }
}

export default new LoginPage();
