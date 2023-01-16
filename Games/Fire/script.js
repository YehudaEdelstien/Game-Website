/** @type {HTMLCanvasElement} */
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const framePerSecond = 60;
let allKids = [];
let imgNum = true;



//===========//
// 🖼️Images🖼️ 
//===========//
const backgroundImg = new Image();
const backgroundImg2 = new Image();
const backgroundImg3 = new Image();
const playerImg = new Image();
const playerImgBonce = new Image();
const kid2Img = new Image();
const kid1Img = new Image();
const ambulanceImg = new Image();
const ambulanceImg2 = new Image();
const kidFall = new Image();

const loadImage = async (image, source) => new Promise((resolve, reject) => {
    image.src = source;
    image.onload = resolve;
    image.onerror = reject;
});

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

window.onload = async () => {
    try {
        await Promise.all([
            loadImage(backgroundImg, './Images/background.png'),
            loadImage(backgroundImg2, './Images/Background22.png'),
            loadImage(backgroundImg3, './Images/Background33.png'),
            loadImage(playerImg, './Images/Firemen.png'),
            loadImage(playerImgBonce, './Images/Firemen2.png'),
            loadImage(kid1Img, './Images/Kid1.png'),
            loadImage(kid2Img, './Images/Kid2.png'),
            loadImage(ambulanceImg, './Images/Ambulance.png'),
            loadImage(ambulanceImg2, './Images/Ambulance2.png'),
            loadImage(kidFall, './Images/x.png'),
        ]);
        score.getDB();
        setInterval(gamePlay, 1000 / framePerSecond);

    } catch (err) {
        console.error(err);
    }
    // backgroundImg = document.getElementById('backgroundImg');
    // backgroundImg2 = document.getElementById('backgroundImg2');
    // backgroundImg3 = document.getElementById('backgroundImg3');
    // playerImg = document.getElementById('playerImg');
    // kid1Img = document.getElementById('kid1Img');
    // kid2Img = document.getElementById('kid2Img');
    // ambulanceImg = document.getElementById('ambulance');
}


//============//
// 🎮GamePlay🎮
//============//

function gamePlay() {
    drawCanvas();
    if (gameOver()) { return; }
    level.addKid()
    allKids.forEach(kid => {
        kid.movement()
        kid.colliderWithPlayer()
        kid.colliderWithAmbulance()
        kid.fallCheck()
    });
}

