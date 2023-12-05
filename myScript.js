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

function playRound(playerSelection, computerSelection) {
    playerSelection = convertSymbol(playerSelection);

    // Rules to decide the outcome of the round
    // 1 is win, 0 is tie, -1 is lose
    // rows from the first one to the last one are for rock, paper, scissor respectively 
    rules = [[0, -1, 1], [1, 0, -1], [-1, 1, 0]];

    return rules[playerSelection][computerSelection];
}