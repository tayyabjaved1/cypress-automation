describe('Checking for Modal Handling', () => {
    it('adding sample test', () => {
        cy.visit('https://demoqa.com/text-box')
        .wait(3000)
        cy.get('#userName').type('Tayyab Javed')
        cy.get('#userEmail').type('user@email.com')
        cy.get('#currentAddress').type('add current address')
        cy.get('#permanentAddress').type('add permanent address')
        cy.get('#submit').click()
        .wait(2000)
    })
})