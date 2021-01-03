export class Paddle {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = this.canvas.getContext('2d');
        this.w = 60;
        this.h = 10;
        this.x = this.canvas.width / 2 - this.w / 2;
        this.y = this.canvas.height - 30;
        this.mouseX = this.x;
        this.getMouseX();
        this.isReversed = false;
    }

    getMouseX() {
        document.addEventListener('mousemove', e => {
            this.mouseX = e.clientX;
        });
    }

    next() {
        const rect = this.canvas.getBoundingClientRect();
        if (this.isReversed) {
            this.x = this.canvas.width - (this.mouseX - rect.left - this.w / 2);
        } else {
            this.x = this.mouseX - rect.left - this.w / 2;
        }
        if (this.x < 0) {
            this.x = 0;
        }
        if (this.x > this.canvas.width - this.w) {
            this.x = this.canvas.width - this.w;
        }
    }

    current() {
        return {
            x: this.x,
            y: this.y,
            w: this.w,
            h: this.h,
        };
    }

    draw() {
        this.ctx.fillStyle = "white";
        this.ctx.fillRect(this.x, this.y, this.w, this.h);
    }

    narrow() {
        this.w -= 20;
    }

    spread() {
        this.w = 60;
    }

    goUp() {
        setTimeout(() => {
            this.y -= 20;
        }, 200)
    }

    goDown() {
        setTimeout(() => {
            this.y = this.canvas.height - 30;
        }, 200)
    }

    switchReverse() {
        this.isReversed = !this.isReversed;
    }

    getY() {
        return this.y;
    }

    getIsReversed() {
        return this.isReversed;
    }
}