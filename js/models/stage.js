export class Stage {
    balls;
    paddle;
    isMasked = false;
    next;

    setNext(requiredScore) {
        this.next = requiredScore;
        return this;
    }

    setBalls(balls) {
        this.balls = balls;
        return this;
    }

    setPaddle(paddle) {
        this.paddle = paddle;
        return this;
    }

    setMask(isMasked) {
        this.isMasked = isMasked;
        return this;
    }

    update() {
        this.balls.forEach(ball => ball.update());
        this.paddle.update();
    }
}