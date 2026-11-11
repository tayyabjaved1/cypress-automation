import { TextBoxPage } from '../../pages/elements/text-box.page';
import { FormFactory } from '../../support/data/factories/form.factory';

describe('Elements - Text Box', () => {
  it('submits generated text-box data and verifies the output', { tags: ['@smoke', '@ui'] }, () => {
    cy.log('**Data preparation and initialisation**');
    const textBoxPage = new TextBoxPage();
    const textBoxData = FormFactory.textBox();

    cy.log('**Open the Text Box page**');
    textBoxPage.open();

    cy.log('**Submit the generated text-box data**');
    textBoxPage.submit(textBoxData);

    cy.log('**Verify the output panel shows the submitted data**');
    textBoxPage.expectSubmitted(textBoxData);
  });
});
