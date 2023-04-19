describe('Checking for Hidden Elements', () => {
    it('Hidden Elements to Handle in Cypress', () => {
        cy.visit('https://colemanfurniture.com/')
        cy.get('[aria-label="Bedroom Sets"]').contains('Bedroom Sets')
        .invoke('show')
        .click({force:true})
        .wait(3000)

        // Using chain of commands //
        cy.get('[aria-label="Sign In"]')
        .contains('Sign In')
        .invoke('show') // to invoke the hidden element and //
        .click({force:true}) // forcefully clicking on it as without it doesn't allow to click //
        .wait(3000)

        cy.get('[aria-label="Entertainment Centers & Walls"]')
        .contains('Entertainment Centers & Walls')
        .invoke('show')
        .click({force:true})
        .wait(3000)
    })

    it('DemoQA Hidden Elements to Handle in Cypress', () => {
        cy.visit('https://demoqa.com/menu')
        cy.contains('Sub Sub Item 2')
        .invoke('show')
        .click({force:true})
        .wait(3000)
    })      
})