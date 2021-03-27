let botScore = 0
let playerScore = 0

document.querySelectorAll('.player-choice').forEach(choice => {
  choice.addEventListener('click', playGame)
})

function clearChosen() {
  document.querySelectorAll('.player-choice').forEach(choice => {
    choice.classList.remove(`chosen`)
  })
}

function playGame(event) {
  const clickedElement = event.target.closest(`button`);
  let playerChoice = clickedElement.id

  clearChosen()
  clickedElement.classList.add(`chosen`)

  fetch(`/choose?choice=${playerChoice}`).then(response => response.json()).then((response) => {
    document.querySelector(`#result`).innerText = response.result 
    document.querySelector(`#player-hand`).innerText = playerChoice
    document.querySelector(`#bot-hand`).innerText = response.botChoice
  })
}