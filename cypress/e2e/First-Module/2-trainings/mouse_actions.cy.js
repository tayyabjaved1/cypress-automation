const demourl = 'https://demo.opencart.com/'
const qaurl = 'https://demoqa.com'

describe('Check Mouse Actions', () => {
    it('Mouseover functionality' , () => {
        cy.visit(demourl)
        cy.get('.dropdown-toggle')
        .contains('Components')
        .should('be.visible')
        .trigger('mouseover')
        .click()  // click is used here because trigger does not necessarily activate any dropdown menu or navigation that is associated with that element//
        .wait(2000)

        cy.get('.nav-link')
        .contains('Monitors (2)')
        .should('be.visible')
        .click()
        .wait(3000)
    })

    it('Right Click functionality' , () => {
        cy.visit(`${qaurl}/buttons`)
        cy.get('#rightClickBtn')
        .contains('Right Click Me')
        .should('be.visible')
        .rightclick()
        .wait(2000)

        cy.get('#rightClickMessage')
        .contains('You have done a right click')
        .should('be.visible')
        .wait(2000)
    })

    it('Double Click functionality' , () => {
        cy.visit(`${qaurl}/buttons`)
        cy.get('#doubleClickBtn')
        .contains('Double Click Me')
        .should('be.visible')
        .dblclick()
        .wait(2000)

        cy.get('#doubleClickMessage')
        .contains('You have done a double click')
        .should('be.visible')
        .wait(2000)
    })

    it('Drag & Drop Functionality' , () => {
        cy.visit(`${qaurl}/dragabble`)
        cy.get('#dragBox')
        .contains('Drag me')
        .trigger('mousedown', { which: 1, pageX: 100, pageY: 100 }) //triggered when the mouse button is pressed down on an element//
        .trigger('mousemove', { which: 1, pageX: 400, pageY: 100 }) // triggered draggable element, simulating the movement of the mouse //
        .trigger('mouseup')  // mouseup means a mouse button being released on the element //
        .wait(2000)

        // cy.get('.sourceitem').drag('.targetitem') //
    })

    it('Scrolling to Element Functionality' , () => {
        cy.visit(demourl)
        cy.get('.list-unstyled a').contains('Terms & Conditions')
        .scrollIntoView()
        .should('be.visible')
        .wait(2000)

        cy.get('.dropdown-toggle')
        .contains('Desktops')
        .scrollIntoView()
        .should('be.visible')
        .wait(2000)
    })
})