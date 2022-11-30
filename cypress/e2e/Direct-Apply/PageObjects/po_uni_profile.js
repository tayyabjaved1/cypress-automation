class uni_profile{
    getUniversityName() {
        return cy.get(`.ng-star-inserted`);
    }
    
    getCourseTitle() {
        return cy.get('.ant-anchor-link-title')
    }

    getCourseName() {
        return cy.get('#courses')
    }

    getBenefitsHeading() {
        return cy.get('.mb-3')
    }

    getProgramName() {
        return cy.get('table[class=ant-table-fixed] > tbody > tr:nth-child(2) > td:nth-child(1)')
    }

    getStartDate() {
        return cy.get('table[class=ant-table-fixed] > tbody > tr:nth-child(2) > td:nth-child(4)')
    }

    getEndDate() {
        return cy.get('table[class=ant-table-fixed] > tbody > tr:nth-child(2) > td:nth-child(5)')
    }

    getDaButton() {
        return cy.get('table > tbody > tr:nth-child(2) > td > app-button-primary')
    }

    getUcasButton () {
        return cy.get('table > tbody > tr:nth-child(2) > td > app-button-primary-secondary')
    }

    getStartDateColumn() {
        return cy.get('tbody > tr > td:nth-child(4)')
    }

    getProgramNameColumn() {
        return cy.get('tbody > tr > td:nth-child(1)')
    }

}
export default uni_profile