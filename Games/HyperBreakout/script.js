window.onload = () => {
    /** @type {HTMLCanvasElement} */
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");
    const startScreen = document.getElementById("startScreen");
    const scoreDisplay = document.getElementById("score");
    const highScoreDisplay = document.getElementById("highScore");

    startScreen.addEventListener("click", startGame)

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
        speed: 10,
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

    function Brick(x, y) {
        this.xPos = x + 2;
        this.yPos = y;
        this.width = 47;
        this.height = 27;
    }

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
            arr.push(new Brick(i * brickXGap, y))
        }
        return arr;
    }

    let brickFallTimer = 0;
    const brickFallSpeed = 0.1;

    // input
    const mousePos = {
        x: canvas.width / 2,
        y: 0
    }

    document.onmousemove = (e) => {
        mousePos.x = e.clientX - canvas.getBoundingClientRect().left;
    }

    //Game functions
    function drawBall() {
        ctx.beginPath();
        ctx.arc(ball.xPos, ball.yPos, ball.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.closePath();
    }

    function drawBrick(x, y, w, h) {
        ctx.beginPath();
        ctx.rect(x, y, w, h);
        ctx.strokeStyle = "blue";
        ctx.stroke();
        ctx.fill();
        ctx.closePath();
    }

    function drawPaddle() {
        ctx.beginPath();
        ctx.rect(paddle.xPos, paddle.yPos, paddle.width, paddle.height);
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
                    }
                }
            }
        }

        function checkWallCol() {
            if (ball.xPos - ball.radius < 0 || ball.xPos + ball.radius > canvas.width) {
                ball.bounce("x");
                if (ball.xPos - ball.radius < 0) {
                    ball.xPos = ball.radius;
                } else {
                    ball.xPos = canvas.width - ball.radius;
                }
            }
            if (ball.yPos - ball.radius < 0) {
                ball.bounce("y");
                ball.yPos = ball.radius;
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
        ball.xPos += ball.xSpeed;
        ball.yPos += ball.ySpeed;

        checkCollisions();
        drawBall();
    }

    function updateBricks() {
        brickFallTimer += brickFallSpeed;
        if (brickFallTimer >= 1) {
            bricks.forEach(r => {
                r.forEach(b => b.yPos++);
            })
            brickFallTimer--;
        }

        bricks.forEach(r => {
            r.forEach(b => {
                drawBrick(b.xPos, b.yPos, b.width, b.height);
            })
        });
    }

    function mainLoop() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        updatePaddle();

        if (gameIsRunning) {
            updateBall();
            updateBricks();
        }
        requestAnimationFrame(mainLoop);
    }

    function startGame() {
        startScreen.style.display = "none";
        generateBoard();
        ball.reset();
        score.reset();
        gameIsRunning = true;
    }

    function endGame() {
        startScreen.style.display = "flex";
        gameIsRunning = false;
    }

    mainLoop();
}