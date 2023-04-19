describe('Page Objects tests execution', () => {
    
    const homepage = new po_homepage()
    const signup = new po_signup()

    it('verify the content with page objects on homepage', () => {
        homepage.PageRedirection()
        homepage.GetProdName('iPhone')
        // cy.get('h4').contains('iPhone').should('be.visible')
        // cy.get('h4').contains('iPhone').should('be.visible')
        homepage.GetNewPrice('$602.00')
        homepage.GetTaxedPrice('Ex Tax: $101.00')
        homepage.GetProdName('iPhone')

        homepage.AddToCard().eq(1).click().wait(2000)
        homepage.SuccessMessage().contains('Success: You have added iPhone to your shopping cart!')
        .should('be.visible')

        homepage.WishList().eq(1).click().wait(2000)
        homepage.SuccessMessage().contains('You must login or create an account to save iPhone to your wish list!')
        .should('be.visible')
    })

    it('OpenCart SignUp Page Redirection with Page Objects', () => {
        homepage.PageRedirection()
        homepage.HeaderMenuText().contains('My Account')
        .should('be.visible')
        .trigger('mouseover')
        .click()
        .wait(1000)
        
        homepage.DropDownMenu().eq(3)
        .contains('Register')
        .click()
    })

    it('Open Cart Sign up wit POM', () =>{
        const firstName = 'Tayyab'
        const lastName = `Tester+${Math.floor(Math.random() * 100000)}`
        const email = `test+${Math.floor(Math.random() * 100000)}@test.com`
        const password = 'password123'
        
        
        signup.fillFirstName(firstName)
        signup.fillLastName(lastName)
        signup.fillEmail(email)
        signup.fillPassword(password)
        signup.agreePrivacyPolicy().wait(2000)
        signup.clickContinueButton()
        .wait(4000)

        signup.SignupSuccessMessage().contains('Your Account Has Been Created!')
        .should('be.visible')
    })
})