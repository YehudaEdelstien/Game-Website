window.onload = () => {
    board = document.getElementById("board");
    let boardState = [];
    
    let isClicking = false;
    board.addEventListener("mouseover", selectedCell);
    board.addEventListener("mousedown", clickedCell);
    document.addEventListener("mouseup", mouseUp)

    boardRows = 10;
    boardCols = 10;

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
        console.log(boardState)
    }

    function clickedCell(e) {
        isClicking = true;
        selectedCell(e);
    }

    function mouseUp(){
        isClicking = false;
    }
};
