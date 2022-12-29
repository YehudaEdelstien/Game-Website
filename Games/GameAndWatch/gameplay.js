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
let valueX = -1;
let valueY = -1;
let colorPos = 0;

const playerSize = 50
const pMovement = 40;
let px = 200//20;
let py = 150 //canvas.height - 40 - playerSize;


let winCounter = 0;

document.addEventListener('keydown', (event) => {
    let keyName =  event.key;
    console.log("🚀 ~ file: gameplay.js:26 ~ document.addEventListener ~ keyName", keyName)
    switch (keyName) {
        case 'ArrowLeft':
            px -= pMovement;
            break;
        case 'ArrowRight':
            px += pMovement;
            break
        case 'ArrowUp':
            py -= pMovement;
            break;
        case 'ArrowDown':
            py += pMovement;
            break
        default:
            break;
    }
})

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
    if (px + pMovement < 20 || px + pMovement > canvas.width - playerSize) {
        pMovement *= -1;
    }
    movePlayer(pMovement)
}

function getColision(x1, y1, w1, h1, x2, y2, w2, h2) {
    if (
        x1 > x2     &&  x1 < x2+w2    &&  y1 > y2   &&  y1 < y2+h2   ||
        x1+w1 > x2  &&  x1+w1 < x2+w2 &&  y1 > y2   &&  y1 < y2+h2   ||
        x1 > x2     && x1 < x2+w2     && y1+h1 > y2 && y1+h1 < y2+h2 ||
        x1+w1 > x2  && x1+w1 < x2+w2  && y1+h1 > y2 && y1+h1 < y2+h2 ||

        x2 > x1     &&  x2 < x1+w1    &&  y2 > y1   &&  y2 < y1+h1   ||
        x2+w2 > x1  &&  x2+w2 < x1+w1 &&  y2 > y1   &&  y2 < y1+h1   ||
        x2 > x1     && x2 < x1+w1     && y2+h2 > y1 && y2+h2 < y1+h1 ||
        x2+w2 > x1  && x2+w2 < x1+w1  && y2+h2 > y1 && y2+h2 < y1+h1
    ) {
        console.log('we have colision!!!');
        return true;
    }
}



// setInterval(move, 1000 / 2)
setInterval(main, 1000 / 60);