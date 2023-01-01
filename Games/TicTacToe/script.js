//מערך ללוח
const board = [null, "", "", "", "", "", "", "", "", ""]

// לוח מצב
let output;

// חיובי: תור איקס | שלילי תור עיגול
let turnX = true;

// סופר תורות
let turnCounter = 0;

// ניקוד
let score = 0;
let scoreS = 0;
// HighScore ניקוד
let scoreDB = doesUserExist(getCurrentUser()).TicTacToe || 0;
let highScore = scoreDB.vsCom || 0;
let highScoreS = scoreDB.vsSmartCom || 0;

// מפעיל רובוט
let vsCom = true;
// מפעיל רובוט רמה ב
let vsSmartCom = true;
// מחכה לרובוט
let waitForCom = false;


// הרצה בטעינת העמוד
window.onload = () => {
    for (let i = 0; i < board.length - 1; i++) { //addEventListener
        document.getElementsByClassName("cell")[i].addEventListener("click", play)
        output = document.getElementById("output")
        printScore();
    }

}



// מפעיל פעולות על המשבצת שנלחצה 
function play() {
    if (gameFinished() || waitForCom) return;

    let makeMove = set(this, turnX ? "X" : "O"); //👨‍🦰 Player plays

    if (makeMove) {
        endTurn()

        if (vsCom && !gameFinished()) {
            waitForCom = true;

            setTimeout(() => { //🤖 compueter plays
                vsSmartCom ? comSmartPlay() : comDumpPlay();
                waitForCom = false;
            }, 600);
        }

    }

}

//מסיים את התור
function endTurn() {
    setOutput();
    scoreUp();
    turnCounter++;
    turnX = !turnX;
}

// מחזיר משבצת פנויה רנדומלית בשביל הבוט
function randomCOM() {
    let makeMove = false;
    while (!makeMove) {
        let random = Math.floor(Math.random() * (9));
        let cell = document.getElementsByClassName('cell');
        makeMove = set(cell[random], turnX ? "X" : "O");
    }
}

// רובוט רמה א
function comDumpPlay() {
    randomCOM();
    endTurn();
}

//רובוט רמה ב
function comSmartPlay() {
    let movement = checkAI(turnX ? 'X' : 'O') || checkAI(!turnX ? 'X' : 'O');

    if (movement) {
        set(document.getElementById(movement), turnX ? 'X' : 'O')
    } else {
        randomCOM()
    }
    endTurn()
}

// בודק אם יש שתי תווים צמודים ומחזיר את המשבצת הפנויה
// משמש את בוט רמה ב כדי לנצח / לחסום
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

// בודק אם נגמר המשחק
function gameFinished() {
    if (winCheck()) {
        return true

    } else if (turnCounter == 9) {
        return true

    } else {
        return false
    }
}


// מניח איקס / עיגול על הלוח לפי משבצת נתונה
function set(cell, XorO) {
    if (cell.textContent == "") {

        cell.innerText = XorO;
        cell.classList.add(XorO == "X" ? "red" : "blue")

        board[cell.id.slice(4)] = XorO;

        return true;
    } else {
        return false;
    }
}

// מדפיס סטרינג ללוח המצב
function setOutput() {
    let reload = '  <button class="button" onclick="resetAll()"> Play Again </button>'

    if (winCheck()) {
        output.innerHTML = turnX ? "X Win!" + reload : "O Win!" + reload; // ניצח
        output.classList.add(turnX ? "red" : "blue");

    } else if (turnCounter == 8) {
        output.innerHTML = "draw..." + reload; // תיקו

    } else if (turnX) {
        output.innerHTML = "X ---> <span class = 'blue'>O</span>"; // תור עיגול
    } else {
        output.innerHTML = "<span class = 'red'>X</span> <--- O"; // תור איקס
    }



}

// עובר על כל הלוח ומחפש ניצחון
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

    if (
        line1 || line2 || line3 ||
        column1 || column2 || column3
        || diag1 || diag2
    ) {
        return true;
    }
    return false;
}

function scoreUp() {
    if (
        !waitForCom &&
        vsCom &&
        winCheck()
    ) {
        if (vsCom) {
            if (!vsSmartCom) {
                score++
                highScore++
            } else {
                scoreS++
                highScoreS++
            }
        }
        // highScore = (highScore > score) ? highScore : score;
        // highScoreS = (highScoreS > scoreS) ? highScoreS : scoreS;

        const userObj = doesUserExist(getCurrentUser());
        userObj.TicTacToe = {
            vsCom: highScore,
            vsSmartCom: highScoreS,
        };
        updateUserData(userObj);
        printScore();
        console.log("🚀 ~ file: script.js:271 ~ scoreUp ~ score", scoreS)
    }
}

function printScore() {
    document.getElementById("score").innerText =
        `score ⬇️👇 ${getCurrentUser()}
                this time / all time 
        vs COM ${score} / ${highScore}
        vs smart COM ${scoreS} / ${highScoreS}`;
}

function resetAll() {
    for (let i = 1; i < board.length; i++) {
        board[i] = '';
        document.getElementById(`cell${i}`).innerText = '';
        document.getElementById(`cell${i}`).classList.remove('blue');
        document.getElementById(`cell${i}`).classList.remove('red');
    }
    output.classList.remove('blue')
    output.classList.remove('red')
    turnCounter = 0;
    waitForCom = false;
    turnX = false;
    setOutput();
    turnX = true;
}
