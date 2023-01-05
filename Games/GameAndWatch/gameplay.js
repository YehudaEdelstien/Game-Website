/** @type {HTMLCanvasElement} */
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

setTimeout(() => {
    const image = document.getElementById("img");
    image.remove();
    const imgw = image.width * 0.1;
    const imgh = image.height * 0.1;


    const colorsArr = ['red', 'blue', 'green', 'violet'
    ];
    let colorPos = 0;

    let x = 0;
    let y = 0;
    let valueX = -1;
    let valueY = -1;

    const playerSize = 50;
    const pMovement = 40;
    let px = 200;
    let py = 150;

    let winCounter = 0;

    //=========//
    //  PLAYER 
    //=========//
    class player {
        constructor(x, y, w, h, step) {
            this.x = x;
            this.y = y;
            this.w = w;
            this.h = h;
            this.step = step;
        }
        drawPlayer(color) {
            ctx.fillStyle = color;
            ctx.fillRect(this.x, this.y, this.w, this.h);
        }
        movePlayer() {
            document.addEventListener('keypress', (event) => {
                let keyName = event.key;
                switch (keyName) {
                    case 'ArrowLeft':
                        this.y -= 2
                        break;
                    case 'ArrowRight':
                        this.y += 2
                        break;

                    default:
                        break;
                }
            })
        }
    }


    function drawPlayer(px, py, c) {
        ctx.fillStyle = c ? 'grey' : 'black'
        ctx.fillRect(px, py, playerSize, playerSize)
    }


    let playero = new player(7, 7, 25, 25, 10);

    //דואג שהשחקן לא יוכל לזוז כמה פסיעות בלחיצה אחת
    let checkKeyup = true;
    document.addEventListener('keyup', () => { checkKeyup = true })
    // הגדרת לחצנים
    document.addEventListener('keydown', (event) => {
        let keyName = event.key;
        console.log("🚀 ~ file: gameplay.js:26 ~ document.addEventListener ~ keyName", keyName)
        if (checkKeyup) {
            switch (keyName) {
                case 'ArrowLeft':
                    px -= pMovement;
                    playero.x -= playero.step
                    break;
                case 'ArrowRight':
                    px += pMovement;
                    playero.x += playero.step
                    break
                case 'ArrowUp':
                    py -= pMovement;
                    playero.y -= playero.step
                    break;
                case 'ArrowDown':
                    py += pMovement;
                    playero.y += playero.step
                    break
                default:
                    break;
            }
            checkKeyup = false;
        }

    })
    //=========//
    //   MAIN  //
    //=========//
    function main() {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        makeDvdPosition()
        let colisionColor = getColision(px, py, playerSize, playerSize, x, y, imgw, imgh)
        drawDvdSquare(x, y)
        drawDVD(x, y);
        drawPlayer(px, py, colisionColor);
        playero.drawPlayer('red')
        playero.movePlayer();
        wincheck(x, y);
    }

    function drawDvdSquare(x, y) {
        ctx.fillStyle = colorsArr[colorPos]
        ctx.fillRect(x, y, imgw, imgh);

    }

    function drawDVD(x, y) {
        ctx.drawImage(image, x, y, imgw, imgh)
    }



    function makeDvdPosition() {
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
            x1 + w1 > x2 &&
            x1 < x2 + w2 &&
            y1 + h1 > y2 &&
            y1 < y2 + h2
        ) {
            console.log('we have colision!!!');
            return true;
        }
    }



    // setInterval(move, 1000 / 2)
    setInterval(main, 1000 / 60);
}, 10);