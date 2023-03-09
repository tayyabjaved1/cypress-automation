/// <reference types="cypress" />

Cypress.on('uncaught:exception', (err, runnable) => {
    // return false to prevent Cypress from failing the test
    return false
  })

describe('Adding different locators in Form', () => {
    it('Redirect to the Page', () => {
        cy.visit('https://demoqa.com/automation-practice-form')
        cy.get('.main-header').contains('Practice Form').should('be.visible')
    })

    it('Find the locators in Form', () => {
        cy.get('.practice-form-wrapper > h5').contains('Student Registration Form').should('be.visible')
        cy.get('#firstName').type('Tayyab')
        cy.get('#lastName').type('Javed')
        cy.get('#userEmail').type('test@cialfo.com.sg')

        
        cy.get('.custom-control-label').contains('Male').click()
        cy.get('#userNumber').type('+3921234567')
        cy.get('#dateOfBirthInput').click()
        cy.get('.react-datepicker__month-select').select('September')
        cy.get('.react-datepicker__year-select').select('1991')
        cy.get('.react-datepicker__day--024').click()
        cy.get('.css-2b097c-container[id="subjectsContainer"]').type('English').type('{enter}')
        cy.get('.custom-control-label').contains('Sports').click()
        cy.get('.form-control[id="currentAddress"]').type('Adding test address')
        
        cy.get('#state').type('NCR').type('{enter}')

    })
})