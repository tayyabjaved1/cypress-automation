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
//import { find } from 'cypress/types/lodash'

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