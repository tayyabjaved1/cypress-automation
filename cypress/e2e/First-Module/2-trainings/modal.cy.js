describe('Checking for Modal Handling', () => {
    it('(GOD-TC-202) Checking Small Modal with Cypress', () => {
        cy.visit('https://demoqa.com/modal-dialogs')
        
        // click on Modal //
        cy.get('#showSmallModal')
        .contains('Small modal')
        .should('be.visible')
        .click()
        .wait(3000).as('SmallModal')

        // verify content on Modal //
        cy.get('#example-modal-sizes-title-sm').contains('Small Modal').should('be.visible')
        cy.get('.modal-body').contains('This is a small modal. It has very less content')
        .should('be.visible').wait(2000)

        //close Modal //
        cy.get('#closeSmallModal')
        .contains('Close')
        .click()
        .wait(2000)

        // calling the 'SmallModal' alias here //
        cy.get('@SmallModal').should('contain', 'Small modal')
    })

    it('Checking Large Modal with Cypress', () => {
        cy.visit('https://demoqa.com/modal-dialogs')
        
        // click on Modal //
        cy.get('#showLargeModal')
        .contains('Large modal')
        .should('be.visible')
        .click()
        .wait(3000).as('LargeModal')

        // verify content on Modal //
        cy.get('#example-modal-sizes-title-lg').contains('Large Modal').should('be.visible')
        cy.get('p').contains('Lorem Ipsum is simply dummy text of the printing and typesetting industry.')
        .should('be.visible').wait(2000)

        //close Modal //
        cy.get('#closeLargeModal')
        .contains('Close')
        .click()
        .wait(2000)

        // calling the 'LargeModal' alias here //
        cy.get('@LargeModal').should('contain', 'Large modal')
    })

})