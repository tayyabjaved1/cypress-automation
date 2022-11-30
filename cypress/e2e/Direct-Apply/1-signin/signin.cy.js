/// <reference types="cypress" />

describe('Check Sign In Functionality', () => {

  const user = {
    email: 'tayyab.javed+cypress@cialfo.com.sg',
    password: 'Test1234',
  };

  //Calling the user login function from 
  it('Login with the Existing User', () => {
    cy.signIn(user);
  });

  //Verifying the URL
  it('Verify the URL after login',() => {
    cy.location('pathname').should('contain', '/app/22585/home-new');
  })
  
  //Verifying the texts on page after login
  it('Verify the Texts/Elements on Page after Login', () => {
    cy.contains('Dashboard').should('be.visible')
    cy.get('.ant-tabs-tab-btn').contains('Universities') 
  })

})
