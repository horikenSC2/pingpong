export class Stage {
    label;
    balls;
    paddle;
    score;
    isMasked = false;

    clone() {
        return new Stage()
            .setLabel(this.label)
            .setScore(this.score)
            .setBalls(this.balls.map(b => b.clone()))
            .setPaddle(this.paddle.clone())
            .setMask(this.isMasked)
            .setReverse(this.isReversed);
    }

    setLabel(label) {
        this.label = label;
        return this;
    }

    setScore(requiredScore) {
        this.score = requiredScore;
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

    setReverse(isReversed) {
        this.isReversed = isReversed;
        return this;
    }
}