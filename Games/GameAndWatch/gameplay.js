/** @type {HTMLCanvasElement} */
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const image = new Image()
image.src = 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/DVD_logo.svg/1200px-DVD_logo.svg.png';
const imgw = image.width * 0.08;
const imgh = image.height * 0.08;

const colorsArr = ['red', 'blue', 'green', 'violet'
];

let x = 0;
let y = 0;
let playerSize = 50
let px = 20;
let py = canvas.height - 40 - playerSize;
let valueX = -1;
let valueY = -1;
let colorPos = 0;
let winCounter = 0;


function main() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    makePosition()
    drawSquare(x, y)
    drawDVD(x, y);
    drawPlayer(px, py);

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

function drawPlayer(px, py) {
    ctx.fillStyle = 'black'
    ctx.fillRect(px, py, playerSize, playerSize)
}

function movePlayer(num) {
    px += num;
}

function move() {
    if (px <= 0 || px >= canvas.width - playerSize) {
        movePlayer(-50)
    }
    movePlayer(50)
}


setInterval(move, 1000 / 2)
setInterval(main, 1000 / 60);