///<reference types="cypress" />
import po_uni_profile from "../PageObjects/po_uni_profile"
import po_pro_filters from "../PageObjects/po_pro_filters"
import { get } from "lodash";
//import { first } from "cypress/types/lodash";


describe('Apply Program Filters on University DA Section', () => {
    const user = {
        email: 'tayyab.javed+cypress@cialfo.com.sg',
        password: 'Test1234',
      };
      
      before(() => {
        cy.signIn(user);
      });

    // assigning value to uni profile page objects  
    const university = new po_uni_profile()
    const filters = new po_pro_filters()
    const filter_types = ['Course type', 'Department', 'Scholarship']

      //Land on DA University
      it('Verify the DA university', () => {
        cy.visit('/app/students/22585/research_new/087-529-new-york-university#profile')
        cy.wait(10000)
        university.getCourseTitle().contains('Courses').click()
        cy.wait(2000)
      })

      it('Verify the Filters button', () => {
        filter_types.forEach( type => {
            filters.getfiltersbutton().contains(type).should('be.visible')
        })
      })

      it('Filter by Course Type', () =>{
        filters.getfiltersbutton().contains('Course type').click()
        cy.wait(2000)

        filters.getCheckBox().first().check()
        cy.wait(3000)

        university.getProgramName().contains('Test Additional Program with Links')
          .should('be.visible')
      })

      it('Uncheck the Course Type Filter', () =>{
        filters.getCheckBox().uncheck()
        cy.wait(3000)
        university.getProgramName().contains(' Accountancy BS - Accountancy & Information ')
          .should('be.visible')
      })

      it('Apply Department Filter', () => {
        filters.getfiltersbutton().contains('Department').click()
        cy.wait(2000)
        filters.getCheckBox().first().check()
        cy.wait(3000)

        university.getProgramName().contains(' Asia Pacific Studies and Chinese (TT13)')
        cy.wait(2000)
      })

      it('Uncheck the Department Filter', () =>{
        filters.getCheckBox().uncheck({ force: true })
        cy.wait(3000)
        university.getProgramName().contains(' Accountancy BS - Accountancy & Information ')
          .should('be.visible')
      })

      it('Search Program from Listing', () => {
        filters.getInputField().first().type('Computer Science')
        cy.wait(2000)

        university.getProgramName().contains('Computer Science (G402)')

      })
})