
// Test main.js file to make sure it's properly connected to index.html
console.log('hello world!')

// Initiate the 5 round game upon button click
document.querySelector('button').addEventListener('click', playGame)

// Get the computer's randomized choice between rock, paper, and scissors
function getComputerChoice() {
    let randomNumber = Math.random()
    let computerChoice

    if (randomNumber < .33) {
        computerChoice = "rock"
    }
    else if (randomNumber < .66) {
        computerChoice = "paper"
    }
    else {
        computerChoice = "scissors"
    }
    return computerChoice
}

// Get the human's choice with validation to ensure it is rock, paper, or scissors
function getHumanChoice() {
    let humanChoice = prompt('What is your choice?','').toLowerCase()

    function validateChoice() {
        if (humanChoice != 'rock' && humanChoice != 'paper' && humanChoice != 'scissors') {
            humanChoice = prompt('Invalid input.  Please try again.','')
            validateChoice()
        }
    }

    validateChoice()
    return humanChoice
}

// Set the initial scores of the human and the computer

let humanScore = 0
let computerScore = 0

// Simulate a single round of rock paper scissors
function playRound () {
   let humanChoice = getHumanChoice()
   let computerChoice = getComputerChoice()

    // If human wins,
    if (humanChoice === "rock" && computerChoice === "scissors" ||
        humanChoice === "paper" && computerChoice === "rock" ||
        humanChoice === "scissors" && computerChoice === "paper") {
        
        // Create a new paragraph in the HTML
        const humanVictoryMessage = document.createElement('p')
        // Put a message into that paragraph
        humanVictoryMessage.textContent = `You win! ${humanChoice} beats ${computerChoice}.`
        // Append that paragraph onto the battle-results div
        document.getElementById('battle-results').appendChild(humanVictoryMessage)
        // Increment human score
        humanScore += 1;
    }
    // If it's a draw,
    else if (humanChoice === computerChoice) {
        // Create a new paragraph in the HTML
        const drawMessage = document.createElement('p')
        // Put a message into that paragraph
        drawMessage.textContent = `Its a draw! You both chose ${humanChoice}.`
        // Append that paragraph onto the battle-results div
        document.getElementById('battle-results').appendChild(drawMessage)
    }
    // Otherwise (if computer wins),
    else {
        // Create a new paragraph in the HTML
        const computerVictoryMessage = document.createElement('p')
        // Put a message into that paragraph
        computerVictoryMessage.textContent = `Computer wins! ${computerChoice} beats ${humanChoice}.`
        // Append that paragarph onto the battle-results div
        document.getElementById('battle-results').appendChild(computerVictoryMessage)
        // Increment the computer score
        computerScore +=1;
    }

    // Update the human score in the DOM
    document.getElementById('human-tally').innerText = `${humanScore}`
    // Update the computer score in the DOM
    document.getElementById('computer-tally').innerText = `${computerScore}`

}

// Execute playRound 5 times while leaving time in between to update the DOM with results
function playGame() {
    let rounds = 5
    let currentRound = 0

    function playNextRound() {
        if (currentRound < rounds) {
            playRound();
            currentRound++;
            setTimeout(playNextRound, 1000);
        }
    }

    playNextRound();
}