'use strict';
import { Game } from './models/game.js';
import { Ball } from './models/ball.js';
import { Paddle } from './models/paddle.js';
import { Stage } from './models/stage.js';

{
  const canvas = document.querySelector('canvas');
  createModal();

  const stages = [
    new Stage()
      .setLabel('Level1: パドル狭＆上昇')
      .setBalls([new Ball(canvas), new Ball(canvas)])
      .setPaddle(new Paddle(canvas, { w: 200, isReversed: true }))
      .setScore(2),
    new Stage()
      .setLabel("Level2: Level1＋スピードアップ")
      .setBalls([new Ball(canvas)])
      .setPaddle(new Paddle(canvas, { w: 120 }))
      .setScore(4),
  ];

  let game = new Game(canvas, stages.map(s => s.clone()));
  game.setLevelList();

  canvas.addEventListener('click', () => {
    if (game.isEnded()) {
      game = new Game(canvas, stages.map(s => s.clone()));
      game.start();
    }
  });

  function createModal() {
    const modal = document.getElementById('modal');
    setTimeout(() => {
      modal.classList.remove('hidden');
    }, 50)

    const button = document.getElementById('button');

    button.addEventListener('click', () => {
      modal.classList.add('hidden');
    });

    document.addEventListener('click', () => {
      button.click();
    });
  }
}
