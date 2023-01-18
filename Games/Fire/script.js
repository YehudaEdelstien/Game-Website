/** @type {HTMLCanvasElement} */
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const framePerSecond = 60;
let allKids = [];
let imgNum = true;



//===========//
// 🎵Music🎵 
//===========//
const backgroundMusic = new Audio('Audio/Background Music.mp3');
const playerNetSfx = new Audio('Audio/Rescue Net.mp3');
const playerMoveSfx = new Audio('Audio/Movement.mp3');
const kidBounceSfx = new Audio('Audio/Jump.mp3');
const kidFallSfx = new Audio('Audio/Fall2.mp3');
const gameOverSfx = new Audio('Audio/GAME OVER.mp3');
const ambulanceSfx = new Audio('Audio/Ambulance.mp3');
const levelUpSfx = new Audio('Audio/YEY.mp3')

backgroundMusic.volume = 0.6;
playerNetSfx.volume = 0.6;
playerMoveSfx.volume = 0.5;

function playSfx(sfx) {
    sfx.pause();
    sfx.currentTime = 0;
    sfx.play();
}
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
            loadImage(backgroundImg, 'Images/Background.png'),
            loadImage(backgroundImg2, 'Images/Background22.png'),
            loadImage(backgroundImg3, 'Images/Background33.png'),
            loadImage(playerImg, 'Images/Firemen.png'),
            loadImage(playerImgBonce, 'Images/Firemen2.png'),
            loadImage(kid1Img, 'Images/Kid1.png'),
            loadImage(kid2Img, 'Images/Kid2.png'),
            loadImage(ambulanceImg, 'Images/Ambulance.png'),
            loadImage(ambulanceImg2, 'Images/Ambulance2.png'),
            loadImage(kidFall, 'Images/X.png'),
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
    if (gameOver.isTrue) { return; }
    backgroundMusic.play()
    level.checkForAddKid()
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
    if (gameOver.isTrue) {
        gameOver.draw();
        return;
    }
    allKids.forEach(kid => { kid.draw() });
    ambulance.draw();
    player.draw();
    level.drawLevelUp();


}

///game-over
const gameOver = {
    isTrue: false,
    font: 80,
    lineHeight: -30,
    lineY: -15,

    draw() {
        if (score.fallCounter >= 3 && !this.isTrue) {
            setTimeout(() => {
                this.isTrue = true;
                playSfx(gameOverSfx);
                backgroundMusic.pause()
            }, 300);
        }
        if (this.isTrue) {
            if (this.lineHeight < 0) {
                this.lineHeight += 0.5
            }
            if (this.lineY < 0) {
                this.lineY += 0.25
            }
            ctx.fillStyle = 'white'
            ctx.fillRect(0, canvas.height / 2 + 10 - this.lineY, canvas.width, 30 + this.lineHeight)

            ctx.font = `${this.font}px fantasy`;
            ctx.fillStyle = 'red';
            ctx.strokeStyle = 'white';
            ctx.fillText('GAME OVER', canvas.width / 3.7, canvas.height / 1.7);
            ctx.strokeText('GAME OVER', canvas.width / 3.7 - 1, canvas.height / 1.7);
            ctx.strokeText('GAME OVER', canvas.width / 3.7 - 2, canvas.height / 1.7);

            ctx.font = 'bold 35px Courier';
            ctx.fillStyle = '#dbdbdb';
            ctx.strokeStyle = 'black'
            ctx.fillText('press here', canvas.width / 3 + 30, canvas.height / 1.5);
            ctx.strokeText('press here', canvas.width / 3 + 30, canvas.height / 1.5);
            ctx.fillText('to try again', canvas.width / 3 + 5, canvas.height / 1.38);
            ctx.strokeText('to try again', canvas.width / 3 + 5, canvas.height / 1.38);
        }
    }
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
        gameOver.lineHeight = -30;
        gameOver.lineY = -15;
        score.fallCounter = 0;
        gameOver.isTrue = false
    }, 1)
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

function right() {
    if (gameOver.isTrue) { return }
    playSfx(playerMoveSfx);
    animateButtons(rightButton);
    player.moveRight();
    keyup = false;
}

function left() {
    if (gameOver.isTrue) { return }
    playSfx(playerMoveSfx);
    animateButtons(leftButton);
    player.moveLeft();
    keyup = false;
}
function reset() {
    if (gameOver.isTrue) resetAll();
}
// rightButton.addEventListener("touchend", () => { keyup = true })
// rightButton.addEventListener("mousedown", right)
rightButton.addEventListener("touchstart", right)
leftButton.addEventListener("touchstart", left);
canvas.addEventListener('click', reset)


document.addEventListener('keyup', () => {
    keyup = true;
})

document.addEventListener('keydown', (e) => {
    if (keyup) {
        switch (e.key) {
            case 'ArrowRight':
                right();
                break;

            case 'ArrowLeft':
                left();
                break;

            default:
                reset();
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
        this.y = this.startYPosition;
    }
    startYPosition = 140;
    x = 80;
    w = 80;
    h = 70;
    fallSpeed = 5;
    moveSpeed = 1.2;
    bouncing = false;
    saved = false;
    isFell = false;

    draw() {
        ctx.globalAlpha = this.isFell ? 0.5 : 1;
        ctx.drawImage(this.img, this.x, this.y, this.w, this.h)
        ctx.globalAlpha = 1;
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
            playSfx(playerNetSfx);
            player.animation();
            score.scoreUp();
            playSfx(kidBounceSfx);
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
            playSfx(ambulanceSfx);
            this.saved = true;
            allKids = allKids.filter(kid => !kid.saved);
        }

    };
    fallCheck() {
        if (this.y > player.y + (player.h / 2) + 10 && !this.isFell) {
            this.fallSpeed = 0;
            this.moveSpeed = 0
            this.isFell = true;
            playSfx(kidFallSfx);
            setTimeout(() => {
                allKids = allKids.filter(kid => !kid.isFell);
            }, 500);
            this.img = kidFall;
            score.fallCounter += 1;
            gameOver.draw();
        }
        if (this.isFell) {
            this.y -= 0.1;
            this.X -= 0.1;
            this.w += 0.2;
            this.h += 0.2;
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
            playSfx(levelUpSfx);
        }
    },
    drawLevelUp() {
        if (this.counterForDraw) {
            ctx.font = 'bold 60px Courier';
            ctx.fillStyle = 'red'
            ctx.fillText('level up!', canvas.width / 2 - 50, 150);
            this.counterForDraw -= 1;
        }
    },
    makeNewKid() {
        const npc = new Kid(imgNum);
        allKids.push(npc);
    },
    picRandom(min = 0, max = 0) {
        return Number(Math.floor(Math.random() * (max - min + 1)) + min)
    },
    checkForAddKid() {
        console.log("🚀 timer", this.timer)
        if (this.timer == 0) {
            let ready = true;
            let high = (level < 2) ? 150 : 50;
            allKids.forEach(kid => {
                if (!kid.bouncing &&
                    kid.y < kid.startYPosition + high + 100 ||
                    kid.y < kid.startYPosition + high
                ) {
                    ready = false;
                    this.timer += 1;
                }
            })
            if (ready) {
                this.makeNewKid();
                imgNum = !imgNum;
                this.resetTimer()
            }
        }
        this.timer -= 1
    },
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
        if (gameOver.isTrue) { return backgroundImg; }
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
        userObj.Fire = {
            highScore: this.highScore,
        };
        updateUserData(userObj);
    },
};