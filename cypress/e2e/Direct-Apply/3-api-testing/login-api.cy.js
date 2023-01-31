/// <reference types="cypress" />
const core_url = "https://sandbox.cialfo.sg/v3/sessions?access_token=Zx2EE58K0tyzL8V4Xh7GLYYhQzHcz7Q05jrRXAcfw1&locale=en-US"


describe('POST API Login Request', () => {
    const login = (username, password, expectedStatus, expectedMessage) => {
      cy.request({
      method: 'POST',
      url: core_url,
      failOnStatusCode: false,

      headers: {
        'Content-Type': 'application/json',
        'access_token': 'Zx2EE58K0tyzL8V4Xh7GLYYhQzHcz7Q05jrRXAcfw1',
        'locale': 'eng-US',
        'User-Agent': 'wTRGdmtTaDUzdCDD',
        'platform': 'web'
    },
      body: {
        user: {
          email_or_phone: username,
          password: password,
        }
    }
    })
    .then(response => {
      expect(response.status).to.eq(expectedStatus)
      expect(response.body).to.have.property('message', expectedMessage)
      expect(response.status, 'Unexpected status code').to.eq(expectedStatus)
      expect(response.body, 'Missing message property').to.have.property('message', expectedMessage)
    })
  }

  it('Should return 200 status code for successful login', () => {
    login('tayyab.javed+student150@cialfo.com.sg', 'Test1234', 200, 'Cialfo test dev')
    //cy.wait(3000)
  })

  it('Should return 400 status code for missing credentials', () => {
    login('tayyab.javed+wrongemail@cialfo.com.sg', '', 400, 'param is missing or the value is empty: password')
    cy.wait(10000)
  })

  it('Should return 401 status code for invalid login', () => {
    login('tayyab.invalidemail@cialfo.com.sg', 'WrongPass', 401, 'Email and Password combination is wrong')
  })
})