//draw
function drawCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    background.draw();
    score.print();
    score.drawFall();
    level.draw();
    if (gameOver()) { return; }
    allKids.forEach(kid => { kid.draw() });
    ambulance.draw();
    player.draw();
    level.drawLevelUp();


}
///game-over
function gameOver() {
    if (score.fallCounter >= 3) {
        ctx.fillStyle = 'white'
        ctx.fillRect(0, canvas.height / 2 + 10, canvas.width, 30)

        ctx.font = '80px fantasy';
        ctx.fillStyle = 'red';
        ctx.strokeStyle = 'white';
        ctx.fillText('GAME OVER', canvas.width / 3.7, canvas.height / 1.7);
        ctx.strokeText('GAME OVER', canvas.width / 3.7 - 1, canvas.height / 1.7);
        ctx.strokeText('GAME OVER', canvas.width / 3.7 - 2, canvas.height / 1.7);

        ctx.font = 'bold 35px Courier';
        ctx.fillStyle = '#dbdbdb';
        ctx.strokeStyle = 'black'
        ctx.fillText('try again', canvas.width / 3 + 30, canvas.height / 1.5);
        ctx.strokeText('try again', canvas.width / 3 + 30, canvas.height / 1.5);
        ctx.fillText('press any button', canvas.width / 3 - 40, canvas.height / 1.38);
        ctx.strokeText('press any button', canvas.width / 3 - 40, canvas.height / 1.38);
        return true;
    }
    return false;
}
//play-again
function resetAll() {
    setTimeout(() => {
        allKids = [];
        imgNum = true;
        player.x = 80;
        player.currentPos = 1;
        level.level = 0;
        level.timer = 0;
        level.counterForDraw = 0;
        level.toNextLevel = 20;
        background.bgCounter = 1;
        score.score = 0;
        score.fallCounter = 0;
    }, 300)
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
    img: playerImg,

    // canMove: true,
    gap: 80,

    draw() {
        ctx.drawImage(this.img, this.x, this.y, this.w, this.h)
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
    animation() {
        this.img = playerImgBonce;
        setTimeout(() => {
            this.img = playerImg;
        }, 150)
    },

}

//===========//
//⌨️Keyboard⌨️
//===========//
const rightButton = document.getElementById('rbutton');
const leftButton = document.getElementById('lbutton');
let keyup = true;

document.addEventListener('keyup', () => {
    keyup = true;
})

document.addEventListener('keydown', (e) => {
    if (keyup) {
        switch (e.key) {
            case 'ArrowRight':
                animateButtons(rightButton);
                player.moveRight();
                keyup = false;
                break;

            case 'ArrowLeft':
                animateButtons(leftButton);
                player.moveLeft();
                keyup = false;
                break;

            default:
                if (gameOver()) resetAll();
                break;

        }
    }
})
function animateButtons(button) {
    button.style.backgroundColor = '#800303'
    setTimeout(() => {
        button.style.backgroundColor = '#d90808'
    }, 100);
}



//===========//
// 🧒Kids🧒 
//===========//
class Kid {
    constructor(gender) {
        this.gender = gender;
        this.img = this.gender ? kid1Img : kid2Img;
    }
    x = 80;
    y = 140
    w = 80;
    h = 70;
    fallSpeed = 5;
    moveSpeed = 1.2;
    bouncing = false;
    saved = false;
    isFell = false;

    draw() {
        ctx.drawImage(this.img, this.x, this.y, this.w, this.h)
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
    colliderWithPlayer() {
        if (
            this.y + this.h + 2 > player.y + (player.h / 1.5) &&
            this.y < player.y + player.h - 60 &&
            this.x < player.x + player.w - 60 &&
            this.x + this.w > player.x + 60 &&
            !this.bouncing
        ) {
            player.animation();
            score.scoreUp();
            this.bouncing = true;
        }
        if (this.y < 100) {
            this.bouncing = false;
        }
    };
    colliderWithAmbulance() {
        if (
            this.y + (this.h / 2) > ambulance.y &&
            this.y < ambulance.y + ambulance.h &&
            this.x < ambulance.x + ambulance.w &&
            this.x + this.w > ambulance.x
        ) {
            ambulance.animation();
            score.scoreUp();
            this.saved = true;
            allKids = allKids.filter(kid => !kid.saved);
        }
    };
    fallCheck() {
        if (this.y > player.y + (player.h / 2) + 10 && !this.isFell) {
            this.fallSpeed = 0;
            this.moveSpeed = 0
            this.isFell = true;
            setTimeout(() => {
                allKids = allKids.filter(kid => !kid.isFell);
            }, 1300);
            this.img = kidFall;
            score.fallCounter += 1;
        }
    }
}

// make Kids
//=================//
// 🆙levelManager🆙 
//================//
const level = {
    level: 0,
    timesLevels: [
        [6, 5, 4.5, 4.2, 4], //0
        [5, 3.8, 3.5, 3.2, 3], //1
        [5, 3, 2.5, 2.2, 2], //2
        [4, 3, 1.5, 1.2, 1], //3
    ],
    timer: 0,
    counterForDraw: 0,
    toNextLevel: 20,
    resetTimer() {
        this.timer = (this.timesLevels[this.level][this.picRandom(0, 4)]) * framePerSecond;
    },
    draw() {
        ctx.font = '18px Courier';
        ctx.fillStyle = 'black';
        ctx.fillText('level: ' + (this.level + 1), canvas.width / 2, 40);
        ctx.strokeStyle = 'black';
        ctx.strokeText('level: ' + (this.level + 1), canvas.width / 2, 40);
    },
    Up() {
        if (this.level < 3) {
            level.toNextLevel += 40;
            this.level += 1;
            this.counterForDraw = 3 * framePerSecond;
        }
    },
    drawLevelUp() {
        if (this.counterForDraw) {
            ctx.font = 'bold 60px Courier';
            ctx.fillStyle = 'red'
            ctx.fillText('level up!', canvas.width / 2 - 50, 150);
            // ctx.fillText(String(levelManager.timer), 100, 80);
            this.counterForDraw -= 1;
        }
    },
    makeNewKid() {
        const npc = new Kid(imgNum);
        allKids.push(npc)
    },
    picRandom(min = 0, max = 0) {
        return Number(Math.floor(Math.random() * (max - min + 1)) + min)
    },
    addKid() {
        if (this.timer == 0) {
            this.makeNewKid();
            imgNum = !imgNum;
            this.resetTimer()
        }
        this.timer -= 1
    },

}

function makeNewKid() {
    const npc = new Kid(imgNum);
    allKids.push(npc)
}



//==============//
// 🏙️Background🏙️ 
//==============//

// ambulance
const ambulance = {
    x: 640,
    y: 400,
    w: 150,
    h: 100,
    img: ambulanceImg,

    draw() {
        ctx.drawImage(this.img, this.x, this.y, this.w, this.h)
    },
    animation() {
        this.img = ambulanceImg2;
        setTimeout(() => {
            this.img = ambulanceImg;
        }, 250)
    },
}
//background
const background = {
    bgCounter: 1,
    draw() {
        ctx.drawImage(this.animation(), 0, 0, canvas.width, canvas.height)
    },
    animation() {
        if (gameOver()) { return backgroundImg; }
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
    fallCounter: 0,

    scoreUp() {
        this.score += 1;
        this.highScoreUp()
        if (this.score == level.toNextLevel) {
            level.Up()
        }
    },
    highScoreUp() {
        if (this.highScore < this.score) {
            this.highScore = this.score;
            this.updateDB();
        }
    },
    triNumbers(num) {
        if (num < 10) {
            return ('00' + String(num));
        }
        else if (num < 100) {
            return ('0' + String(num));
        }
        else {
            return String(num)
        }
    },
    print() {
        ctx.font = '15px Courier';
        ctx.strokeStyle = 'black';
        ctx.strokeText('score', canvas.width - 250, 40);
        ctx.strokeText('highScore', canvas.width - 140, 40);
        ctx.fillStyle = 'black'
        ctx.fillText('highScore', canvas.width - 140, 40);
        ctx.fillText('score', canvas.width - 250, 40);

        ctx.font = '48px Courier';
        ctx.fillStyle = 'black'
        ctx.fillText(this.triNumbers(this.score), canvas.width - 270, 80);
        ctx.fillText(this.triNumbers(this.highScore), canvas.width - 140, 80);
    },
    drawFall() {
        switch (this.fallCounter) {
            case 3:
                ctx.drawImage(kidFall, canvas.width / 2 + 70, 47, 35, 35)
            case 2:
                ctx.drawImage(kidFall, canvas.width / 2 + 35, 47, 35, 35)
            case 1:
                ctx.drawImage(kidFall, canvas.width / 2, 47, 35, 35)
                break;

            default:
                break;
        }
    },
    getDB() {
        let scoreDB = doesUserExist(getCurrentUser()).fire || 0;
        this.highScore = scoreDB.highScore || 0;
    },

    updateDB() {
        const userObj = doesUserExist(getCurrentUser());
        userObj.fire = {
            highScore: this.highScore,
        };
        updateUserData(userObj);
    },
};