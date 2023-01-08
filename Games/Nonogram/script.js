window.onload = () => {
    board = document.getElementById("board");
    
    let isClicking = false;
    board.addEventListener("mouseover", selectedCell);
    board.addEventListener("mousedown", clickedCell);
    document.addEventListener("mouseup", mouseUp)

    boardRows = 5;
    boardCols = 5;

    function makeBoard() {
        for (let i = 0; i < boardRows; i++){
            let row = board.insertRow();
            for (let j = 0; j < boardCols; j++){
                let cell = row.insertCell();
            }
        }
    }
    makeBoard();
    
    function selectedCell(e) {
        if (isClicking === false || e.target.cellIndex === undefined) return;

        const cell = e.target;
        cell.classList.toggle("selectedCell");
        console.log(cell.cellIndex)
    }

    function clickedCell(e) {
        isClicking = true;
        selectedCell(e);
    }

    function mouseUp(){
        isClicking = false;
    }
};
