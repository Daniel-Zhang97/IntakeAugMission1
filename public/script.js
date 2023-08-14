document.addEventListener('DOMContentLoaded', () => {
  const quoteForm = document.getElementById('quoteForm')
  const quoteContainer = document.getElementById('quoteContainer')

  quoteForm.addEventListener('submit', async (event) => {
    event.preventDefault()

    const model = document.getElementById('model').value
    const year = parseInt(document.getElementById('year').value)
    const selfReport = document.getElementById('selfReport').value

    const response = await fetch('/index', {
      // Correct endpoint: /index
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

    const quoteHtml = `<p>Quote: ${result.quote}</p>`
    quoteContainer.innerHTML = quoteHtml
  })
})
