import { BasePage } from '../../support/core/base-page';

export class TextBoxPage extends BasePage {
  get path() { return '/text-box'; }

  waitForLoaded() {
    cy.findByRole('heading', { name: 'Text Box' }).should('be.visible');
  }

  /** @param data the TextBoxData fields to submit */
  submit(data) {
    cy.findByPlaceholderText('Full Name').type(data.fullName);
    cy.findByPlaceholderText('name@example.com').type(data.email);
    cy.findByPlaceholderText('Current Address').type(data.currentAddress);
    // Unlike the other fields on this page, DemoQA gives Permanent Address no placeholder/accessible name.
    cy.get('#permanentAddress').type(data.permanentAddress);
    cy.findByRole('button', { name: 'Submit' }).click();
  }

  /** @param data the TextBoxData that was submitted, to verify echoed back */
  expectSubmitted(data) {
    // #output has no accessible role/label of its own — DemoQA's id for the result panel.
    cy.get('#output').within(() => {
      cy.contains(data.fullName).should('be.visible');
      cy.contains(data.email).should('be.visible');
      cy.contains(data.currentAddress).should('be.visible');
      cy.contains(data.permanentAddress).should('be.visible');
    });
  }
}
