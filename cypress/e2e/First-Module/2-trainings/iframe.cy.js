describe('Handling Iframe with Cypress', () => {
    it('Redirect to the Page and find elements in iframe', () => {
        cy.visit('https://iframetester.com/?url=https://cialfo.co').wait(8000)
        cy.frameLoaded('#iframe-window')
        cy.iframe('#iframe-window').find('.margin-bot-l').contains('Connecting students, counselors, and higher ed institutions')
        .should('be.visible')
        cy.iframe('#iframe-window').find('.w-button').contains('Contact Us').click()
        .wait(3000)
        cy.iframe('#iframe-window')
        .find('.margin-bot-xs')
        .contains('Got a question about Cialfo?')
        .should('be.visible')
        
        // outside the iframe assertion //
        cy.contains('About this site').should('be.visible')
    })

    it('iframe handling on DemoQA page', () => {
        cy.visit('https://demoqa.com/frames')
        cy.frameLoaded('#frame1')
        cy.iframe("#frame1").find("#sampleHeading").contains('This is a sample page').should('be.visible')
        // second iframe //
        cy.frameLoaded('#frame2')
        cy.iframe("#frame2").find("#sampleHeading").contains('This is a sample page').should('be.visible')
    })

    // // Handling Nested Frames //
    it('Nested Iframes handling on DemoQA page', () => {
        cy.visit('https://demoqa.com/nestedframes')
        cy.frameLoaded('#frame1')
        cy.iframe("#frame1").contains('Parent frame').should('be.visible')
        
        // Handeling nested frame that is child frame of frame1 //
        cy.iframe("#frame1")
           .find('[srcdoc="<p>Child Iframe</p>"]')
           // access the body element of an iframe, where 0 is a reference to the first iframe element on the page //
           .its('0.contentDocument.body')
           .contains('Child Iframe')
    })

    // drag & drop in iframes //
    it('Iframe Handling for Cross Origin URLs in Frame', () => {
        cy.visit('https://www.globalsqa.com/demo-site/draganddrop/')
        .wait(1000)
        cy.get('.resp-tab-item')
        .contains('Accepted Elements')
        .should('be.visible')
        .click()
        .wait(3000)

        cy.frameLoaded('.resp-tab-content-active iframe')
        // cy.iframe('.resp-tab-content-active iframe').find('#draggable').move('#droppable', {force: true})
        cy.iframe('.resp-tab-content-active iframe')
        .find('#draggable')
        .trigger('mousedown', { which: 1, pageX: 100, pageY: 100 })
        .trigger('mousemove', { which: 1, pageX: 250, pageY: 100 })
        .trigger('mouseup')
        .wait(3000)
    })
})