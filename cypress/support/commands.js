// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

/// <reference types="cypress" />
/// <reference types = "Cypress-iframe"/>
import 'cypress-iframe'
import '@4tw/cypress-drag-drop'
//import { find } from 'cypress/types/lodash'

// importing page objects files here //
import po_homepage from "/cypress/e2e/PageObjects/po_homepage.js"
import po_signup from "/cypress/e2e/PageObjects/po_signup"

Cypress.on('uncaught:exception', (err, runnable) => {
  // return false to prevent Cypress from failing the test
  return false
})

Cypress.Commands.add('signIn', (user) =>{
    cy.visit('/app/auth/signin')
    cy.get('input[type=text]').type(user.email)
    cy.get('input[type=password').type(user.password)
    cy.get('[type=submit]').contains('Sign In').click()
    cy.wait(10000)
})

// Adding Custom Command for Handling Windows, Tabs & ALerts //
Cypress.Commands.add("stubWindowOpen", (url) => {
    cy.window().then((win) => {
      cy.stub(win, "open", () => {
        win.location.href = url
      }).as('newTab')
    })
  })  

  Cypress.Commands.add('verifyTableRowData', (tableSelector, columnIndex, columnValue) => {
    let matchFound = false
    cy.get(tableSelector)
      .find('tbody tr')
      .each(($row) => {
        const rowColumn1 = $row.find(`td:nth-child(${columnIndex[0]})`).text()
        if (rowColumn1 === columnValue[0]) {
          const rowColumn2 = $row.find(`td:nth-child(${columnIndex[1]})`).text()
          const rowColumn3 = $row.find(`td:nth-child(${columnIndex[2]})`).text()
  
          expect(rowColumn2).to.equal(columnValue[1])
          expect(rowColumn3).to.equal(columnValue[2])
          matchFound = true
        }
      })
      .then(() => {
        expect(matchFound).to.be.true
      })
  })

  Cypress.Commands.add('clearLogs', () => {
    cy.window().then((win) => {
      const cypressConsole = win.console._commandLineAPI
      if (cypressConsole) {
        cypressConsole.clear()
      }
    })
  })
  
  