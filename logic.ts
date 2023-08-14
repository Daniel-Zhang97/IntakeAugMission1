let modYea = '{"model": "civic", "year": 2014}'
let selfReport =
  '{"claim_history": "My only claim was a crashed into my house\'s garage door that left a scratch on my car. There are no other crashes."}'
let keyWords = ['collide', 'crash', 'scratch', 'bump', 'smash']
let overRep = '{ "car_value": 6614, "risk_rating": 5}'

const priceCalc = (in1) => {
  let sum = 0
  let parsedIn

  try {
    parsedIn = JSON.parse(in1)
  } catch (error) {
    return 'error: there is an error'
  }

  const keys = Object.keys(parsedIn)
  if (
    keys[0] !== 'model' ||
    keys[1] !== 'year' ||
    typeof parsedIn.model !== 'string' ||
    typeof parsedIn.year !== 'number'
  ) {
    return 'error: there is an error'
  }

  // Remove non-alphabetical characters from the string
  const filtered = parsedIn.model.replace(/[^A-Za-z]/g, '')

  sum = filtered
    .split('')
    .reduce((acc, x) => acc + x.toUpperCase().charCodeAt(0) - 64, 0)

  if (typeof sum !== 'number') {
    return 'error: there is an error'
  }

  const carValue = sum * 100 + parsedIn.year
  return JSON.stringify({ car_value: carValue })
}

console.log(priceCalc(modYea))

const riskCalc = (in1, words) => {
  let riskCount = 0
  let parsedReport

  try {
    parsedReport = JSON.parse(in1)
  } catch (error) {
    return 'error: "there is an error'
  }

  let keys = Object.keys(parsedReport)

  if (
    keys[0] != 'claim_history' ||
    typeof parsedReport.claim_history != 'string'
  ) {
    return 'error: "there is an error'
  }

  let splitReport = parsedReport.claim_history.toLowerCase().split(' ')
  let lowerCaseList = words.map((word) => word.toLowerCase())

  for (const word of lowerCaseList) {
    for (const userWord of splitReport) {
      if (userWord.includes(word)) {
        riskCount++
      }
      if (riskCount == 5) {
        return JSON.stringify({ risk_rating: riskCount })
      }
    }
  }
  return JSON.stringify({ risk_rating: riskCount })
}

console.log(riskCalc(selfReport, keyWords))

const quoteCalc = (in1, in2) => {
  let parsedRisk
  let parsedValue

  try {
    parsedValue = JSON.parse(in1)
  } catch (error) {
    return 'error: "there is an error'
  }

  try {
    parsedRisk = JSON.parse(in2)
  } catch (error) {
    return 'error: "there is an error'
  }

  if (
    !parsedValue.hasOwnProperty('car_value') ||
    !parsedRisk.hasOwnProperty('risk_rating') ||
    typeof parsedValue.car_value !== 'number' ||
    typeof parsedRisk.risk_rating !== 'number'
  ) {
    return 'error: "there is an error'
  }

  let yPrem = (parsedValue.car_value * parsedRisk.risk_rating) / 100
  let mPrem = yPrem / 12

  return JSON.stringify(`monthly_premium: ${yPrem}; yearly_premium: ${mPrem}`)
}

// console.log(quoteCalc(priceCalc(modYea), riskCalc(selfReport, keyWords)))

module.exports = {
  priceCalc,
  riskCalc,
  quoteCalc,
}
