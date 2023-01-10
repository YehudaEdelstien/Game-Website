window.onload = () => {
    const boardTable = document.getElementById("board");
    const topNumbers = document.getElementById("topNumbers");
    const sideNumbers = document.getElementById("sideNumbers");

    let boardState = [];
    
    let isClicking = false;
    boardTable.addEventListener("mouseover", selectedCell);
    boardTable.addEventListener("mousedown", clickedCell);
    document.addEventListener("mouseup", mouseUp)

    let boardRows = 5;
    let boardCols = 5;

    function makeBoard() {
        for (let i = 0; i < boardRows; i++){
            let row = boardTable.insertRow();
            boardState.push([]);
            for (let j = 0; j < boardCols; j++){
                let cell = row.insertCell();
                boardState[i].push(false);
            }
        }
    }
    makeBoard();
    
    // input events
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
