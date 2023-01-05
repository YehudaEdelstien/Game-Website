window.onload = () => {
    /** @type {HTMLCanvasElement} */
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");
    const startScreen = document.getElementById("startScreen");
    const scoreDisplay = document.getElementById("score");
    const highScoreDisplay = document.getElementById("highScore");

    startScreen.addEventListener("click", startGame)

    const colorsArr = [ //🟢
        "#63b598", "#ce7d78", "#ea9e70", "#a48a9e", "#c6e1e8", "#648177", "#0d5ac1",
        "#f205e6", "#1c0365", "#14a9ad", "#4ca2f9", "#a4e43f", "#d298e2", "#6119d0",
        "#d2737d", "#c0a43c", "#f2510e", "#651be6", "#79806e", "#61da5e", "#cd2f00",
        "#9348af", "#01ac53", "#c5a4fb", "#996635", "#b11573", "#4bb473", "#75d89e",
        "#2f3f94", "#2f7b99", "#da967d", "#34891f", "#b0d87b", "#ca4751", "#7e50a8",
        "#c4d647", "#e0eeb8", "#11dec1", "#289812", "#566ca0", "#ffdbe1", "#2f1179",
        "#935b6d", "#916988", "#513d98", "#aead3a", "#9e6d71", "#4b5bdc", "#0cd36d",
        "#250662", "#cb5bea", "#228916", "#ac3e1b", "#df514a", "#539397", "#880977",
        "#f697c1", "#ba96ce", "#679c9d", "#c6c42c", "#5d2c52", "#48b41b", "#e1cf3b",
        "#5be4f0", "#57c4d8", "#a4d17a", "#be608b", "#96b00c", "#088baf", "#f158bf",
        "#e145ba", "#ee91e3", "#05d371", "#5426e0", "#4834d0", "#802234", "#6749e8",
        "#0971f0", "#8fb413", "#b2b4f0", "#c3c89d", "#c9a941", "#41d158", "#fb21a3",
        "#51aed9", "#5bb32d", "#21538e", "#89d534", "#d36647", "#7fb411", "#0023b8",
        "#3b8c2a", "#986b53", "#f50422", "#983f7a", "#ea24a3", "#79352c", "#521250",
        "#c79ed2", "#d6dd92", "#e33e52", "#b2be57", "#fa06ec", "#1bb699", "#6b2e5f",
        "#64820f", "#21538e", "#89d534", "#d36647", "#7fb411", "#0023b8", "#3b8c2a",
        "#986b53", "#f50422", "#983f7a", "#ea24a3", "#79352c", "#521250", "#c79ed2",
        "#d6dd92", "#e33e52", "#b2be57", "#fa06ec", "#1bb699", "#6b2e5f", "#64820f",
        "#9cb64a", "#996c48", "#9ab9b7", "#06e052", "#e3a481", "#0eb621", "#fc458e",
        "#b2db15", "#aa226d", "#792ed8", "#73872a", "#520d3a", "#cefcb8", "#a5b3d9",
        "#7d1d85", "#c4fd57", "#f1ae16", "#8fe22a", "#ef6e3c", "#243eeb", "#dd93fd",
        "#3f8473", "#e7dbce", "#421f79", "#7a3d93", "#635f6d", "#93f2d7", "#9b5c2a",
        "#15b9ee", "#0f5997", "#409188", "#911e20", "#1350ce", "#10e5b1", "#fff4d7",
        "#cb2582", "#ce00be", "#32d5d6", "#608572", "#c79bc2", "#00f87c", "#77772a",
        "#6995ba", "#fc6b57", "#f07815", "#8fd883", "#060e27", "#96e591", "#21d52e",
        "#d00043", "#b47162", "#1ec227", "#4f0f6f", "#1d1d58", "#947002", "#bde052",
        "#e08c56", "#28fcfd", "#36486a", "#d02e29", "#1ae6db", "#3e464c", "#a84a8f",
        "#911e7e", "#3f16d9", "#0f525f", "#ac7c0a", "#b4c086", "#c9d730", "#30cc49",
        "#3d6751", "#fb4c03", "#640fc1", "#62c03e", "#d3493a", "#88aa0b", "#406df9",
        "#615af0", "#2a3434", "#4a543f", "#79bca0", "#a8b8d4", "#00efd4", "#7ad236",
        "#7260d8", "#1deaa7", "#06f43a", "#823c59", "#e3d94c", "#dc1c06", "#f53b2a",
        "#b46238", "#2dfff6", "#a82b89", "#1a8011", "#436a9f", "#1a806a", "#4cf09d",
        "#c188a2", "#67eb4b", "#b308d3", "#fc7e41", "#af3101", "#71b1f4", "#a2f8a5",
        "#e23dd0", "#d3486d", "#00f7f9", "#474893", "#3cec35", "#1c65cb", "#5d1d0c",
        "#2d7d2a", "#ff3420", "#5cdd87", "#a259a4", "#e4ac44", "#1bede6", "#8798a4",
        "#d7790f", "#b2c24f", "#de73c2", "#d70a9c", "#88e9b8", "#c2b0e2", "#86e98f",
        "#ae90e2", "#1a806b", "#436a9e", "#0ec0ff", "#f812b3", "#b17fc9", "#8d6c2f",
        "#d3277a", "#2ca1ae", "#9685eb", "#8a96c6", "#dba2e6", "#76fc1b", "#608fa4",
        "#20f6ba", "#07d7f6", "#dce77a", "#77ecca"
    ];
    let colorPos = 0; //🟢

    //Game Variables
    let gameIsRunning = false;

    const score = {
        currentScore: 0,
        highScore: 0,

        increase() {
            this.currentScore++;
            let str = "" + this.currentScore;
            str = str.padStart(3, '0');
            scoreDisplay.innerHTML = str;
            if (this.currentScore >= this.highScore) {
                this.highScore = this.currentScore;
                highScoreDisplay.innerHTML = str;
            }
        },

        reset() {
            this.currentScore = 0;
            scoreDisplay.innerHTML = "000";
        }
    }
    //game elements
    const paddle = {
        xPos: 0,
        yPos: canvas.height - 15,
        height: 8,
        width: 70
    }

    const ball = {
        radius: 10,
        speed: 8,
        xPos: 0,
        yPos: 0,
        angle: 0,
        xSpeed: 10,
        ySpeed: 10,

        bounce(dir) {
            if (dir === "x") {
                this.xSpeed *= -1;
            } else if (dir === "y") {
                this.ySpeed *= -1;
            }
        },

        reset() {
            this.angle = 0.5 / 2 * Math.PI;
            this.xSpeed = Math.cos(0.5 / 2 * Math.PI * -1) * this.speed;
            this.ySpeed = Math.sin(0.5 / 2 * Math.PI * -1) * this.speed;
            this.xPos = canvas.width / 2;
            this.yPos = canvas.height - 10
        }
    }

    //Bricks
    function Brick(x, y, c) { //🟢	
        this.xPos = x + 2;
        this.yPos = y;
        this.color = c;//🟢
    }
    Brick.prototype.width = 47;
    Brick.prototype.height = 27;

    const brickYGap = 30;
    const brickXGap = 50;
    const startRows = 4;

    let bricks = [];

    function generateBoard() {
        bricks = [];
        for (let i = startRows - (canvas.height / brickYGap); i < startRows; i++) {
            bricks.push(brickRow(i * brickYGap));
        }

    }

    function brickRow(y) {
        const arr = [];
        for (i = 0; i < canvas.width / brickXGap; i++) {
            changeColor();                                            //🟢
            arr.push(new Brick(i * brickXGap, y, colorsArr[colorPos]));//🟢
        }
        return arr;
    }

    let brickFallTimer = 0;
    const brickFallSpeed = 0.15;

    let currentBrickOffset = 0;

    function animBricksEnter(x = 1, animationFrames = 125) {
        currentBrickOffset = -100 * easeIn(x);
        if (x > 0 && gameIsRunning) {
            requestAnimationFrame(() => animBricksEnter(x - (1 / animationFrames)));
        }
    }

    function easeIn(x) {
        return x * x * x * x * x;
    }

    function animBricksExit(x = 0, animationFrames = 50) {
        currentBrickOffset = (canvas.height * -1) * easeOut(x);
        if (x < 1 && !gameIsRunning) {
            requestAnimationFrame(() => animBricksExit(x + (1 / animationFrames)));
        }
    }

    function easeOut(x) {
        return x === 1 ? 1 : 1 - Math.pow(2, -10 * x);
    }

    // input
    const mousePos = {
        x: canvas.width / 2,
        y: 0
    }

    document.onmousemove = (e) => {
        mousePos.x = e.clientX - canvas.getBoundingClientRect().left;
    }

    document.ontouchmove = (e) => {
        mousePos.x = e.touches[0].clientX - canvas.getBoundingClientRect().left;
    }

    //Sounds
    const soundManager = {
        bounce: new Audio("./sounds/Bounce.wav"),
        paddle: new Audio("./sounds/Paddle.wav"),
        wall: new Audio("./sounds/WallBounce.wav"),
        gameStart: new Audio("./sounds/GameStart.wav"),
        gameOver: new Audio("./sounds/GameOver.wav"),

        play(sound) {
            this[sound].currentTime = 0;
            this[sound].play();
        }
    }


    //Game functions
    function drawBall() {
        ctx.beginPath();
        ctx.arc(ball.xPos, ball.yPos, ball.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'green'
        ctx.fill();
        ctx.closePath();
    }

    function drawBrick(x, y, w, h, color) { //🟢
        ctx.beginPath();
        ctx.rect(x, y, w, h);
        ctx.strokeStyle = "darkgrey";
        ctx.stroke();
        ctx.fillStyle = color; //🟢
        ctx.fill();
        ctx.closePath();
    }

    function drawPaddle() {
        ctx.beginPath();
        ctx.rect(paddle.xPos, paddle.yPos, paddle.width, paddle.height);
        ctx.fillStyle = 'blue';
        ctx.fill();
        ctx.closePath();
    }

    function checkCollisions() {
        checkWallCol();
        checkBrickCol();
        checkPaddleCol();

        function checkPaddleCol() {
            if (ball.yPos + ball.radius >= paddle.yPos && ball.yPos - ball.radius <= paddle.yPos + paddle.height && ball.ySpeed > 0) {
                if (ball.xPos + ball.radius >= paddle.xPos && ball.xPos - ball.radius <= paddle.xPos + paddle.width) {
                    ball.angle = ((ball.xPos - ball.radius - paddle.xPos) / paddle.width) / 2 * Math.PI;
                    ball.xSpeed = Math.cos(ball.angle + 1) * -ball.speed;
                    ball.ySpeed = Math.sin(ball.angle + 1) * -ball.speed;
                    soundManager.play("paddle");
                }
            }
        }

        function checkBrickCol() {
            for (let row of bricks) {
                for (let i in row) {
                    if (ball.xPos + ball.radius > row[i].xPos &&
                        ball.xPos - ball.radius < row[i].xPos + row[i].width &&
                        ball.yPos + ball.radius > row[i].yPos &&
                        ball.yPos - ball.radius < row[i].yPos + row[i].height) {
                        row.splice(i, 1);
                        if (row.length === 0) {
                            bricks.splice(bricks.indexOf(row), 1);
                            bricks.unshift(brickRow(bricks[0][0].yPos - brickYGap));
                        }
                        ball.bounce("y");
                        score.increase();

                        soundManager.play("bounce");
                    }
                }
            }
        }

        function checkWallCol() {
            if (ball.xPos - ball.radius < 0 || ball.xPos + ball.radius > canvas.width) {
                ball.bounce("x");
                soundManager.play("wall");
                if (ball.xPos - ball.radius < 0) {
                    ball.xPos = ball.radius;
                } else {
                    ball.xPos = canvas.width - ball.radius;
                }
            }
            if (ball.yPos - ball.radius < 0) {
                ball.bounce("y");
                ball.yPos = ball.radius;
                soundManager.play("wall");
            }

            if (ball.yPos + ball.radius > canvas.height) {
                endGame();
            }
        }
    }

    function updatePaddle() {
        if (mousePos.x < 0 + (paddle.width / 2)) {
            paddle.xPos = 0;
        } else if (mousePos.x > canvas.width - (paddle.width / 2)) {
            paddle.xPos = canvas.width - paddle.width;
        } else {
            paddle.xPos = mousePos.x - (paddle.width / 2);
        }
        drawPaddle();
    }

    function updateBall() {
        if (!gameIsRunning) {
            return;
        }
        ball.xPos += ball.xSpeed;
        ball.yPos += ball.ySpeed;

        checkCollisions();
        drawBall();
    }

    function updateBricks() {
        if (gameIsRunning) {
            if (bricks[bricks.length - 1][0].yPos + Brick.prototype.height > canvas.height) {
                endGame();
            }
            brickFallTimer += brickFallSpeed;
            while (brickFallTimer > 1) {
                bricks.forEach(r => {
                    r.forEach(b => b.yPos++);
                })
                brickFallTimer--;
            }
        }

        bricks.forEach(r => {
            r.forEach(b => {
                drawBrick(b.xPos, b.yPos + currentBrickOffset, b.width, b.height, b.color); //🟢
            })
        });
    }

    function mainLoop() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        updatePaddle();
        updateBall();
        updateBricks();

        requestAnimationFrame(mainLoop);
    }

    function startGame() {
        gameIsRunning = true;
        startScreen.style.display = "none";
        generateBoard();
        ball.reset();
        score.reset();
        animBricksEnter();
        soundManager.play("gameStart");
    }

    function endGame() {
        gameIsRunning = false;
        startScreen.style.display = "flex";
        animBricksExit();
        soundManager.play("gameOver");
    }

    //🟢
    function changeColor() {
        if (colorPos + 1 == colorsArr.length) {
            colorPos = 0;
        } else {
            colorPos++
        }
    }
    //🟢

    mainLoop();
}