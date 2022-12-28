/** @type {HTMLCanvasElement} */
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const image = new Image()
image.src = 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/DVD_logo.svg/1200px-DVD_logo.svg.png';
const imgw = image.width * 0.1//0.08;
const imgh = image.height * 0.1//0.08;

const colorsArr = ['red', 'blue', 'green', 'violet'
];

let x = 0;
let y = 0;
let playerSize = 500
let pPos = 40;
let px = 200//20;
let py = 150 //canvas.height - 40 - playerSize;
let valueX = -1;
let valueY = -1;
let colorPos = 0;
let winCounter = 0;


function main() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    makePosition()
    let colisionColor = getColision(px, py, playerSize, playerSize, x, y, imgw, imgh)
    drawSquare(x, y)
    drawDVD(x, y);
    drawPlayer(px, py, colisionColor);
    
    wincheck(x, y);
}

function drawSquare(x, y) {
    ctx.fillStyle = colorsArr[colorPos]
    ctx.fillRect(x, y, imgw, imgh);

}

function drawDVD(x, y) {
    ctx.drawImage(image, x, y, imgw, imgh)
}



function makePosition() {
    if (x <= 0 || x >= canvas.width - imgw) {
        valueX *= -1;
        changeColor()
    }

    if (y <= 0 || y >= canvas.height - image.height * 0.08) {
        valueY *= -1;
        changeColor()

    }
    x += valueX;
    y += valueY;
}

function changeColor() {
    if (colorPos + 1 == colorsArr.length) {
        colorPos = 0;

    } else {
        colorPos++
    }
}

function wincheck(x, y) {
    if (
        x == 0 && y == 0 ||
        x == canvas.width && y == 0 ||
        x == canvas.width && y == image.height ||
        x == 0 && y == image.height
    ) {
        winCounter++
        console.log(`you win ${winCounter} times`);
    }
}

function drawPlayer(px, py, c) {
    ctx.fillStyle = c? 'grey' : 'black'
    ctx.fillRect(px, py, playerSize, playerSize)
}

function movePlayer(num) {
    px += num;
}

function move() {
    if (px + pPos < 20 || px + pPos > canvas.width - playerSize) {
        pPos *= -1;
    }
    movePlayer(pPos)
}

function getColision(x1, y1, w1, h1, x2, y2, w2, h2) {
    if (
        x1 > x2     &&  x1 < x2+w2    &&  y1 > y2   &&  y1 < y2+h2   ||
        x1+w1 > x2  &&  x1+w1 < x2+w2 &&  y1 > y2   &&  y1 < y2+h2   ||
        x1 > x2     && x1 < x2+w2     && y1+h1 > y2 && y1+h1 < y2+h2 ||
        x1+w1 > x2  && x1+w1 < x2+w2  && y1+h1 > y2 && y1+h1 < y2+h2
    ) {
        console.log('we have colision!!!');
        return true;
    }
}


// setInterval(move, 1000 / 2)
setInterval(main, 1000 / 60);