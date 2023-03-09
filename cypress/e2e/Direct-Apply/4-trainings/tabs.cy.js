/// <reference types="cypress" />

Cypress.on('uncaught:exception', (err, runnable) => {
    // return false to prevent Cypress from failing the test
    return false
  })
  
describe('Check New Tabs Functionality', () => {
    it('Redirect to the Page', () => {
        cy.visit('https://demoqa.com/links')
      })

      it('Click on URL & redirect to new tab', () => {
        cy.get('#simpleLink').contains('Home').should('be.visible')
        cy.get('#simpleLink').invoke('removeAttr', 'target').click()

        //Link opens in new tab and verify it
        cy.get('.card-body > h5').contains('Element')
      })

    it('Handling new Browser Tab', function () {
        cy.visit('https://demoqa.com/browser-windows')
        cy.window().then((TabWin) => {
            cy.stub(TabWin, 'open', url => {
                TabWin.location.href = 'https://demoqa.com/sample';
            }).as("newtab")
        })
        cy.get('#tabButton').click()
        cy.get('@newtab').should("be.called")
        cy.get('h1').should('have.text', 'This is a sample page')
        cy.go('back')
        cy.wait(3000)
        cy.url().should('eq','https://demoqa.com/browser-windows')
    })

    it('should handle new tab', () => {
        cy.visit('https://demoqa.com/browser-windows')
      
        cy.window().then((win) => {
            cy.stub(win, 'open', url => {
                win.location.href = 'https://demoqa.com/sample';
            }).as("windowOpen")
        })
        cy.get('#tabButton').click()
      
        cy.get('@windowOpen').should('be.calledOnce')
      
        cy.get('@windowOpen').should('be.calledWith', '/sample')
      
        cy.window().then((NewWin) => {
          // Perform Cypress commands on the new window, if needed
          // For example, you could check the URL of the new window:
          cy.wrap(NewWin).its('location.href').should('eq', 'https://demoqa.com/sample')
          cy.get('h1').should('have.text', 'This is a sample page')
          cy.go('back')
          cy.url().should('eq','https://demoqa.com/browser-windows')
        })
      })
      
      
})