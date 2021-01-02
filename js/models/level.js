import { config } from '../const.js';

export class Level {
    constructor(game, ball, paddle) {
        this.game = game;
        this.ball = ball;
        this.paddle = paddle;
    }

    change(level) {
    }

    level1() {
        removeActive();
        lists[0].classList.add('active');
        this.paddle.narrow();
        this.paddle.goUp();
    }

    level2() {
        removeActive();
        lists[1].classList.add('active');
        this.ball.speedUp();
    }

    level3() {
        removeActive();
        lists[2].classList.add('active');
        this.game.switchMask();
    }

    level4() {
        removeActive();
        lists[3].classList.add('active');
        this.paddle.spread();
        this.paddle.goDown();
        this.ball.speedDown();
        this.game.switchMask();
        this.paddle.switchReverse();
    }

    level5() {
        removeActive();
        lists[4].classList.add('active');
        this.game.switchMask();
    }

    level6() {
        removeActive();
        lists[5].classList.add('active');
        this.game.switchMask();
        this.paddle.switchReverse();
        this.game.switchDoubled();
    }

    level7() {
        removeActive();
        lists[6].classList.add('active');
        this.game.switchMask();
    }

    level8() {
        removeActive();
        lists[7].classList.add('active');
        this.paddle.switchReverse();
    }

    level9() {
        removeActive();
        lists[8].classList.add('active');
        this.ball.speedUp();
    }

    checkLevelUp() {
        switch (this.game.getScore()) {
            case config.levelUpCount * 1:
                this.level1()
                break;
            case config.levelUpCount * 2:
                this.level2()
                break;
            case config.levelUpCount * 3:
                this.level3()
                break;
            case config.levelUpCount * 4:
                this.level4()
                break;
            case config.levelUpCount * 5:
                this.level5()
                break;
            case config.levelUpCount * 6:
                this.level6()
                break;
            case config.levelUpCount * 8:
                this.level7()
                break;
            case config.levelUpCount * 10:
                this.level8()
                break;
            case config.levelUpCount * 12:
                this.level9();
                break;
            case this.levelUpCount * 14:
                this.game.switchGameCleared();
                break;
        }
    }
}