const express = require('express')
const app = express()
const path = require('path')
const port = 8000
let keyWords = ['collide', 'crash', 'scratch', 'bump', 'smash']

// Serve static files (HTML, CSS, JavaScript) from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')))

const { priceCalc, riskCalc, quoteCalc } = require('./logic.ts')
const { log } = require('console')

app.use(express.json())

app.post('/index', (req, res) => {
  const modYea = JSON.stringify(req.body.modYea)
  const selfReport = JSON.stringify(req.body.selfReport)
  const keyWords = req.body.keyWords

  const priceResult = priceCalc(modYea)
  const riskResult = riskCalc(selfReport, keyWords)
  const quote = quoteCalc(priceResult, riskResult)
  const calculations = {
    price: JSON.parse(priceResult).car_value,
    risk: JSON.parse(riskResult).risk_rating,
    yearly: JSON.parse(quote).yearly_premium,
    monthly: JSON.parse(quote).monthly_premium,
  }

  res.json({ calculations })
})

app.post('/price', (req, res) => {
  const inputs = JSON.stringify(req.body)
  const output = priceCalc(inputs)
  res.json({ output })
})

app.post('/risk', (req, res) => {
  const inputs = JSON.stringify(req.body)
  const output = riskCalc(inputs, keyWords)
  res.json({ output })
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})

module.exports = app
