window.onload = () => {
    const boardTable = document.getElementById("board");
    const topNumbers = document.getElementById("topNumbers");
    const sideNumbers = document.getElementById("sideNumbers");
    const victoryElement = document.getElementById("victoryText");

    let boardState = [];
    
    let isClicking = false;
    boardTable.addEventListener("mouseover", selectedCell);
    boardTable.addEventListener("mousedown", clickedCell);
    document.addEventListener("mouseup", mouseUp)

    let boardRows = 5;
    let boardCols = 5;

    let currentPuzzle = [
        [false,true,false,true,false],
        [true,true,true,true,true],
        [true,true,true,true,true],
        [false,true,true,true,false],
        [false,false,true,false,false]
    ]

    function makeBoard() {
        makeCells();
        makeNumbers(topNumbers, colNumbers);
        makeNumbers(sideNumbers, rowNumbers);
    }

    function makeCells() {
        for (let i = 0; i < boardRows; i++) {
            let row = boardTable.insertRow();
            boardState.push([]);
            for (let j = 0; j < boardCols; j++) {
                let cell = row.insertCell();
                boardState[i].push(false);
            }
        }
    }

    function makeNumbers(el, func){
        for (let i = 0; i < boardRows; i++){
            const numHolder = document.createElement("div");
            numHolder.className = "numberElement";
            if (el === topNumbers){
                numHolder.classList.add("topNumberElement");
            } else {
                numHolder.classList.add("sideNumberElement");
            }
            el.appendChild(numHolder);

            const colNums = func(i);
            for (let num of colNums){
                const numDiv = document.createElement("div");
                numDiv.innerHTML = num;
                numDiv.className = "number";
                numHolder.appendChild(numDiv);
            }
        }
    }

    function colNumbers(col){
        const numArr = [];
        let counter = 0
        for(let i = 0; i < boardRows; i++){
            if (currentPuzzle[i][col] === true){
                counter++;
            } else if (counter > 0) {
                numArr.push(counter);
                counter = 0;
            }
        }
        if (counter > 0){
            numArr.push(counter);
        }
        return numArr;
    }

    function rowNumbers(row){
        const numArr = [];
        let counter = 0
        for(let i = 0; i < boardCols; i++){
            if (currentPuzzle[row][i] === true){
                counter++;
            } else if (counter > 0) {
                numArr.push(counter);
                counter = 0;
            }
        }
        if (counter > 0){
            numArr.push(counter);
        }
        return numArr;
    }
    makeBoard();
    
    
    // input events
    function selectedCell(e) {
        if (isClicking === false || e.target.cellIndex === undefined) return;

        const cell = e.target;
        const row = cell.closest("tr");
        const cellnums = [row.rowIndex, cell.cellIndex]

        cell.classList.toggle("selectedCell");
        boardState[cellnums[0]][cellnums[1]] = !boardState[cellnums[0]][cellnums[1]];
        checkVictory();
    }

    function clickedCell(e) {
        isClicking = true;
        selectedCell(e);
    }

    function mouseUp(){
        isClicking = false;
    }

    function checkVictory () {
        if (boardState.toString() === currentPuzzle.toString()){
            victoryElement.style.display = "flex";
        }
    }
};
