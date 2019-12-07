const { stdin, stdout } = process;
stdin.setEncoding("utf8");
const rows = stdout.rows;
const columns = stdout.columns;
stdin.setRawMode(true);
let fruits = require("./fruits.json");
const fruitsQue = [];
const catcherInfo = { catcher: "🗑 🗑 🗑 🗑", left: 20, right: 28, rows: 10 };

const displayCatcher = function(x, y) {
  stdout.cursorTo(x, y);
  process.stderr.write("\x1B[?25l");
  console.log(catcherInfo.catcher);
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

const displaySingleFruit = function(fruit) {
  stdout.cursorTo(fruit.x, fruit.y);
  console.log(fruit.item);
  fruit.y += 1;
};

const displayFruits = function() {
  stdout.cursorTo(0, 1);
  stdout.clearScreenDown();
  fruitsQue.forEach(displaySingleFruit);
};

const exitGame = function() {
  process.stderr.write("\x1B[?25h");
  console.clear();
  process.exit(0);
};

const isFruitReachedEnd = function(fruit) {
  if (fruit.y == rows) {
    exitGame();
  }
};

const isGameOver = function() {
  fruitsQue.forEach(isFruitReachedEnd);
};

const fallChars = function() {
  displayFruits();
  displayCatcher(catcherInfo.left, catcherInfo.rows);
  isGameOver();
};

const isSingleFruitDied = function(fruit) {
  const { left, right } = catcherInfo;
  if (fruit.y == catcherInfo.rows && fruit.x >= left && fruit.x <= right) {
    fruitsQue.splice(fruitsQue.indexOf(fruit), 1);
  }
};

const isEat = function() {
  fruitsQue.forEach(fruit);
};

const moveEater = function(userDir) {
  const keyStrokes = ["j", "l", "i", "k"];
  if (userDir == "q") {
    exitGame();
  }
  const userKeyStroke = keyStrokes.indexOf(userDir);
  if (userDir != -1) {
    if (userKeyStroke === 0 && catcherInfo.left > 1) {
      catcherInfo.left -= 3;
      catcherInfo.right -= 3;
    }
    if (userKeyStroke === 1 && catcherInfo.right < columns) {
      catcherInfo.left += 3;
      catcherInfo.right += 3;
    }
    if (userKeyStroke === 2 && catcherInfo.rows > 2) {
      catcherInfo.rows -= 3;
    }
    if (userKeyStroke === 3 && catcherInfo.rows < rows) {
      catcherInfo.rows += 3;
    }
    stdout.cursorTo(catcherInfo.rows, catcherInfo.left);
  }
  isEat();
};

const main = function() {
  setInterval(() => {
    isEat();
  }, 1);
  setInterval(fallChars, 500);
  setInterval(storeNextFruitToPrint, 5000);
  stdin.on("data", moveEater);
};

main();
