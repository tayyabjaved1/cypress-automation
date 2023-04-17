class OpenCart_Signup {
    fillFirstName(firstName) {
      return cy.get('#input-firstname').type(firstName)
    }
  
    fillLastName(lastName) {
      return cy.get('#input-lastname').type(lastName)
    }
  
    fillEmail(email) {
      return cy.get('#input-email').type(email)
    }
  
    fillTelephone(telephone) {
      return cy.get('#input-telephone').type(telephone)
    }
  
    fillPassword(password) {
      return cy.get('#input-password').type(password)
    }
  
    fillConfirmPassword(password) {
      return cy.get('#input-confirm').type(password)
    }
  
    agreePrivacyPolicy() {
      return cy.get('[name="agree"]').check()
    }
  
    clickContinueButton() {
      return cy.get('.btn-primary').click()
    }

    SignupSuccessMessage() {
        return cy.get('h1')
    }
  }
  
  export default OpenCart_Signup