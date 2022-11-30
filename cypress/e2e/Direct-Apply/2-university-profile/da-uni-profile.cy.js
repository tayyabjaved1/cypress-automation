///<reference types="cypress" />
import po_uni_profile from "../PageObjects/po_uni_profile"

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


      //Land on DA University
      it('Verify the DA university', () => {
        cy.visit('/app/students/22585/research_new/3c2-cff-qa-university#profile')
        cy.wait(10000)
        cy.contains('Universities / Search / QA University').should('be.visible')
        university.getUniversityName()
            .contains('QA University')
            .should('be.visible')
        university.getCourseTitle().contains('Courses').click()
      })

      it('Verify the DA Courses Section', () => {        
        university.getCourseName()
            .contains('Courses/Majors')
            .should('be.visible')
        university.getBenefitsHeading()
            .contains('Here are the benefits of applying with Direct Apply:')
            .should('be.visible')


        //verify the banners of benefits of programs texts for scholarship & different ways of study
        // cy.get('.mr-2').contains('Scholarships up to $10,000.00')
        // cy.get('.mr-2').contains('Different ways to study')
      })

      it('Verify the DA Courses on Program Listing Page', () =>{

        university.getUniversityName().should('exist').contains('Direct Apply');
        university.getProgramName().contains('Accounting - Business')
            .should('be.visible') //verify the course name
        
        //verifying the above program start date that has in the same row of program name
        university.getStartDate().contains('11 Jan, 2023').should('be.visible')
        
        //verifying the above program Deadline date that has in the same row of program name
        university.getEndDate().contains('10 Oct, 2024').should('be.visible')

        //verify the DA CTA against the above application
        university.getDaButton().contains('Add application').should('be.visible')

        
        // verify the DA program start date in the same row against that program name
        university.getStartDateColumn().each(($e1, index, $list) => {
            const text=$e1.text()
            if(text.includes("14 Jun, 2023"))
            {
                university.getProgramNameColumn().eq(index).then(function(pname)
                {
                    const ProName = pname.text()
                    expect(ProName).to.equal(" American Studies Bachelor of Science Cascades ")
                    
                })
                return false;
            }
        })
    })
    
    

    // Land on UK UCAS university
    it('Verify the UK/UCAS university', () => {
        cy.signIn(user);
        
        cy.visit('/app/students/22585/research_new/026-b65-aberystwyth-university#profile')
        cy.wait(15000)
        cy.contains('Universities / Search / Aberystwyth University').should('be.visible')
        university.getUniversityName().contains('Aberystwyth University')
        university.getCourseTitle().contains('Courses').click()
      })

      it('Verify the UCAS Courses Section', () => {
        university.getCourseName().contains('Courses/Majors').should('be.visible')
      })


      it('Verify the UCAS Courses on Program Listing Page', () =>{
        university.getUniversityName().should('exist').contains('Direct Apply')
        university.getProgramName().contains('Accounting and Finance (N400)')
            .should('be.visible') //verify the course name
        
        //verifying the above UCAS program start date that has in the same row of program name
        university.getStartDate().contains('12 Oct, 2023').should('be.visible')
        
        //verifying the above UCAS program Deadline date that has in the same row of program name
        university.getEndDate().contains('22 Jan, 2023').should('be.visible')

        //verify the UCAS CTA against the above application
        university.getUcasButton().contains('View course').should('be.visible')
         
        
        // verify the UCAS program start date in the same row against that program name
         university.getStartDateColumn().each(($e1, index, $list) => {
            const text=$e1.text()
            if(text.includes("12 Jan, 2023"))
            {
                university.getProgramNameColumn.eq(index).then(function(pname)
                {
                    const ProName = pname.text()
                    expect(ProName).to.equal(" Accounting and Finance/Business and Management ")
                    
                })
                return false;
            }
        })
    })
})