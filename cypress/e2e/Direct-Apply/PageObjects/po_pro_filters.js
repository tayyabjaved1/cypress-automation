class program_filters {
    getfiltersbutton() {
        return cy.get('app-button-primary-secondary')
    }
    
    getCheckBox() {
        return cy.get('input[type=checkbox]')
    }
}
export default program_filters