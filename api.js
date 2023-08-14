const express = require('express')
const app = express()
const path = require('path') // Add this line
const port = 8000

// Serve static files (HTML, CSS, JavaScript) from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')))

// Import your functions from logic.js
const { priceCalc, riskCalc, quoteCalc } = require('./logic.ts')
const { log } = require('console')

app.use(express.json()) // Enable JSON parsing for request bodies

app.post('/index', (req, res) => {
  const modYea = JSON.stringify(req.body.modYea)
  const selfReport = JSON.stringify(req.body.selfReport)
  const keyWords = req.body.keyWords

  const priceResult = priceCalc(modYea)
  const riskResult = riskCalc(selfReport, keyWords)
  const quote = quoteCalc(priceResult, riskResult)

  res.json({ quote })
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
