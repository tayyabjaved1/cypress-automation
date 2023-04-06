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

  it.only('working with windows or origin', () => {
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
})