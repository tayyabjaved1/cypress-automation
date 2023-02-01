/// <reference types="cypress" />

const signup_url = "https://sandbox.cialfo.sg/v3/users/access_student_create?access_token=Zx2EE58K0tyzL8V4Xh7GLYYhQzHcz7Q05jrRXAcfw1"
const randomEmail = "tayyab.test" + "+" + Math.random().toString(36).substring(7) + "@cialfo.com.sg"
const randomString = () => Math.random().toString(36).substring(7);

describe('Signup Tests', () => {
  const signup = (f_name, l_name, email, password, gender, expectedStatus, expectedMessage, expectedValue) => {
    cy.request({
      method: 'POST',
      url: signup_url,
      failOnStatusCode: false,
      headers: {
        'Content-Type': 'application/json',
        'access_token': 'Zx2EE58K0tyzL8V4Xh7GLYYhQzHcz7Q05jrRXAcfw1',
        'locale': 'eng-US',
        'User-Agent': 'wTRGdmtTaDUzdCDD',
        'platform': 'web'
      },
      body: {
        user:{
          password: password,
          has_accepted_conditions: true,
          first_name: f_name,
          last_name: l_name,
          email: email,
          gender: gender,
         // "mobile":"{{phone}}",
          "device_info":
          {
              "platform":"web"
          }
      }
    }
    }).then(response => {
      expect(response.status).to.eq(expectedStatus)
      expect(response.body.status).to.have.property('message', expectedMessage)
      expect(response.body.status.details.user).to.have.property('last_name', l_name)
     //expect(response.body).to.have.property('email', expectedValue)

    })
  }

  it('Verify the response when the student is signed up successfully', () => {
    signup('Tayyab', randomString(), randomEmail, 'Test1234', 'M', 200, 'OK')
    //cy.wait(15000)
  })

  it('Should return 422 status code for missing required information including "Password", "Email", "LastName" ', () => {
    signup('Tayyab', '', '', '', 'M', 422, 'Unprocessable Entity')
    cy.wait(40000)
  })

  it('Verify the response if user tries to signup up with existing email', () => {
    signup('Tayyab', randomString(), 'tayyab.javed+student150@cialfo.com.sg', 'Random1234', 'M', 422, 'Unprocessable Entity')
  })
})
