/// <reference types="cypress" />

describe('POST API Login Request', () => {

const core_url = "https://sandbox.cialfo.sg/v3/sessions?access_token=Zx2EE58K0tyzL8V4Xh7GLYYhQzHcz7Q05jrRXAcfw1&locale=en-US&platform=web"

it('POST request', () => {
cy.request({
    method: 'POST',
    url: core_url,
    headers: {
        'Content-Type': 'application/json',
        'access_token': 'Zx2EE58K0tyzL8V4Xh7GLYYhQzHcz7Q05jrRXAcfw1',
        'locale': 'eng-US',
        'platform': 'web'
    },
    body: {
        email: 'tayyab.javed+student150@cialfo.com.sg',
        password: 'Test1234'
    }
}).then((response) => {
    expect(response.status).to.eq(200);
    expect(response.headers).to.have.property('content-type', 'application/json; charset=utf-8');
    
    expect(response.body).to.have.property('message');
    const message = response.body.message;
    console.log(`Message: ${message}`);
    expect(message).to.eq('Cialfo test dev');
});
})
})
