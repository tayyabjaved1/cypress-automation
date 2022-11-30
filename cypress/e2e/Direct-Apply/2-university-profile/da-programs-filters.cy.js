///<reference types="cypress" />
import po_uni_profile from "../PageObjects/po_uni_profile"
import po_pro_filters from "../PageObjects/po_pro_filters"


describe('Search DA & UCAS University', () => {
    const user = {
        email: 'tayyab.javed+cypress@cialfo.com.sg',
        password: 'Test1234',
      };
      
      before(() => {
        cy.signIn(user);
      });

    // assigning value to uni profile page objects  
    const university = new po_uni_profile()
    const filters = new po_pro_filters
    const filter_types = ['Course type', 'Department', 'Scholarship']

      //Land on DA University
      it('Verify the DA university', () => {
        cy.visit('/app/students/22585/research_new/3c2-cff-qa-university#profile')
        cy.wait(10000)
        university.getCourseTitle().contains('Courses').click()
        cy.wait(2000)
      })

      it('Verify the Filters button', () => {
        filter_types.forEach( type => {
            filters.getfiltersbutton().contains(type).should('be.visible')
        })
      })

      //it('Filter by Course Type', )
})