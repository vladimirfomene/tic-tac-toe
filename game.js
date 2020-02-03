const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

function startGame () {
  const players = setupPlayers();
  const grid = buildBoard();
  setupGame(players);
  while (!isGameOver(grid)) {
    const currentPlayer = choosePlayer(players);
    play(currentPlayer, grid);
    printBoard(grid);
  }
  declareWinner();
}

function play (player, grid) {
  const position = choosePosition();
  updateBoard(grid, position, player);
}

function setupPlayers () {
  return [
    {
      type: "human",
      character: "",
      hasWon: false,
      turn: false
    },
    {
      type: "AI",
      character: "",
      hasWon: false,
      turn: false
    }
  ];
}

function buildBoard () {
  const grid = new Array(3);
  for (let k = 0; k < grid.length; k++) {
    grid[k] = new Array(3);
  }

  let count = 1;
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
      grid[i][j] = count++;
    }
  }
  return grid;
}

function setupGame (players) {
  console.log("Welcome! This is a Tic Tac Toe game.");
  console.log("To start playing you need to choose a character you will use from either \"o\" or \"x\"");

  let char = "";
  rl.question("Enter your chosen character? ", function (ans) {
    char = ans.trim();
    rl.close();

    if (char === "o") {
      players[0].character = char;
      players[1].character = "x";
    } else {
      players[0].character = char;
      players[1].character = "o";
    }
  });
}

exports.setupGame = setupGame;
exports.buildBoard = buildBoard;
exports.setupPlayers = setupPlayers;
exports.startGame = startGame;
exports.play = play;
