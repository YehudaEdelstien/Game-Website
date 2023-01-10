window.onload = () => {
    board = document.getElementById("board");
    topNumbers = document.getElementById("topNumbers");
    sideNumbers = document.getElementById("sideNumbers");

    let boardState = [];
    
    let isClicking = false;
    board.addEventListener("mouseover", selectedCell);
    board.addEventListener("mousedown", clickedCell);
    document.addEventListener("mouseup", mouseUp)

    boardRows = 5;
    boardCols = 5;

    function makeBoard() {
        for (let i = 0; i < boardRows; i++){
            let row = board.insertRow();
            boardState.push([]);
            for (let j = 0; j < boardCols; j++){
                let cell = row.insertCell();
                boardState[i].push(false);
            }
        }
    }
    makeBoard();
    
    function selectedCell(e) {
        if (isClicking === false || e.target.cellIndex === undefined) return;

        const cell = e.target;
        const row = cell.closest("tr");
        cell.classList.toggle("selectedCell");
        boardState[row.rowIndex][cell.cellIndex] = !boardState[row.rowIndex][cell.cellIndex];
    }

    function clickedCell(e) {
        isClicking = true;
        selectedCell(e);
    }

    function mouseUp(){
        isClicking = false;
    }
};
