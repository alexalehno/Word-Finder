"use strict"


class Styles {
  constructor(bord, bgColor, color, weight) {
    this.border = bord;
    this.backgroundColor = bgColor;
    this.color = color;
    this.fontWeight = weight;
  }
}


class View {
  model = null;
  app = null;
  table = null;
  cells = null;
  styles = null;
  inputSize = null;
  inputWord = null;


  start(model, app) {
    this.model = model;
    this.app = app;
    this.inputSize = app.querySelector('.input-size');
    this.inputWord = app.querySelector('.input-word');
  }

  updateView() {
    this.updateTable();
    this.updateWord();
  }

  updateTable() {
    this.inputSize.value = this.model.size;

    this.createTable(this.model.size);
    this.cells = this.table.querySelectorAll('td');
    this.fillTable(this.model.string, this.cells);
  }

  updateWord() {
    this.inputWord.value = this.model.word;
  }

  setStyle() {
    let [a, b, c] = [
      this.model.randomRange(0, 225),
      this.model.randomRange(0, 225),
      this.model.randomRange(0, 225)
    ];

    this.styles = [
      '1px solid',
      `rgb(${a}, ${b}, ${c})`,
      `rgb(${225 - a}, ${225 - b}, ${225 - c})`,
      'bold'
    ];
  }

  highlightCells() {
    this.setStyle();

    this.highlight(
      this.model.position,
      this.model.size,
      this.cells,
      200,
      this.styles
    );
  }

  highlightReset() {
    this.highlight(
      this.model.position,
      this.model.size,
      this.cells,
      50,
      new Array(4).fill('')
    );
  }

  async highlight(arr, size, cells, time, styles) {
    const objStyle = new Styles(...styles);

    for (let i = 0; i < arr.length; i++) {
      let el = arr[i];

      for (let j = 0; j < el.length; j++) {
        let [row, col] = el[j].split(' ');
        let ind = size * row + +col;

        await this.delay(time);

        for (let key in objStyle) {
          cells[ind].style[key] = objStyle[key];
        }
      }
    }
  }

  createTable(size) {
    if (this.table) {
      this.table.remove();
    }

    let str = '';

    for (let i = 0; i < size; i++) {
      str += '<tr>';

      for (let j = 0; j < size; j++) {
        str += '<td></td>'
      }

      str += '</tr>';
    }

    this.table = document.createElement('table');
    this.table.innerHTML = str;
    this.app.append(this.table);
  }

  async fillTable(str, cells) {
    for (let i = 0; i < str.length; i++) {
      await this.delay(0);
      cells[i].textContent = str[i];
    }
  }

  delay(timeout) {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  }
}
