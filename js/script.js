"use strict"


const app = document.querySelector('.app');
const model = new Model();
const view = new View();
const controller = new Controller();

model.start(view);
view.start(model, app);
controller.start(model, app);

model.updateView();``


// let pos = ["3 6", "4 6", "4 5", "4 4", "4 3", "3 3", "2 3", "2 2", "2 1", "1 1"];
// let pos1 = ["3 1", "4 1", "4 2", "4 3", "4 4", "3 4", "2 4", "2 5", "2 6", "1 6"];

// function insert(str, word, pos, size) {
//   let res = str.split('')

//   for (let i = 0; i < pos.length; i++) {
//     let [row, col] = pos[i].split(' ');
//     let ind = size * row + +col;

//     res[ind] = word[i];
//   }

//   return res.join('');
// }
