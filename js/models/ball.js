export class Ball {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = this.canvas.getContext('2d');
        this.r = 10;
        this.x = this.rand(30, 250);
        this.y = 10;
        this.vx = 4 * (Math.random() < 0.5 ? 1 : -1);
        this.vy = 3;
        this.isMissed = false;
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < this.r || this.x > this.canvas.width - this.r) {
            this.vx *= -1;
        }
        if (this.y < this.r) {
            this.vy *= -1;
        }

        if (this.y - this.r > this.canvas.height) {
            this.isMissed = true;
        }
    }

    draw() {
        this.ctx.beginPath();
        this.ctx.fillStyle = 'orange';
        this.ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
        this.ctx.fill();
    }

    bounce() {
        this.vy *= -1;
    }

    speedUp() {
        this.vx *= 1.25;
        this.vy *= 1.25;
    }

    speedDown() {
        this.vx *= 0.8;
        this.vx *= 0.8;
    }

    pushUp(paddleTop) {
        this.y = paddleTop - this.r;
    }

    rand(min, max) {
        return Math.random() * (max - min) + min;
    }

    getX() {
        return this.x;
    }

    getY() {
        return this.y;
    }

    getR() {
        return this.r;
    }

    getIsMissed() {
        return this.isMissed;
    }
}