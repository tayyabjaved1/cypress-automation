///<reference types="cypress" />
cy.requestHeader =  {
    'Content-Type': 'application/json',
    'tenant-access-token': 'Zx2EE58K0tyzL8V4Xh7GLYYhQzHcz7Q05jrRXAcfw1',
    'user-token':'e2a83ee5a1bc6f580ebc9b125d95dccbabdbb8ec89c27a60c8630a13dc2088ce',
    'User-Agent': 'wTRGdmtTaDUzdCDD',
    'platform': 'web'
  }
  const programs_types_url = 'https://sandbox.cialfo.sg/v3/schools/2000076/direct_apply_program_types'
    describe('Get Programs Types', () => {
      it('Getting the Direct Apply Programs types', () => {
        cy.request({
          method: 'GET',
          url: programs_types_url,
          headers: cy.requestHeader,
          failOnStatusCode: false
        }).then( response => {
            expect(response.status).to.eq(200)
            expect(response.body.status.details.direct_apply_program_types[0]).to.have.property('id', 1)
            expect(response.body.status.details.direct_apply_program_types[0]).to.have.property('title', 'Pre-Sessional English')
            expect(response.body.status.details.direct_apply_program_types[1]).to.have.property('title', 'Direct Admission')
        })
      })
    })