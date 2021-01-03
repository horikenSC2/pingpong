export class Ball {
    constructor(canvas) {
        this.canvas = canvas;
        this.r = 10;
        this.x = this.rand(30, 250);
        this.y = 10;
        this.vx = 4 * (Math.random() < 0.5 ? 1 : -1);
        this.vy = 3;
    }

    next() {
        let isMissed = false;
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < this.r || this.x > this.canvas.width - this.r) {
            this.vx *= -1;
        }
        if (this.y < this.r) {
            this.vy *= -1;
        }
    }

    current() {
        return {
            x: this.x,
            y: this.y,
            r: this.r,
            isMissed: (this.y - this.r > this.canvas.height),
        };
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
}