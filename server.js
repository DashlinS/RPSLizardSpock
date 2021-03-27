//PROPERTY OF GARDNER GANG - Worked with - Asianna, Julie, Brian, Ziya, Dash, Wade, Tanecia

const express = require('express')
const app = express()
app.use(express.json({ extended: true }))
app.set(`views`, __dirname)
app.get(`/`, (request, response) => {
    response.sendFile(__dirname + `/index.html`)
})

app.use(express.static(`public`))

// our server is listening for requests, on port 3000
app.listen(3000, () => {
    console.log(`listening on 3000`)
})

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// THIS IS STUFF ONLY FOR RockPaperScissorsLizardSpock! everything above here is a standard server

app.get(`/choose`, (request, response) => {
    // request.query -> { choice: "scissors" } // doesn't have to be scissors
    // request.query.choice -> "scissors"
    const playerChoice = request.query.choice
    const botChoice = getBotChoice()

    const result = determineWinner(playerChoice, botChoice)
    response.json({ result: result, botChoice: botChoice })
})

// utility functions
function getBotChoice() {
    // define the options
    const options = ["rock", "paper", "scissors", "lizard", "spock"]
    // get a random number which corresponds to an option
    const randomIndex = Math.floor(Math.random() * options.length)

    // get the random option
    return options[randomIndex]
}

function determineWinner(playerChoice, botChoice) {
    // we look up in our mapping the moves which our move (playerChoice) can beat
    //   as in, we get the bot moves which would cause us to win
    //   or, the winningBotMoves
    const winningBotMoves = opposingHands[playerChoice]
    // three possible results:
    // win, lose, tie
    if (playerChoice === botChoice) {
        return "tie"
    } else if (winningBotMoves.includes(botChoice)) {
        return "win"
    } else {
        return "lose"
    }
}

const opposingHands = {
    // rock BEATS lizard and scissors
    // as in, if we pick rock, then we know that lizard and scissors cause us to win
    rock: [`lizard`, `scissors`],
    paper: [`rock`, `spock`],
    scissors: [`paper`, `lizard`],
    lizard: [`spock`, `paper`],
    spock: [`rock`, `scissors`]
}
