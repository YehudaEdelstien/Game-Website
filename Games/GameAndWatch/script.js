/** @type {HTMLCanvasElement} */
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');


//===========//
// 🖼️Images🖼️ 
//===========//
let backgroundImg;
let backgroundImg2;
let backgroundImg3;
let playerImg;
let kid2Img;
let kid1Img;
let ambulanceImg;

window.onload = () => {
    backgroundImg = document.getElementById('backgroundImg');
    backgroundImg2 = document.getElementById('backgroundImg2');
    backgroundImg3 = document.getElementById('backgroundImg3');
    playerImg = document.getElementById('playerImg');
    kid1Img = document.getElementById('kid1Img');
    kid2Img = document.getElementById('kid2Img');
    ambulanceImg = document.getElementById('ambulance');
    score.getDB();
}


//============//
// 🎮Gameplay🎮
//============//
setInterval(gameplay, 1000 / 60);

function gameplay() {
    drawCanvas();
    addCitizen()
    helpMe.forEach(element => {
        element.movement()
        element.coliderWithPlayer()
        element.coliderWithAmbulance()
    });
}

//draw
function drawCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    background.draw();
    helpMe.forEach(civilizen => { civilizen.draw() });
    ambulance.draw();
    player.draw('red');
    score.print();

}

//===========//
// 🧑‍🚒Player🧑‍🚒
//===========//

const player = {
    x: 80,
    y: (canvas.height / 4) * 3 - 20,
    w: 200,
    h: 130,

    step: 170,
    currentPos: 1,
    maxSteps: 3,

    canMove: true,
    gap: 80,

    draw() {
        ctx.drawImage(playerImg, this.x, this.y, this.w, this.h)
    },
    moveRight() {
        if (this.currentPos < 3) {
            this.x += this.step;
            this.currentPos += 1;
        }
    },
    moveLeft() {
        if (this.currentPos > 1) {
            this.x -= this.step;
            this.currentPos -= 1;
        }
    },

}

//===========//
//⌨️Keyboard⌨️
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
// 🧒Kids🧒 
//===========//
class Kids {
    constructor(x, y) {
        this.x = x,
            this.y = y
    }
    w = 80;
    h = 70;

    fallSpeed = 5;
    moveSpeed = 1.2;
    bouncing = false;
    img = imgNum ? kid1Img : kid2Img;
    saved = false;

    draw() {
        if (!this.saved) {
            ctx.drawImage(this.img, this.x, this.y, this.w, this.h)
        }
    };
    movement() {

        if (this.bouncing) {
            this.y -= this.fallSpeed;
            // if (this.y < player.y + player.h - 80) {
            this.x += this.moveSpeed;
            // }

        } else {
            this.y += this.fallSpeed;
            // if (this.y < player.y + player.h - 80) {
            this.x += this.moveSpeed;
            // }
        }
    };
    coliderWithPlayer() {
        if (
            this.y + this.h > player.y + (player.h / 1.5) &&
            this.y < player.y + player.h - 60 &&
            this.x < player.x + player.w - 60 &&
            this.x + this.w > player.x + 60
        ) {
            this.bouncing = true;
        }

        if (this.y < 100) {
            this.bouncing = false;
        }
    };
    coliderWithAmbulance() {
        if (
            this.y + (this.h / 2) > ambulance.y &&
            this.y < ambulance.y + ambulance.h &&
            this.x < ambulance.x + ambulance.w &&
            this.x + this.w > ambulance.x
        ) {
            if (!this.saved) {
                score.up();
            }
            this.saved = true;
        }
    };
    fallCheck() {
        if (this.x) {

        }
    }
}

// make Kids
let imgNum = true;
let counter = 240
const helpMe = []
function addCitizen() {
    if (counter == 0) {
        const npc = new Kids(80, 140);
        helpMe.push(npc)
        imgNum = !imgNum;
        counter = 240
    }
    counter -= 1
}
new Kids(8, 9)

//==============//
// 🏙️Background🏙️ 
//==============//

// ambulance
const ambulance = {
    x: 640,
    y: 400,
    w: 150,
    h: 100,

    draw() {
        ctx.drawImage(ambulanceImg, this.x, this.y, this.w, this.h)
    }
}
//background
const background = {
    bgCounter: 1,
    draw() {
        ctx.drawImage(this.animation(), 0, 0, canvas.width, canvas.height)
    },
    animation() {
        this.bgCounter += 0.07;
        if (this.bgCounter >= 5) {
            this.bgCounter = 1;
        }
        let bb = Math.floor(this.bgCounter)
        switch (bb) {
            case 1:
                return backgroundImg;
            case 2:
                return backgroundImg2;
            case 3:
                return backgroundImg3;
            case 4:
                return backgroundImg2;
        }
    }
}


//==============//
//  🔟Score🔟
//==============//
const score = {
    score: 0,
    highScore: 0,

    up() {
        this.score += 1;
        this.print();
    },

    print() {
        ctx.font = '48px Courier';
        ctx.fillText('0' + String(this.score), canvas.width - 100, 80);
    },
    
    getDB() {
        let scoreDB = doesUserExist(getCurrentUser()).fire || 0;
        this.highScore = scoreDB.highScore || 0;
    },

    updateDB() {
        if (this.highScore < this.score) {
            this.highScore = this.score;
            const userObj = doesUserExist(getCurrentUser());
            userObj.fire = {
                highScore: this.highScore,
            };
            updateUserData(userObj);
        }
    }, 
};