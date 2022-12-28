/** @type {HTMLCanvasElement} */
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

let x = 0,
    y = 0;

function drawSquare(x,y) {
    ctx.beginPath();
    ctx.fillStyle ='red'
    ctx.fillRect(x, y, 31, 43);
    
}
function main() {
    ctx.clearRect(0,0, canvas.width, canvas.height)
    x += x <= 100 ?  1 : -1
    drawSquare(x,y)
    
}

setInterval(main, 1000/60)