const { stdin, stdout } = process;
stdin.setEncoding("utf8");
const rows = stdout.rows;
const columns = stdout.columns;
stdin.setRawMode(true);
let fruits = require("./fruits.json");
const fruitsQue = [];
const eaterPosition = { eater: "🦧", x: 10, y: 10 };

const displayRabbit = function(x, y) {
  stdout.cursorTo(x, y);
  process.stderr.write("\x1B[?25l");
  console.log(eaterPosition.eater);
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
  process.stderr.write("\x1B[?25h");
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
  displayRabbit(eaterPosition.x, eaterPosition.y);
  displayEnd();
  isGameOver();
};

const moveEater = function(userDir) {
  const keyStrokes = ["j", "l", "i", "k"];
  if (userDir == "q") {
    exitGame();
  }
  const userKeyStroke = keyStrokes.indexOf(userDir);
  if (userDir != -1) {
    if (userDir == "j" && eaterPosition.x >= 1) {
      eaterPosition.x -= 2;
      stdout.cursorTo(eaterPosition.x, eaterPosition.y);
    }
    if (userDir == "l" && eaterPosition.x < rows) {
      eaterPosition.x += 2;
      stdout.cursorTo(eaterPosition.x, eaterPosition.y);
    }
    if (userDir == "i" && eaterPosition.y > 2) {
      eaterPosition.y -= 2;
      stdout.cursorTo(eaterPosition.x, eaterPosition.y);
    }
    if (userDir == "k" && eaterPosition.y < columns) {
      eaterPosition.y += 2;
      stdout.cursorTo(eaterPosition.x, eaterPosition.y);
    }
  }
};

const main = function() {
  setInterval(fallChars, 900);
  setInterval(storeNextFruitToPrint, 3000);
  stdin.on("data", moveEater);
};

main();
