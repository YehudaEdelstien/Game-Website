//מערך ללוח
const board = [null, "", "", "", "", "", "", "", "", ""] 

// לוח מצב
let output; 

// חיובי: תור איקס | שלילי תור עיגול
let turnX = true; 

// סופר תורות
let turnCounter = 0;

// מפעיל רובוט
let vsCom = true; 
// מפעיל רובוט רמה ב
let vsSmartCom = false; 
// מחכה לרובוט
let waitForCom = false;


// הרצה בטעינת העמוד
window.onload = () => {
    for (let i = 0; i < board.length - 1; i++) { //addEventListener
        document.getElementsByClassName("cell")[i].addEventListener("click", play)
        output = document.getElementById("output")
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
                if (vsSmartCom) {
                    comSmartPlay();
                } else {
                    comDumpPlay();
                }
                waitForCom = false;
            }, 600);
        }

    }

}

//מסיים את התור
function endTurn() {
    setOutput();
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
        console.log(movement);

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
        console.log(board);

        return true;
    } else {
        return false;
    }
}

// מדפיס סטרינג ללוח המצב
function setOutput() {
    let reload = '  <button class="button" onclick="window.location.reload()"> Play Again </button>'

    if (winCheck()) {
        output.innerHTML = turnX ? "X Win!" + reload : "O Win!" + reload; // ניצח
        output.classList.add(turnX ? "red" : "blue"); 

    } else if (turnCounter == 8) {
        output.innerHTML = "draw..." + reload; // תיקו

    } else if (!turnX) {
        output.innerHTML = "<span class = 'red'>X</span> <--- O"; // תור איקס
    } else {
        output.innerHTML = "X ---> <span class = 'blue'>O</span>"; // תור עיגול
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

    if (line1 || line2 || line3 ||
        column1 || column2 || column3
        || diag1 || diag2) {
        return true;
    }
    return false;
}

// בונה אובייקט ניקוד
function scoreObj() {
    obj = {
        vsCom: 0,
        vsAI: 0,
        vsFriend: 0
    }
}
