const board = [null, "", "", "", "", "", "", "", "", ""]
let output;

let waitForBot = false;
let playerX = true;
let turnCounter = 0;
// let vsCom = false;
let vsCom = true;
// let vsAI = false
let vsAI = true;

window.onload = () => {
    for (let i = 0; i < board.length - 1; i++) { //addEventListener
        document.getElementsByClassName("cell")[i].addEventListener("click", play)
        output = document.getElementById("output")
    }
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
    let movement = checkAI(playerX ? 'X' : 'O') || checkAI(!playerX ? 'X' : 'O');

    if (movement) {
        set(document.getElementById(movement), playerX ? 'X' : 'O')
        console.log(movement);

    } else {
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
    const B = board;
    //all those variables used to check if is there 1 line or column with "X" or "O" 
    let line1 = B[1] != "" && B[1] == B[2] && B[2] == B[3],
        line2 = B[4] != "" && B[4] == B[5] && B[5] == B[6],
        line3 = B[7] != "" && B[7] == B[8] && B[8] == B[9],
        column1 = B[1] != "" && B[1] == B[4] && B[4] == B[7],
        column2 = B[2] != "" && B[2] == B[5] && B[5] == B[8],
        column3 = B[3] != "" && B[3] == B[6] && B[6] == B[9],
        diag1 = B[1] != "" && B[1] == B[5] && B[5] == B[9],
        diag2 = B[3] != "" && B[3] == B[5] && B[5] == B[7];

    if (line1 || line2 || line3 ||
        column1 || column2 || column3
        || diag1 || diag2) {
        return true;
    }
    return false;
}

function scoreObj() {
    obj = {
        vsCom: 0,
        vsAI: 0,
        vsFriend: 0
    }
}
