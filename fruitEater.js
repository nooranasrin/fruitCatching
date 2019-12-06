const { stdin, stdout } = process;
stdin.setEncoding("utf8");
let fruits = require("./fruits.json");
const fruitsQue = [];
const gameInfo = {
  time: new Date().valueOf(),
  correctAns: 0,
  totalChar: 0,
  wrongAns: 0
};

const collectFruitInfo = function() {
  let fruit = {};
  let columns = stdout.columns - 5;
  fruit.item = fruits[Math.floor(Math.random() * fruits.length)];
  fruit.x = Math.floor(Math.random() * columns);
  fruit.y = 2;
  return fruit;
};

const storeNextFruitToPrint = function() {
  fruitsQue.push(collectFruitInfo());
};

const displayFruits = function() {
  stdout.cursorTo(0, 1);
  stdout.clearScreenDown();
  fruitsQue.forEach(alphabet => {
    stdout.cursorTo(alphabet.x, alphabet.y);
    console.log(alphabet.item);
    alphabet.y += 1;
  });
};

const fallChars = function() {
  displayFruits();
  stdout.cursorTo(0, 90);
};

const main = function() {
  setInterval(fallChars, 5000);
  setInterval(storeNextFruitToPrint, 5000);
};

main();
