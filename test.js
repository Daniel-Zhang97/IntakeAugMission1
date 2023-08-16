const request = require('supertest')
const app = require('./api.js') // Adjust the path based on your folder structure
const expect = require('expect.js') // Import the expect.js library

describe('Final API /index test ', () => {
  it('should return the correct information given correct inputs', async () => {
    const requestBody = {
      modYea: { model: 'civic', year: 2014 },
      selfReport: {
        claim_history: 'My car collided with another vehicle.',
      },
      keyWords: ['collide'],
    }

    const response = await request(app).post('/index').send(requestBody)

    expect(response.status).to.be(200)
    expect(response.body.calculations).to.eql({
      price: 6614,
      risk: 1,
      yearly: 66.14,
      monthly: 5.511666666666667,
    })
  })
})

describe('/price test ', () => {
  it('should return correct price calculation for correct inputs', async () => {
    const requestBody = { model: 'civic', year: 2014 }
    const response = await request(app).post('/price').send(requestBody)

    expect(response.status).to.be(200)
    expect(response.body.output).to.eql('{"car_value":6614}')
  })

  it('should return error incorrect inputs', async () => {
    const requestBody = { model: 'civic', year: '2014' }
    const response = await request(app).post('/price').send(requestBody)

    expect(response.status).to.be(200)
    expect(response.body.output).to.eql('error: there is an error')
  })

  it('should return with a price equal to the year when the name is non-alphabetical', async () => {
    const requestBody = { model: '911', year: 2014 }
    const response = await request(app).post('/price').send(requestBody)

    expect(response.status).to.be(200)
    expect(response.body.output).to.eql('{"car_value":2014}')
  })
})

describe('/risk test ', () => {
  it('should return correct risk assessment for correct inputs', async () => {
    const requestBody = {
      claim_history:
        "My only claim was a crashed into my house's garage door that left a scratch on my car. There are no other crashes.",
    }
    const response = await request(app).post('/risk').send(requestBody)

    expect(response.status).to.be(200)
    expect(response.body.output).to.eql('{"risk_rating":3}')
  })

  it('should return 5 when more than 5 keywords incorrect inputs', async () => {
    const requestBody = {
      claim_history:
        'I love crashing crashing crashing crashing crashing crashing crashing crashing crashing crashing crashing.',
    }
    const response = await request(app).post('/risk').send(requestBody)

    expect(response.status).to.be(200)
    expect(response.body.output).to.eql('{"risk_rating":5}')
  })

  it('should return with error if empty', async () => {
    const requestBody = {}
    const response = await request(app).post('/risk').send(requestBody)

    expect(response.status).to.be(200)
    expect(response.body.output).to.eql('error: there is an error')
  })
})
