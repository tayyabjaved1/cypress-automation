/// <reference types="cypress" />

Cypress.on('uncaught:exception', (err, runnable) => {
    // return false to prevent Cypress from failing the test
    return false
  })
  
describe('Check New Tabs Functionality', () => {
  it('Redirect to the Page', () => {
    cy.visit('https://demoqa.com/links')
    cy.wait(2000)
  })
  
  it('Click on URL & redirect to new tab', () => {
    cy.get('#simpleLink').contains('Home').should('be.visible')
    cy.get('#simpleLink').invoke('removeAttr', 'target').click()
    cy.wait(3000)

  //Link opens in new tab and verify it
    cy.get('.card-body > h5').contains('Element')
    cy.url().should('eq','https://demoqa.com/')
    cy.go('back')
    cy.wait(2000)
    cy.url().should('eq','https://demoqa.com/links')
  })
  
  // Handling tab that don't have "target=_blank" in it //
  it('Handling new Browser Tab', function () {
    cy.visit('https://demoqa.com/browser-windows')
    cy.window().then((TestTab) => { // Tabwin is parameter of function
      cy.stub(TestTab, 'open', url => {
        TabWin.location.href = 'https://demoqa.com/sample';
      }).as("newtab")
    })
    cy.get('#tabButton').click()

    //checking that above stubed window.open method is called or not //
    cy.get('@newtab').should("be.called")
    cy.get('h1').should('have.text', 'This is a sample page')
    cy.wait(3000)
    cy.go('back')
    cy.wait(3000)
    cy.url().should('eq','https://demoqa.com/browser-windows')
  })

  // Other way to Handling tab that don't have "target=_blank" in it with cy.wrap method //
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
      // Perform Cypress commands on the new window, if needed //
      // For example, you could check the URL of the new window //
      cy.wrap(NewWin).its('location.href').should('eq', 'https://demoqa.com/sample')
      cy.get('h1').should('have.text', 'This is a sample page')
      cy.go('back')
      cy.url().should('eq','https://demoqa.com/browser-windows')
    })
  })    
})