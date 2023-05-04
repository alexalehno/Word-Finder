"use strict"


class Controller {
  model = null;
  app = null;

  start(model, app) {
    this.model = model;
    this.app = app;

    const inputSize = app.querySelector('.input-size');
    const inputWord = app.querySelector('.input-word');
    const btnStart = app.querySelector('.start');

    inputSize.addEventListener('input', () => this.setSize(inputSize.value));
    btnStart.addEventListener('click', () => this.find(inputWord.value));
  }

  setSize(size) {
    this.model.setSize(size);
  }

  find(word) {
    this.model.find(word);
  }
}
