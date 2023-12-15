// Create div to contains 3 buttons
let choices = ["rock", "paper", "scissor"];

let divButtons = document.createElement("div");
divButtons.setAttribute("id", "choices-containers");


// Create 3 buttons
for (let i = 0; i <= 2; i++) {

    // div containing image and button
    let div = document.createElement("div");
    div.classList.add("choice");

    let image = document.createElement("img");
    image.setAttribute("src", "images/" + choices[i] + ".png");
    image.classList.add("icon");

    div.appendChild(image);

    let button = document.createElement("button");
    button.textContent = choices[i];
    button.classList.add("button");
    div.appendChild(button);

    divButtons.appendChild(div);
}

document.body.appendChild(divButtons);


// Add events for 3 buttons
function handleButtonClick() {
    playRound(this.textContent);
};

const buttons = document.querySelectorAll(".button");

buttons.forEach((button) => {
    button.addEventListener('click', handleButtonClick);
})


// div to display choices and winner in a round
let winnerRound = document.createElement("div");
winnerRound.classList.add("inform");
document.body.insertBefore(winnerRound, divButtons);

let playerImg = document.createElement("img");
playerImg.classList.add("choice-img");

let compImg = document.createElement("img");
compImg.classList.add("choice-img");



// Decide computer choice in random
function getComputerChoice() {

    // return a number from 0 to 2
    return Math.floor(Math.random() * 3);
}

// Convert choice in string to int and reverse
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

function reverseSymbol(playerSelection) {
    switch (playerSelection) {
        case 0:
            return "rock";
        case 1:
            return "paper";
        case 2:
            return "scissor";
    }
}

// Annouce choices from both sides
function announceChoice(playerSelection, computerSelection) {
    // Clear the content of winnerRound before appending new images
    winnerRound.innerHTML = "";

    // Player side
    playerImg.setAttribute("src", "images/" + playerSelection + ".png");

    // Computer side
    computerSelection = reverseSymbol(computerSelection);
    compImg.setAttribute("src", "images/" + computerSelection + ".png");

    let imgChoices = document.createElement("div");
    imgChoices.setAttribute("id", "img-container");
    imgChoices.appendChild(playerImg);
    imgChoices.appendChild(compImg);

    winnerRound.appendChild(imgChoices);
}


// Score handling
function updateScore(decision) {
    const player = document.querySelector(".player-score");
    const computer = document.querySelector(".comp-score");

    let playerPoint = parseInt(player.textContent, 10);
    let computerPoint = parseInt(computer.textContent, 10);

    let p = document.createElement("p");
    p.classList.add("announce");

    if (decision > 0) {
        p.textContent = "Player got 1 point"
        playerPoint++;
    }
    else if (decision < 0) {
        p.textContent = "Computer got 1 point";
        computerPoint++;
    }
    else {
        p.textContent = "Tie!";
    }

    if (endgame(playerPoint, computerPoint)) {
        restart();
    }

    
    player.textContent = playerPoint;
    computer.textContent = computerPoint;
    winnerRound.append(p);
}

function playRound(playerSelectionString) {
    playerSelection = convertSymbol(playerSelectionString);
    let computerSelection = getComputerChoice();

    // Rules to decide the outcome of the round
    // 1 is win, 0 is tie, -1 is lose
    // rows from the first one to the last one are for rock, paper, scissor respectively 
    let rules = [[0, -1, 1], [1, 0, -1], [-1, 1, 0]];

    let decision = rules[playerSelection][computerSelection];

    announceChoice(playerSelectionString, computerSelection);

    updateScore(decision);
}

function endgame(playerPoint, computerPoint) {
    let final = document.createElement("p");
    final.setAttribute("id", "winner");

    if (playerPoint === 5) {
        final.textContent = "player WIN!";
        document.body.insertBefore(final, winnerRound);
        return true;
    }
    else if (computerPoint === 5) {
        final.textContent = "computer WIN!";
        document.body.insertBefore(final, winnerRound);
        return true;
    }
    return false;
}

function restart() {

    buttons.forEach((button) => {
        button.removeEventListener('click', handleButtonClick);
    })
    
    // Display restart button
    let button = document.createElement("button");
    button.classList.add("button");
    button.classList.add("restart");
    button.textContent = "Do you want to restart?";

    document.body.insertBefore(button, winnerRound);

    // Restart Event
    const player = document.querySelector(".player-score");
    const computer = document.querySelector(".comp-score");

    button.addEventListener("click", () => {
        player.textContent = 0;
        computer.textContent = 0;

        document.body.removeChild(document.querySelector("#winner"));
        document.body.removeChild(button);
    })
}


