const site_url = 'https://qavbox.github.io/demo/webtable/'
describe('Tables Handling in Cypress', () => {
    it('Checking number of rows & Columns in Table', function () {
        cy.visit(site_url)
        cy.get('#table01 > thead > tr > th').should('have.length', '4')
        cy.get('#table01 > tbody > tr').should('have.length', '3')
        cy.get('#table02 > tbody > tr > td').should('have.length', '330')
    })
    
    it('Checking data inside the table', function () {
        cy.get('#table01 > tbody > tr > td')
        //cy.get('#table01 > tbody > tr:nth-child(2) > td:nth-child(3)')
        .contains('Functional')
        .should('be.visible')

        cy.get('#table01 > tbody > tr:nth-child(2) > td:nth-child(5) > input')
        .as('button')
        .click()
        cy.get('@button')
        .should('have.attr', 'value', 'Deleted')

        cy.get('#table02 > tbody > tr:nth-child(6) > td:nth-child(3)')
        .contains('New York')
        .should('be.visible')
    })

    it('Reading Data from table', function(){
        cy.get('#table01 tbody tr').each(($row) => {
            const column1 = $row.find('td:nth-child(1)').text()
            const column2 = $row.find('td:nth-child(2)').text()
            const column3 = $row.find('td:nth-child(3)').text()
            const column4 = $row.find('td:nth-child(4)').text()
          
            const logMessage = `Name: ${column1}, Position: ${column2}, Office: ${column3}, Age: ${column4}` 
            cy.log(logMessage)
            // used cy.writeFile method which will generate a log.txt file and save the logs of generated data from table //
            cy.writeFile('logs.txt', logMessage + '\n', { flag: 'a+' })
          })
    })
    
    it('Checking data in same row', function () {
        
        // reading data from same rows script //
        cy.get('#table02 > tbody > tr').each(($row) => {
            const name = $row.find('td:nth-child(1)').text()
            if (name === 'Garrett Winters') {
              const position = $row.find('td:nth-child(2)').text()
              const office = $row.find('td:nth-child(3)').text()
          
              expect(position).to.equal('Accountant')
              expect(office).to.equal('Tokyo')
            }
          }) 
        
        // this method is called out from custom command where script written for reading the data from same table and also throws error if assertion is falied //
        cy.verifyTableRowData('#table01', [2, 3, 4], ['Performance', 'Coded UI', 'QC ALM'])
        cy.verifyTableRowData('#table02', [1, 3, 2], ['Rhona Davidson', 'Tokyo', 'Integration Specialist'])
          
    }) 

})