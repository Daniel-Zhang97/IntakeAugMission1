document.addEventListener('DOMContentLoaded', () => {
  const quoteForm = document.getElementById('quoteForm')
  const formContainer = document.querySelector('.form-container')
  const quoteContainer = document.getElementById('quoteContainer')

  quoteForm.addEventListener('submit', async (event) => {
    event.preventDefault()

    const model = document.getElementById('model').value
    const year = parseInt(document.getElementById('year').value)
    const selfReport = document.getElementById('selfReport').value

    const response = await fetch('/index', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        modYea: { model, year },
        selfReport: { claim_history: selfReport },
        keyWords: ['collide', 'crash', 'scratch', 'bump', 'smash'],
      }),
    })

    const result = await response.json()
    console.log(result)
    console.log(result.calculations.yearly)

    const priceResultHtml = `<p>Estimated car value: ${result.calculations.price}</p>`
    const riskResultHtml = `<p>Estimated risk factor: ${result.calculations.risk}</p>`
    const quoteHtml = `
      <p>Quote</p>
      <p>Yearly: $${result.calculations.yearly.toFixed(
        2
      )} | Monthly: $${result.calculations.monthly.toFixed(2)}</p>
    `

    quoteContainer.innerHTML = priceResultHtml + riskResultHtml + quoteHtml

    // Slide the form to the right and show the quote container
    formContainer.classList.add('shifted')
    quoteContainer.style.transform = 'translate(-100%, -50%)'
    quoteContainer.style.opacity = '1'

    quoteContainer.style.right = '0'
  })
})
