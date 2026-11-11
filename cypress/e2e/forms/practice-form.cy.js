import { PracticeFormPage } from '../../pages/forms/practice-form.page';
import { StudentFactory } from '../../support/data/factories/student.factory';

describe('Forms - Practice Form', () => {
  it('submits a dynamically generated student profile', { tags: ['@regression', '@ui'] }, () => {
    cy.log('**Data preparation and initialisation**');
    const practiceFormPage = new PracticeFormPage();
    const student = StudentFactory.create();

    cy.log('**Open the Practice Form page**');
    practiceFormPage.open();

    cy.log('**Submit the generated student profile**');
    practiceFormPage.submit(student);

    cy.log('**Verify the confirmation modal shows the submitted profile**');
    practiceFormPage.expectSubmission(student);
  });
});
