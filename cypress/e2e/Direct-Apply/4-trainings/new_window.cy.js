/// <reference types="cypress" />

Cypress.on('uncaught:exception', (err, runnable) => {
  // return false to prevent Cypress from failing the test
  return false
})

describe('New Browser window to open', () => {
  it('Handling New Browser Window', function () {
    cy.visit('https://demoqa.com/browser-windows')
    
    //used method to handle current window and created stub of it //
    // cy.window().then((NewWin) => {
    //     cy.stub(NewWin, 'open', url => {
    //         NewWin.location.href = 'https://demoqa.com/sample';
    //     }).as("win")
    // })

    // used custom command here to handle window getting called from commands.js file //
    cy.stubWindowOpen('https://demoqa.com/sample')
    cy.get('#windowButton').click()

    cy.get('@newTab').should("be.called")
    cy.get('h1').should('have.text', 'This is a sample page')
    cy.wait(3000)

    cy.go('back')
    cy.url().should('eq','https://demoqa.com/browser-windows')
  })
})
