import { BasePage } from '../../support/core/base-page';

export class PracticeFormPage extends BasePage {
  get path() { return '/automation-practice-form'; }

  waitForLoaded() {
    cy.findByRole('heading', { name: 'Practice Form' }).should('be.visible');
  }

  /** @param student the StudentData fields to submit */
  submit(student) {
    cy.findByPlaceholderText('First Name').type(student.firstName);
    cy.findByPlaceholderText('Last Name').type(student.lastName);
    cy.findByPlaceholderText('name@example.com').type(student.email);
    cy.findByLabelText(student.gender, { exact: true }).click({ force: true });
    cy.findByPlaceholderText('Mobile Number').type(student.mobile);
    // react-datepicker's input exposes no accessible label/placeholder of its own.
    // Never .clear() this field: an empty value leaves the picker's internal
    // selected-date state null, and its calendar popup crashes the whole app
    // trying to read .getMonth() off it (a real bug in the site's own code,
    // not a Cypress quirk -- verified live). Select-all + overwrite in one
    // keystroke sequence instead, so the field is never empty mid-interaction.
    // Separate cy.get() calls, not one chain: typing re-renders the calendar
    // popup, detaching the element Cypress was still holding a reference to.
    cy.get('#dateOfBirthInput').type(`{selectall}${student.dateOfBirth}`);
    cy.get('#dateOfBirthInput').type('{esc}');
    cy.findByPlaceholderText('Current Address').type(student.address);
    cy.findByRole('button', { name: 'Submit' }).click();
  }

  /** @param student the StudentData that was submitted, to verify echoed back */
  expectSubmission(student) {
    // Bootstrap's modal component exposes no accessible name distinguishing it from other dialogs.
    cy.get('.modal-content').within(() => {
      cy.contains(`${student.firstName} ${student.lastName}`).should('be.visible');
      cy.contains(student.email).should('be.visible');
      cy.contains(student.mobile).should('be.visible');
    });
  }
}
