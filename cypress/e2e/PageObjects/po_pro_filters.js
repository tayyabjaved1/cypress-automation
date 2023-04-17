class program_filters {
    getfiltersbutton() {
        return cy.get('app-button-primary-secondary')
    }
    
    getCheckBox() {
        return cy.get('input[type=checkbox]')
    }

    getInputField() {
        return cy.get('input[type=text]')
    }
}
export default program_filters