/** @type {HTMLCanvasElement} */
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

let backgroundImg;
let playerImg;
let kid2Img;
let kid1Img;
let ambulance;


window.onload = () => {
    backgroundImg = document.getElementById('backgroundImg');
    playerImg = document.getElementById('playerImg');
    kid1Img = document.getElementById('kid1Img');
    kid2Img = document.getElementById('kid2Img');
    ambulance = document.getElementById('ambulance');
}
//===========//
//  Gameplay 
//===========//
setInterval(gameplay, 1000 / 60);

function gameplay() {
    drawCanvas();
    addCitizen()
    helpMe.forEach(element => {
        element.movement()
        element.coliderWithPlayer()
    });

}

//draw
function drawCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(backgroundImg, 0, 0, canvas.width, canvas.height)
    helpMe.forEach(element => { element.draw() });
    ctx.drawImage(ambulance, 600, 380, 150, 100)
    player.draw('red');

}

//=========//
//  Player
//=========//

const player = {
    x: (canvas.width / 2),
    y: (canvas.height / 4) * 3 - 20,
    w: 200,
    h: 130,

    step: 140,
    color: 'blue',
    canMove: true,

    draw(color = '') {
        // ctx.fillStyle = color || this.color;
        // ctx.fillRect(this.x, this.y, this.w, this.h);
        ctx.drawImage(playerImg, this.x, this.y, this.w, this.h)
    },
    moveRight() {
        this.x += this.step;
        if ((this.x + this.w + this.step) > (canvas.width)) {
            this.x = canvas.width - this.w;
        }
    },
    moveLeft() {
        this.x -= this.step;
        if ((this.x - this.step) < (0)) {
            this.x = 0;
        }
    },

}

//===========//
//  Keyboard 
//===========//
let keyup = true;

document.addEventListener('keyup', () => {
    keyup = true;
})

document.addEventListener('keydown', (e) => {
    if (keyup) {
        switch (e.key) {
            case 'ArrowRight':
                player.moveRight()
                keyup = false;
                break;
            case 'ArrowLeft':
                player.moveLeft()
                keyup = false;
                break;
        }
    }
})


//===========//
//  Citizens 
//===========//

class Citizen {
    constructor(x, y) {
        this.x = x,
            this.y = y
    }
    w = 80;
    h = 70;
    color = 'green';

    fallSpeed = 8;
    bouncing = false;
    img = imgNum?  kid1Img : kid2Img;

    draw() {
        // ctx.fillStyle = this.color;
        // ctx.fillRect(this.x, this.y, this.w, this.h);
        ctx.drawImage(this.img, this.x, this.y, this.w, this.h)
    };
    movement() {

        if (this.bouncing) {
            this.y -= this.fallSpeed / 2;
            this.x += 1

        } else {
            this.y += this.fallSpeed;
            this.x += 1
        }
    };
    coliderWithPlayer() {
        if (
            this.y + this.h > player.y + (player.h / 1.5) &&
            this.y < player.y + player.h &&
            this.x < player.x + player.w  -60 &&
            this.x + this.w > player.x +60
        ) {
            this.bouncing = true;
        }
        if (this.y < 100) {
            this.bouncing = false;
        }
    }
}

let imgNum = true;
let counter = 240
const helpMe = []
function addCitizen() {
    if (counter == 0) {
        const npc = new Citizen(80, 140);
        helpMe.push(npc)
        imgNum  = !imgNum;
        counter = 240
    }
    counter -= 1
}
new Citizen(8, 9)