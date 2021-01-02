import { Paddle } from './paddle.js';
import { Ball } from './ball.js';
import { Level } from './level.js';

export class Game {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = this.canvas.getContext('2d');
        this.ball = new Ball(canvas);
        this.ball2 = new Ball(canvas);
        this.paddle = new Paddle(canvas, this);
        this.level = new Level(this, this.ball, this.paddle);
        this.isGameover = true;
        this.isGameCleared = true;
        this.score = 0;
        this.isMasked = false;
        this.isDoubled = false;
        this.drawOpening();
    }

    start() {
        this.isGameover = false;
        this.isGameCleared = false;
        this.loop();
    }

    loop() {
        if (this.isGameover) {
            return;
        }

        if (this.isGameCleared) {
            return;
        }

        this.update();
        this.draw();
        requestAnimationFrame(() => {
            this.loop();
        });
    }

    update() {
        this.ball.update();
        this.paddle.update(this.ball);

        if (this.ball.getIsMissed()) {
            this.isGameover = true;
        }

        if (this.isDoubled) {
            this.ball2.update();
            this.paddle.update(this.ball2);

            if (this.ball2.getIsMissed()) {
                this.isGameover = true;
            }
        }
    }

    draw() {
        if (this.isGameover) {
            this.drawScore();
            this.drawGameOver();
            return;
        }

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.drawScore();
        this.ball.draw();

        if (this.isDoubled) {
            this.ball2.draw();
        }

        this.paddle.draw();

        if (this.isMasked === true) {
            this.drawMask();
        }

        if (this.paddle.getIsReversed()) {
            this.drawReverse();
        }

        if (this.isGameCleared) {
            this.drawScore();
            this.drawGameClear();
            return;
        }
    }

    addScore() {
        this.score++;
        this.level.checkLevelUp();
    }

    getScore() {
        return this.score;
    }

    drawScore() {
        this.ctx.fillStyle = "white";
        this.ctx.font = 'bold 20px sans-serif'
        this.ctx.fillText(this.score, 15, 25);
    }

    drawGameOver() {
        this.ctx.fillStyle = "red";
        this.ctx.font = "bold 30px sans-serif";
        this.ctx.textAlign = "center";
        this.ctx.fillText('GAME OVER', this.canvas.width / 2, this.canvas.height / 2 - 20);
        this.ctx.font = "bold 25px sans-serif";
        this.ctx.fillText('CLICK TO RESTART', this.canvas.width / 2, this.canvas.height / 2 + 20);
    }

    drawOpening() {
        this.ctx.fillStyle = "red";
        this.ctx.font = "bold 25px sans-serif";
        this.ctx.textAlign = "center";
        this.ctx.fillText('PING PONG GAME', this.canvas.width / 2, this.canvas.height / 2);
        this.ctx.fillText('CLICK TO START', this.canvas.width / 2, this.canvas.height / 2 + 40);
    }

    drawGameClear() {
        this.ctx.fillStyle = "red";
        this.ctx.textAlign = "center";
        this.ctx.font = "bold 24px sans-serif";
        this.ctx.fillText('CONGRATULATIONS', this.canvas.width / 2, this.canvas.height / 2 - 20);
        this.ctx.font = "bold 30px sans-serif";
        this.ctx.fillText('GAME CLEAR!', this.canvas.width / 2, this.canvas.height / 2 + 20);
    }

    drawMask() {
        this.ctx.fillStyle = '#eee'
        this.ctx.fillRect(0, 50, this.canvas.width, 130);
    }

    drawReverse() {
        this.ctx.fillStyle = "red";
        this.ctx.font = "bold 25px sans-serif";
        this.ctx.textAlign = "center";
        this.ctx.fillText('反転', this.canvas.width / 2, 30);
    }

    switchMask() {
        this.isMasked = !this.isMasked;
    }

    switchDoubled() {
        this.isDoubled = !this.isDoubled;
    }

    switchGameCleared() {
        this.isGameCleared = !this.isGameCleared;
    }

    isEnded() {
        return this.isGameover === true || this.isGameover === true;
    }
}
