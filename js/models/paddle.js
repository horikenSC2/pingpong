export class Paddle {
    constructor(canvas, settings) {
        this.canvas = canvas;
        const defaultSettings = {
            w: 60,
            h: 10,
            x: this.canvas.width / 2 - 60 / 2,
            y: this.canvas.height - 30,
            isReversed: false,
        };
        this.settings = settings = { ...defaultSettings, ...settings };
        this.w = settings.w;
        this.h = settings.h;
        this.x = settings.x;
        this.y = settings.y;
        this.isReversed = settings.isReversed;

        this.mouseX = this.x;
        this.startMouseTracking();
    }

    clone() {
        return new Paddle(this.canvas, this.settings);
    }

    startMouseTracking() {
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
            w: this.w,
            h: this.h,
            x: this.x,
            y: this.y,
            isReversed: this.isReversed,
        };
    }

    getIsReversed() {
        return this.isReversed;
    }
}