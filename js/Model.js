"use strict"


class Model {
  constructor() {
    this.size = 0;
    this.string = '';
    this.word = '';
    this.position = [];
  }

  view = null;

  start(view) {
    this.view = view;
  }

  updateView() {
    if (this.view) {
      this.view.updateView();
    }
  }

  setSize(size) {
    if (size < 0) {
      size = 0;
    }

    if (size > 25) {
      size = 25;
    }

    this.size = size;
    this.createString();
    this.view.updateTable();
  }

  setWord(word) {
    if (word) {
      this.word = word;
    }
  }

  find(word) {
    this.view.highlightReset();
    this.position = [];
    this.setWord(word);
    this.getResult();
    this.view.updateWord();
    this.view.highlightCells();
  }

  getResult() {
    let arrCoord = findCoord1(this.string, this.word, this.size);
    let fitEls = findFitEl(arrCoord);
    this.position = getPosition(fitEls);
    // .................................................
    function findCoord1(str, word, size) {
      let arrCoordEl = [];

      if (!str) {
        return arrCoordEl;
      }

      word.trim().toUpperCase().split('').forEach(el => {
        let arr = [];
        let pos = -1;

        while ((pos = str.indexOf(el, pos + 1)) !== -1) {
          let row = Math.trunc(pos / size);
          let col = pos - size * row;

          arr.push(`${row} ${col}`);
        }

        arrCoordEl.push(arr);
      })

      return arrCoordEl;
    }

    function findFitEl(arr) {
      let result = [];

      if (arr.length <= 1) {
        return [arr];
      }

      for (let a = 0; a < arr.length; a++) {
        let arrFit = [];
        let el1 = arr[a];
        let el2 = arr[a + 1];

        if (el2) {
          for (let i = 0; i < el1.length; i++) {
            let [row1, col1] = el1[i].split(' ');

            for (let j = 0; j < el2.length; j++) {
              let [row2, col2] = el2[j].split(' ');

              if (row1 === row2 && Math.abs(col1 - col2) === 1 ||
                col1 === col2 && Math.abs(row1 - row2) === 1) {
                arrFit.push([el1[i], el2[j]]);
              }
            }
          }

          result.push(arrFit);
        }
      }

      return result;
    }

    function getPosition(arr) {
      for (let a = 0; a < arr.length; a++) {
        let el1 = arr[a + 1];
        let el2 = arr[a];

        if (el1) {
          for (let i = 0; i < el1.length; i++) {
            let isFit = false;
            let cur1 = el1[i];
            let [start1, end1] = cur1;

            for (let j = 0; j < el2.length; j++) {
              let cur2 = el2[j];

              let start2 = cur2[cur2.length - 2];
              let end2 = cur2[cur2.length - 1];

              if (start1 === end2 && end1 !== start2) {
                let ind = cur2.indexOf(start1);
                cur1.splice(0, 0, ...cur2.slice(0, ind));
                isFit = true;
              }
            }

            if (!isFit) {
              el1.splice(i, 1);
              i -= 1;
            }
          }
        }
      }

      return arr[arr.length - 1];
    }
  }

  createString() {
    let str = '';

    for (let i = 0; i < this.size ** 2; i++) {
      str += String.fromCodePoint(this.randomRange(65, 90));
    }

    this.string = str;
  }

  randomRange(n, m) {
    return Math.floor(Math.random() * (m - n + 1)) + n;
  }
}



// ................................................................
// function createMatrix(str, size) {
//   let matrix = [];

//   for (let i = 0; i < size; i++) {
//     matrix.push(str.slice(i * size, i * size + size).split(''));
//   }

//   return matrix;
// }

// function findCoord(word, matrix) {
//   let arrCoordEl = [];

//   for (let i = 0; i < word.length; i++) {
//     let arr = [];

//     for (let x = 0; x < matrix.length; x++) {
//       for (let y = 0; y < matrix[x].length; y++) {
//         if (word[i] === matrix[x][y]) {
//           arr.push(`${x} ${y}`);
//         }
//       }
//     }

//     arrCoordEl.push(arr);
//   }

//   return arrCoordEl;
// }