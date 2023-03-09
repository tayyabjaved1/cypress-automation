/// <reference types="cypress" />

describe('Check Sign In Functionality', () => {
    it('Redirect to the Page', () => {
        cy.visit('https://demoqa.com/browser-windows')
      })

      it('Click on URL & redirect to new tab', () => {
        cy.get('#windowButton').contains('New Window').should('be.visible')
        cy.get('#windowButton').invoke('removeAttr', 'target').click()

        //Link opens in new tab and verify it
        cy.url('https://demoqa.com/samplesdas')
        cy.get('#sampleHeading').contains('This is a sample page')
      })
})