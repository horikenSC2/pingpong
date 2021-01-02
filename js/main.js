'use strict';
import { config } from './const.js';
import { Game } from './models/game.js';

{
  const canvas = document.querySelector('canvas');

  let game = new Game(canvas);
  setLevelList();
  const lists = document.querySelectorAll('ul li');

  canvas.addEventListener('click', () => {
    if (game.isEnded()) {
      removeActive();
      game = new Game(canvas);
      game.start();
    }
  });

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

  function setLevelList() {
    const ul = document.querySelector('ul');
    const listTexts = config.levelList;

    listTexts.forEach(l => {
      const li = document.createElement('li');
      li.textContent = l.label;
      ul.appendChild(li);
    });
  }

  function removeActive() {
    lists.forEach(list => {
      list.classList.remove('active');
    })
  }
}
