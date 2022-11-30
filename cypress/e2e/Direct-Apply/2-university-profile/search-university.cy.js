/// <reference types="cypress" />

describe('Search DA & UCAS University', () => {
    const user = {
        email: 'tayyab.javed+cypress@cialfo.com.sg',
        password: 'Test1234',
      };
      
      before(() => {
        cy.signIn(user);
      });
    
    //Redirecting to university search page from clicking sidebar menu
    it('Redirect to University Search Page', () => {
        cy.get('.sb-open-show').contains('Universities').click()
        cy.wait(5000)
       
       //check the current url
       cy.location('pathname').should('contain', '/app/students/22585/research_new');
       cy.contains('Universities / Search').should('be.visible')
    })

      //Search DA University by adding query in input field
      it('Search DA University', () => {
        cy.get('input[type=text]').clear().type('Australian Institute of Business')
        // cy.get('.webkit-appearance-none').contains('Direct Apply').click()
        // cy.get('input[type=checkbox]').first().check()
        cy.wait(10000)
    })
        //verify the search result of DA uni
        it('A Verify the searched university', () =>{
            cy.get('.line-clamp-3').contains('Australian Institute of Business')
        })

})