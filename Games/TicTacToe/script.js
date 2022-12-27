const board = [null, "", "", "", "", "", "", "", "", ""]
const output = document.getElementById("output")

let waitForBot = false;
let playerX = true;
let turnCounter = 0;
// let vsCom = false;
let vsCom = true;
// let vsAI = false
let vsAI = true;
getScore()

for (let i = 0; i < board.length - 1; i++) { //addEventListener
    document.getElementsByClassName("cell")[i].addEventListener("click", play)
}



////////////////////////////////////////////////

function play() {
    if (gameFinished() || waitForBot) return;

    let makeMove = set(this, playerX ? "X" : "O"); //Player plays

    if (makeMove) {
        endTurn()

        if (vsCom && !gameFinished()) {
            waitForBot = true;
            setTimeout(() => { //🤖 compueter plays
                if (vsAI) {
                    comSmartPlay();
                    waitForBot = false;
                    return
                }
                comDumpPlay();
                waitForBot = false;
            }, 600);
        }

    }

}

function endTurn() {
    setOutput();
    turnCounter++;
    playerX = !playerX;
}

function randomCOM() {
    let makeMove = false;
    while (!makeMove) {
        let random = Math.floor(Math.random() * (9));
        let cell = document.getElementsByClassName('cell');
        makeMove = set(cell[random], playerX ? "X" : "O");
    }
}
function comDumpPlay() {
    randomCOM();
    endTurn();
}

function comSmartPlay() {
    let result1 = checkAI(playerX ? 'X' : 'O');
    let result2 = checkAI(!playerX ? 'X' : 'O');

    if (result1) {
        set(document.getElementById(result1), playerX ? 'X' : 'O')
        console.log(result1);
    }
    else if (result2) {
        console.log(result2);
        set(document.getElementById(result2), playerX ? 'X' : 'O')
    }
    else {
        randomCOM()
    }

    endTurn()
}

function checkAI(char) {
    const B = board;
    if (
        B[1] == "" && (
            char == B[2] && B[2] == B[3] ||
            char == B[4] && B[4] == B[7] ||
            char == B[5] && B[5] == B[9]
        )
    ) {
        return 'cell1';
    }

    if (
        B[2] == "" && (
            char == B[1] && B[1] == B[3] ||
            char == B[5] && B[5] == B[8]
        )
    ) {
        return 'cell2';
    }

    if (
        B[3] == "" && (
            char == B[1] && B[1] == B[2] ||
            char == B[6] && B[6] == B[9] ||
            char == B[5] && B[5] == B[7]
        )
    ) {
        return 'cell3';
    }

    if (
        B[4] == "" && (
            char == B[5] && B[5] == B[6] ||
            char == B[1] && B[1] == B[7]
        )
    ) {
        return 'cell4';
    }

    if (
        B[5] == "" && (
            char == B[4] && B[4] == B[6] ||
            char == B[2] && B[2] == B[8] ||
            char == B[1] && B[1] == B[9] ||
            char == B[3] && B[3] == B[7]
        )
    ) {
        return 'cell5';
    }

    if (
        B[6] == "" && (
            char == B[4] && B[4] == B[5] ||
            char == B[3] && B[3] == B[9]
        )
    ) {
        return 'cell6';
    }

    if (
        B[7] == "" && (
            char == B[8] && B[8] == B[9] ||
            char == B[4] && B[4] == B[1] ||
            char == B[5] && B[5] == B[3]
        )
    ) {
        return 'cell7';
    }

    if (
        B[8] == "" && (
            char == B[7] && B[7] == B[9] ||
            char == B[2] && B[2] == B[5]
        )
    ) {
        return 'cell8';
    }

    if (
        B[9] == "" && (
            char == B[7] && B[7] == B[8] ||
            char == B[3] && B[3] == B[6] ||
            char == B[5] && B[5] == B[1]
        )
    ) {
        return 'cell9';
    }
}

function gameFinished() {
    if (winCheck()) {
        return true

    } else if (turnCounter == 9) {
        return true

    } else {
        return false
    }
}



function set(cell, XorO) {
    if (cell.textContent == "") {

        cell.innerText = XorO;
        cell.classList.add(XorO == "X" ? "red" : "blue")

        board[cell.id.slice(4)] = XorO;
        console.log(board);

        return true;
    } else {
        return false;
    }
}


function setOutput() {
    let reload = '<br><button onclick="window.location.reload()"> Play Again </button>'

    if (winCheck()) {
        output.innerHTML = playerX ? "X Win!" + reload : "O Win!" + reload;
        output.classList.add(playerX ? "red" : "blue");

    } else if (turnCounter == 8) {
        output.innerHTML = "draw..." + reload;

    } else if (!playerX) {
        output.innerHTML = "<span class = 'red'>X</span> <--- O";
    } else {
        output.innerHTML = "X ---> <span class = 'blue'>O</span>";
    }



}


function winCheck() {

    //all those variables used to check if is there 1 line or column with "x" or "o" 
    let line1 = board[1] != "" && board[1] == board[2] && board[2] == board[3],
        line2 = board[4] != "" && board[4] == board[5] && board[5] == board[6],
        line3 = board[7] != "" && board[7] == board[8] && board[8] == board[9],
        column1 = board[1] != "" && board[1] == board[4] && board[4] == board[7],
        column2 = board[2] != "" && board[2] == board[5] && board[5] == board[8],
        column3 = board[3] != "" && board[3] == board[6] && board[6] == board[9],
        diag1 = board[1] != "" && board[1] == board[5] && board[5] == board[9],
        diag2 = board[3] != "" && board[3] == board[5] && board[5] == board[7];

    if (line1 || line2 || line3 ||
        column1 || column2 || column3
        || diag1 || diag2) {
        return true;
    }
    return false;
}

function getScore() {

}
