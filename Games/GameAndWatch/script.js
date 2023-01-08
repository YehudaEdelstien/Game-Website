/** @type {HTMLCanvasElement} */
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

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

function drawCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    player.draw('red');
    helpMe.forEach(element => {
        element.draw()
    });

}

//=========//
//  Player
//=========//
const player = {
    x: (canvas.width / 2),
    y: (canvas.height / 4) * 3,
    w: 100,
    h: 20,

    step: 40,
    color: 'blue',
    canMove: true,

    draw(color = '') {
        ctx.fillStyle = color || this.color;
        ctx.fillRect(this.x, this.y, this.w, this.h);
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
    w = 30;
    h = 30;
    color = 'green';

    fallSpeed = 4;
    bouncing = false

    draw() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.w, this.h);
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
            this.y + this.h > player.y &&
            this.y < player.y + player.h &&
            this.x < player.x + player.w &&
            this.x + this.w > player.x
        ) {
            this.bouncing = true;
        }
        if (this.y < 10) {
            this.bouncing = false;
        }
    }
}
let counter = 240
const helpMe = []
function addCitizen() {
    if (counter == 0) {
        const npc = new Citizen(7,7);
        helpMe.push(npc)
        counter = 240
    }
    counter -=1
}
new Citizen(8, 9)