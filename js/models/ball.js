export class Ball {
    constructor(canvas, settings) {
        this.canvas = canvas;
        const defaultSettings = {
            r: 10,
            x: this.rand(30, 250),
            y: 10,
            vx: 4 * (Math.random() < 0.5 ? 1 : -1),
            vy: 3,
        };
        
        this.settings = settings = {...defaultSettings, ...settings};
        this.r = settings.r;
        this.x = settings.x;
        this.y = settings.y;
        this.vx = settings.vx;
        this.vy = settings.vy;
    }

    next() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < this.r || this.x > this.canvas.width - this.r) {
            this.vx *= -1;
        }
        if (this.y < this.r) {
            this.vy *= -1;
        }
    }

    clone() {
        return new Ball(this.canvas, this.settings);
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

    pushUp(paddleTop) {
        this.y = paddleTop - this.r;
    }

    rand(min, max) {
        return Math.random() * (max - min) + min;
    }
}