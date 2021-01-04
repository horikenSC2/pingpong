import { Paddle } from './paddle.js';
import { Ball } from './ball.js';
import { Stage } from './stage.js';

export class Game {
    constructor(canvas, stages) {
        this.canvas = canvas;
        this.ctx = this.canvas.getContext('2d');
        this.isGameover = true;
        this.isGameCleared = true;
        this.score = 0;

        this.stages = stages;
        this.currentStageIndex = 0;
        this.stage = this.stages[this.currentStageIndex];

        this.balls = this.stage.balls;
        this.paddle = this.stage.paddle;
        this.isMasked = this.stage.isMasked;

        this.drawOpening();
    }

    start() {
        this.isGameover = false;
        this.isGameCleared = false;
        document.querySelectorAll('ul li')[this.currentStageIndex].classList.add('active');

        this.loop();
    }

    setLevelList() {
        const ul = document.querySelector('ul');

        this.stages.forEach(stage => {
            const li = document.createElement('li');
            li.textContent = stage.label;
            ul.appendChild(li);
        });
    }

    removeActive() {
        document.querySelectorAll('ul li').forEach(list => {
            list.classList.remove('active');
        });
    }

    loop() {
        if (this.isGameover) return;
        if (this.isGameCleared) return;

        this.next();
        this.draw();
        requestAnimationFrame(() => {
            this.loop();
        });
    }

    next() {
        this.balls.forEach(ball => {
            ball.next();
            const b = ball.current();
            if (b.isMissed) this.isGameover = true;

            const p = this.paddle.current();
            const paddleTop = p.y;
            const paddleLeft = p.x;
            const paddleRight = p.x + p.w;
            const paddleBottom = p.y + p.h;
            const ballTop = b.y - b.r;
            const ballBottom = b.y + b.r;
            const ballCenter = b.x;
            let isBounced = false;

            if (
                paddleTop < ballBottom &&
                paddleBottom > ballTop &&
                paddleLeft < ballCenter &&
                ballCenter < paddleRight
            ) {
                ball.pushUp(paddleTop);
                ball.bounce();
                isBounced = true;
            }

            this.paddle.next();
            if (isBounced) this.addScore();
        });
    }

    draw() {
        if (this.isGameover) {
            this.drawScore();
            this.drawGameOver();
            return;
        }

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.drawScore();
        this.drawBalls();
        this.drawPaddle();

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

    drawBalls() {
        this.balls.forEach(ball => {
            const b = ball.current();
            this.ctx.beginPath();
            this.ctx.fillStyle = 'orange';
            this.ctx.arc(b.x, b.y, b.r, 0, 2 * Math.PI);
            this.ctx.fill();
        });
    }

    drawPaddle() {
        const p = this.paddle.current();
        this.ctx.fillStyle = "white";
        this.ctx.fillRect(p.x, p.y, p.w, p.h);
    }

    addScore() {
        const required = this.stages
            .slice(0, this.currentStageIndex + 1)
            .reduce((sum, s) => sum + s.score, 0);

        if (++this.score >= required) {
            this.currentStageIndex++;
            this.removeActive();
            if (this.stages.length === this.currentStageIndex) {
                this.switchGameCleared();
                return;
            }

            document.querySelectorAll('ul li')[this.currentStageIndex].classList.add('active');
            this.stage = this.stages[this.currentStageIndex];
            this.balls = this.stage.balls;
            this.paddle = this.stage.paddle;
        }
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

    switchGameCleared() {
        this.isGameCleared = !this.isGameCleared;
    }

    isEnded() {
        return this.isGameover === true || this.isGameCleared === true;
    }
}
