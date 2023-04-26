describe('Assertions in Cypress', () => {
    it('Implicit Assertions', () => {
        cy.visit('https://demo.opencart.com/')
        cy.url().should('include', 'opencart')
        .should('eq', 'https://demo.opencart.com/')
        .and('contain', 'demo')
        .and('not.contain', 'livecart')

        cy.get('h4').eq(0)
        .should('contain', 'MacBook')
        .and('be.visible')

        cy.get('.price-new')
        .eq(1)
        .should('have.class', 'price-new')
        .and('have.css', 'font-weight', '600')

        cy.get('.price-tax')
        .should('have.length', '4')

        cy.get('.price-tax').its('length')

        cy.get('input[type="text"]')
        .should('have.attr', 'name', 'search')
        .and('not.have.class', 'disabled')

        //cy.get('#checkbox').should('be.checked')
    })

    it('Explicit Assertions', () => {
        let expPrice = '$602.00'
        cy.get('.price-new').eq(0).then((price) =>{
            let actPrice = price.text()
            expect(actPrice).to.be.equal(expPrice)

            assert.equal(actPrice, expPrice)
        })

        let expProdName = 'dsdApple Cinema 30"'
        cy.get('h4').eq(2).then( (prodName) =>{
            let actProdName = prodName.text()
            //expect(actProdName).to.be.equal(expProdName)

            assert.notEqual(actProdName, expProdName)
        })

        // let expItemName = 'Apple Cinema 30"';
        // cy.get('h4').then((itemName) => {
        //     let actItemName = itemName.text();
        //     if (actItemName === expItemName) {
        //         expect(actItemName).to.be.equal(expItemName);
        //     } else {
        //         assert.notEqual(actItemName, expItemName);
        //     }
        // })

        // cy.get('h4').each(($el, index) => {
        //     if (index === 2) {
        //       const actualProductName = $el.text();
        //       const expectedProductName = 'dsdApple Cinema 30"';
              
        //       if (actualProductName !== expectedProductName) {
        //         throw new Error(`Product name doesn't match: expected ${expectedProductName}, but got ${actualProductName}`);
        //       }
        //     }
        //   });
          
    })
})