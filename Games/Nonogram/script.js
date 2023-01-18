window.onload = () => {
    const boardTable = document.getElementById("board");
    const topNumbers = document.getElementById("topNumbers");
    const sideNumbers = document.getElementById("sideNumbers");
    const victoryElement = document.getElementById("victoryText");
    const levelSelect = document.getElementById("levelSelect");
    const backButton = document.getElementById("backButton");

    let boardState = [];

    let isClicking = false;
    let clickType = 0;

    let boardRows = 5;
    let boardCols = 5;

    let currentPuzzle = [
        [false, true, false, true, false],
        [true, true, true, true, true],
        [true, true, true, true, true],
        [false, true, true, true, false],
        [false, false, true, false, false]
    ]

    let puzzles = {
        heart:
            [
                [false, true, false, true, false],
                [true, true, true, true, true],
                [true, true, true, true, true],
                [false, true, true, true, false],
                [false, false, true, false, false]
            ],
        mask:
            [
                [false, true, true, true, false],
                [true, false, true, false, true],
                [true, true, true, true, true],
                [true, false, false, false, true],
                [false, true, true, true, false]
            ],
        tower:
            [
                [true, false, true, false, true],
                [true, true, true, true, true],
                [false, true, true, true, false],
                [false, true, false, true, false],
                [false, true, true, true, false]
            ],
        watch:
            [
                [false, true, true, true, false],
                [true, false, true, false, true],
                [true, false, true, true, true],
                [true, false, false, false, true],
                [false, true, true, true, false]
            ],
        star:
            [
                [false, false, false, false, true, true, false, false, false, false],
                [false, false, false, true, false, false, true, false, false, false],
                [true, true, true, true, true, true, true, true, true, true],
                [true, false, true, false, false, false, false, true, false, true],
                [false, true, false, false, false, false, false, false, true, false],
                [false, true, false, false, false, false, false, false, true, false],
                [true, false, true, false, false, false, false, true, false, true],
                [true, true, true, true, true, true, true, true, true, true],
                [false, false, false, true, false, false, true, false, false, false],
                [false, false, false, false, true, true, false, false, false, false]
            ],
        coffee:
            [
                [false, false, false, false, false, false, true, true, false, false],
                [false, false, false, true, true, true, true, false, false, false],
                [false, false, true, true, true, false, false, false, false, false],
                [false, true, true, true, true, true, true, false, false, false],
                [false, true, true, true, true, true, true, true, true, false],
                [false, true, true, true, true, true, true, false, true, false],
                [false, true, true, true, true, true, true, true, true, false],
                [false, true, true, true, true, true, true, false, false, false],
                [false, false, true, true, true, true, false, false, false, false],
                [true, true, true, true, true, true, true, true, true, true],
            ],
        menorah:
            [
                [true, false, true, false, true, true, false, true, false, true],
                [true, false, true, false, true, true, false, true, false, true],
                [true, false, true, false, true, true, false, true, false, true],
                [true, false, true, true, true, true, true, true, false, true],
                [true, true, false, true, true, true, true, false, true, true],
                [false, true, true, false, true, true, false, true, true, false],
                [false, false, true, true, true, true, true, true, false, false],
                [false, false, false, false, true, true, false, false, false, false],
                [false, false, false, true, true, true, true, false, false, false],
                [false, true, true, true, true, true, true, true, true, false]
            ],
        computer:
            [
                [true, true, true, true, true, true, true, true, false, false],
                [true, false, false, false, false, false, false, true, false, false],
                [true, false, false, false, false, false, false, true, false, false],
                [true, false, false, false, false, false, false, true, false, false],
                [true, false, false, false, false, false, false, true, false, false],
                [true, true, true, true, true, true, true, true, false, false],
                [false, false, false, true, true, false, false, false, false, false],
                [false, false, false, true, true, false, false, false, false, false],
                [false, false, false, true, true, false, false, false, true, true],
                [false, true, true, true, true, true, true, false, true, true]
            ],
        random5x5: randomBoard(5, 5),
        random10x10: randomBoard(10, 10),
        puzzleNames: ["heart", "mask", "tower", "watch", "star", "coffee", "menorah", "computer", "random5x5", "random10x10"]
    }

    function randomBoard(rows, cols){
        let arr = []
        for (let i = 0; i < rows; i++){
            arr.push([]);
            for (let j = 0; j < cols; j++){
                arr[i].push(Math.random() < 0.5);
            }
        }
        console.log(arr);
        return arr;
    }

    function makeBoard() {
        boardTable.innerHTML = "";
        topNumbers.innerHTML = "";
        sideNumbers.innerHTML = "";
        makeCells();
        makeNumbers(topNumbers, colNumbers);
        makeNumbers(sideNumbers, rowNumbers);
    }

    function makeCells() {
        boardState = [];
        for (let i = 0; i < boardRows; i++) {
            let row = boardTable.insertRow();
            boardState.push([]);
            for (let j = 0; j < boardCols; j++) {
                let cell = row.insertCell();
                boardState[i].push(false);
            }
        }
    }

    function makeNumbers(el, func) {
        for (let i = 0; i < boardRows; i++) {
            const numHolder = document.createElement("div");
            numHolder.className = "numberElement";
            if (el === topNumbers) {
                numHolder.classList.add("topNumberElement");
            } else {
                numHolder.classList.add("sideNumberElement");
            }
            el.appendChild(numHolder);

            const colNums = func(i);
            for (let num of colNums) {
                const numDiv = document.createElement("div");
                numDiv.innerHTML = num;
                numDiv.className = "number";
                numHolder.appendChild(numDiv);
            }
        }
    }

    function colNumbers(col) {
        const numArr = [];
        let counter = 0
        for (let i = 0; i < boardRows; i++) {
            if (currentPuzzle[i][col] === true) {
                counter++;
            } else if (counter > 0) {
                numArr.push(counter);
                counter = 0;
            }
        }
        if (counter > 0) {
            numArr.push(counter);
        }
        return numArr;
    }

    function rowNumbers(row) {
        const numArr = [];
        let counter = 0
        for (let i = 0; i < boardCols; i++) {
            if (currentPuzzle[row][i] === true) {
                counter++;
            } else if (counter > 0) {
                numArr.push(counter);
                counter = 0;
            }
        }
        if (counter > 0) {
            numArr.push(counter);
        }
        return numArr;
    }

    // input events
    function selectedCell(e) {
        if (isClicking === false || e.target.cellIndex === undefined) return;

        const cell = e.target;
        const row = cell.closest("tr");
        const cellnums = [row.rowIndex, cell.cellIndex]

        if (clickType === 2){
            cell.innerHTML = ""
            cell.classList.remove("rejectedCell");
            cell.classList.add("selectedCell");
            boardState[cellnums[0]][cellnums[1]] = true;
        } else if (clickType === 3){
            cell.classList.remove("selectedCell");
            cell.classList.add("rejectedCell")
            boardState[cellnums[0]][cellnums[1]] = false;
        } else {
            cell.classList.remove("selectedCell");
            cell.classList.remove("rejectedCell");
            boardState[cellnums[0]][cellnums[1]] = false;
        }
        if (clickType === 2){
            cell.innerHTML = ""
            cell.classList.remove("rejectedCell");
            cell.classList.add("selectedCell");
            boardState[cellnums[0]][cellnums[1]] = true;
        } else if (clickType === 3){
            cell.classList.remove("selectedCell");
            cell.classList.add("rejectedCell")
            boardState[cellnums[0]][cellnums[1]] = false;
        } else {
            cell.classList.remove("selectedCell");
            cell.classList.remove("rejectedCell");
            boardState[cellnums[0]][cellnums[1]] = false;
        }
        checkVictory();
    }

    function clickedCell(e) {
        const cell = e.target;
        const row = cell.closest("tr");
        const cellnums = [row.rowIndex, cell.cellIndex];

        if (e.which === 3){
            if (cell.classList.contains("rejectedCell")){
                clickType = 1;
            } else {
                clickType = 3;
            }
        } else if (boardState[cellnums[0]][cellnums[1]] === false) {
            clickType = 2;
        } else {
            clickType = 1;
        }
        
        isClicking = true;
        selectedCell(e);
    }

    function mouseUp() {
        isClicking = false;
    }

    // game functions
    function startGame(level) {
        boardRows = puzzles[level].length;
        boardCols = puzzles[level][0].length;
        currentPuzzle = puzzles[level];
        levelSelect.style.display = "none";
        makeBoard();
    }

    function checkVictory() {
        if (boardState.toString() === currentPuzzle.toString()) {
            victoryElement.style.display = "flex";
        }
    }

    function returnToLevelSelect(){
        victoryElement.style.display = "none";
        levelSelect.style.display = "flex";
    }

    // Event Listeners
    boardTable.addEventListener("mouseover", selectedCell);
    boardTable.addEventListener("mousedown", clickedCell);
    document.addEventListener("mouseup", mouseUp)

    const levelButtons = levelSelect.getElementsByTagName("div")
    for (let i = 0; i < levelButtons.length; i++) {
        levelButtons[i].addEventListener("click", () => { startGame(puzzles.puzzleNames[i]) });
        levelButtons[i].innerHTML = puzzles.puzzleNames[i];
    }

    backButton.addEventListener("click", returnToLevelSelect)
};
