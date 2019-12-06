const { stdin, stdout } = process;
stdin.setEncoding("utf8");
const rows = stdout.rows;
const columns = stdout.columns;
let fruits = require("./fruits.json");
const fruitsQue = [];
const eaterPosition = { x: 10, y: 10 };

const displayRabbit = function(x, y) {
  stdout.cursorTo(x, y);
  console.log("🦧\n");
};

const displayEnd = function() {
  stdout.cursorTo(0, rows);
  console.log("🌾".repeat(Math.ceil(columns / 2)));
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
  fruitsQue.forEach(fruit => {
    stdout.cursorTo(fruit.x, fruit.y);
    console.log(fruit.item);
    fruit.y += 1;
  });
};

const exitGame = function() {
  console.clear();
  process.exit(0);
};

const isGameOver = function() {
  fruitsQue.forEach(fruit => {
    if (fruit.y == rows) {
      exitGame();
    }
  });
};

const fallChars = function() {
  displayFruits();
  displayRabbit();
  displayEnd();
  isGameOver();
};

const main = function() {
  setInterval(fallChars, 1000);
  setInterval(storeNextFruitToPrint, 3000);
  stdin.on("data", () => {});
};

main();
