/// <reference types="cypress" />

Cypress.on('uncaught:exception', (err, runnable) => {
  // return false to prevent Cypress from failing the test
  return false
})

describe('New Browser window to open', () => {
  it('Handling New Browser Window', function () {
    cy.visit('https://demoqa.com/browser-windows')
    cy.window().then((NewWin) => {
        cy.stub(NewWin, 'open', url => {
            NewWin.location.href = 'https://demoqa.com/sample';
        }).as("win")
    })
    cy.get('#windowButton').click()

    cy.get('@win').should("be.called")
    cy.get('h1').should('have.text', 'This is a sample page')
    cy.wait(3000)

    cy.go('back')
    cy.url().should('eq','https://demoqa.com/browser-windows')
  })

})
