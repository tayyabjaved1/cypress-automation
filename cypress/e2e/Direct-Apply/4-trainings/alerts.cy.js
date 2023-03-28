describe('Check New Tabs Functionality', () => {
    // verifying the alert box //
    it('checking alert functionality', () => {
        cy.visit('https://demoqa.com/alerts')
        cy.get('.mr-3').contains('Click Button to see alert').should('be.visible')
        cy.get('#alertButton').click()

        cy.on('window:alert', (text) => {
            expect(text)
            .to.equal('You clicked a button')
          })
    })
    
    // verifying alert box that opens after 5 seconds //
    it('checking alert functionality after 5 seconds', () => {
        cy.visit('https://demoqa.com/alerts')
        cy.get('.mr-3').contains('On button click, alert will appear after 5 seconds').should('be.visible')
        cy.get('#timerAlertButton').click()
        cy.wait(5000)

        cy.on('window:alert', (text) => {
            expect(text)
            .to.equal('This alert appeared after 5 seconds')
          })
    })

    // accepting confirmation alert box //
    it('checking confirmation of alert functionality', () => {
        cy.visit('https://demoqa.com/alerts')
        cy.get('.mr-3').contains('On button click, confirm box will appear').should('be.visible')
        cy.get('#confirmButton').click()

        cy.on('window:confirm', (text) => {
            expect(text)
            .to.equal('Do you confirm action?')
          })

        cy.get('#confirmResult').contains('You selected Ok').should('be.visible')
        cy.wait(2000)
    })

    // canceling the confirmation popup //
    it('canceling confirmation of alert functionality', () => {
        cy.visit('https://demoqa.com/alerts')
        cy.get('.mr-3').contains('On button click, confirm box will appear').should('be.visible')
        cy.get('#confirmButton').click()

        cy.on('window:confirm', (text) => {
            return false;
          })
          
        cy.get('#confirmResult').contains('You selected Cancel').should('be.visible')
        cy.wait(2000)
    })

    
    // Handling Prompt by adding Input //
    it('trigger a prompt with the input message', () => {
        cy.window().then(win => {
          cy.stub(win, 'prompt').returns('Adding test input');
          cy.get('#promtButton').click();
          cy.get('#promptResult').contains('Adding test input').should('be.visible');
          cy.wait(3000)
        })
    })
})