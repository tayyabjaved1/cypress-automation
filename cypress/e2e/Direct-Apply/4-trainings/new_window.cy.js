describe('New Browser window to open', () => {
  it('Handling New Browser Window', function () {
    cy.visit('https://demoqa.com/browser-windows')
    
    //used method to handle current window and created stub of it //
    // cy.window().then((NewWin) => {
    //     cy.stub(NewWin, 'open', url => {
    //         NewWin.location.href = 'https://demoqa.com/sample';
    //     }).as("win")
    // })

    // used custom command here to handle window getting called from commands.js file //
    cy.stubWindowOpen('https://demoqa.com/sample')
    cy.get('#windowButton').click()

    cy.get('@newTab').should("be.called")
    cy.get('h1').should('have.text', 'This is a sample page')
    cy.wait(3000)

    cy.go('back')
    cy.url().should('eq','https://demoqa.com/browser-windows')
  })

  // it.only('working with windows or origin', () => {
  //   cy.visit('https://ultimateqa.com/button-success');
  
  //   // Click the Facebook share button
  //   cy.get('.entry-content > .swp_social_panel > .swp_facebook > .nc_tweet')
  //    // .invoke('removeAttr', 'target')
  //     .click();
  
  //   // Wait for the new window to load the Facebook login form
  //   cy.window().its('location.href').should('include', 'facebook.com');
  //   cy.window().its('document.body').should('contain', 'Log in to Facebook');
  
  //   // Make assertions on the new window
  //   cy.get('h2').should('have.text', 'Facebook');
  // });

  it('working with windows or origin', () => {
    cy.visit("https://ultimateqa.com/button-success")
    cy.get('.entry-content > .swp_social_panel > .swp_facebook > .nc_tweet')
    .invoke('removeAttr', 'target')
    .click()
    .wait(1000)
    // trying out origin method //
    cy.origin('https://www.facebook.com/share.php',()=> {
      cy.url().should('contain', 'share.php')
      cy.get('.signup_box_content > ._42ft').contains('Sign Up')
   })
  })

  describe("Hidden Elements", () => 
{

    const user = 
    {
      email : "hina+clg@cialfo.com.sg",
      password : "12345678" 
    }
  
    it.only("signin", () => {
      cy.signIn(user);
      cy.wait(4000);
     });

     it("Hidden elements", () => {
        // cy.visit("https://explore-beta.cialfo.link/events");
         cy.get(".icon-side-bar").contains("School Visits").click();
          cy.get(".btn-secondary").contains("Download Visits").invoke('show').click({force:true})
          .wait(3000);
       });

})
})