// Create div to contains 3 buttons
let choices = ["rock", "paper", "scissor"];

let divButtons = document.createElement("div");
divButtons.setAttribute("id", "butts-containers");

// Create 3 buttons
for (let i = 0; i <= 2; i++) {
    let button = document.createElement("button");
    button.textContent = choices[i];
    button.setAttribute("id", choices[i]);

    divButtons.appendChild(button);
}


document.body.appendChild(divButtons);

const buttons = document.querySelectorAll("button");

// Add events for 3 buttons
buttons.forEach((button) => {
    button.addEventListener('click', () => { playRound(button.getAttribute("id")) });
})

function getComputerChoice() {

    // return a number from 0 to 2
    return Math.floor(Math.random() * 3);
}

function convertSymbol(playerSelection) {

    switch (playerSelection.toLowerCase()) {
        case "rock":
            return 0;
        case "paper":
            return 1;
        case "scissor":
            return 2;
    }
}

// Score handling
function updateScore(decision) {
    const player = document.querySelector(".player-score");
    const computer = document.querySelector(".comp-score");

    let playerPoint = parseInt(player.textContent, 10);
    let computerPoint = parseInt(computer.textContent, 10);

    if (decision > 0) {
        playerPoint++;
    }
    else {
        computerPoint++;
    }

    player.textContent = playerPoint;
    computer.textContent = computerPoint;

    endgame(playerPoint, computerPoint);
}

function playRound(playerSelection) {
    playerSelection = convertSymbol(playerSelection);
    let computerSelection = getComputerChoice();

    // Rules to decide the outcome of the round
    // 1 is win, 0 is tie, -1 is lose
    // rows from the first one to the last one are for rock, paper, scissor respectively 
    let rules = [[0, -1, 1], [1, 0, -1], [-1, 1, 0]];

    let decision = rules[playerSelection][computerSelection];

    updateScore(decision);
}

function endgame(playerPoint, computerPoint) {
    let final = document.createElement("p");

    if (playerPoint === 5) {
        final.textContent = "player WIN!";
        document.body.appendChild(final);
    }
    else if (computerPoint === 5) {
        final.textContent = "computer WIN!";
        document.body.appendChild(final);
    }

}


