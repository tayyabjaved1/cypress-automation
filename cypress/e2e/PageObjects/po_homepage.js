class homepage_objects {
    PageRedirection() {
        return cy.visit('https://demo.opencart.com/')
        .wait(2000)
    }
    
    GetProdName() {
        return cy.get('h4')
    }

    GetNewPrice() {
        return cy.get('.price-new')
    }

    GetTaxedPrice() {
        return cy.get('.price-tax')
    }

    AddToCard() {
        return cy.get('[aria-label="Add to Cart"]')
    }

    WishList() {
        return cy.get('[aria-label="Add to Wish List"]')
    }

    CompareProduct() {
        return cy.get('[aria-label="Compare this Product"]')
    }

    SuccessMessage() {
        return cy.get('[class="alert alert-success alert-dismissible"]')
    }

    HeaderMenuText() {
        return cy.get('.d-md-inline')
    }

    DropDownMenu() {
        return cy.get('.dropdown-item')
    }
}
export default homepage_objects