const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

function startGame() {
  const players = setupPlayers();
  const grid = buildBoard();
  setupGame(players);
  while (!isGameOver(grid, players)) {
    printBoard(grid);
    const currentPlayer = choosePlayer(players);
    play(currentPlayer, grid);
  }
  declareWinner();
}

function play(player, grid) {
  const position = choosePosition();
  updateBoard(grid, position, player);
}

function setupPlayers() {
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

function buildBoard() {
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

function setupGame(players) {
  console.log("Welcome! This is a Tic Tac Toe game.");
  console.log(
    'To start playing you need to choose a character you will use from either "o" or "x"'
  );

  let char = "";
  rl.question("Enter your chosen character? ", function(ans) {
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

function isGameOver(grid, players) {
  for (let i = 0; i < grid.length; i++) {
    if (grid[i][0] === grid[i][1] && grid[i][1] === grid[i][2]) {
      for (const player of players) {
        if (player.character === grid[i][0]) player.hasWon = true;
      }
      return true;
    }
  }

  for (let j = 0; j < grid.length; j++) {
    if (grid[0][j] === grid[1][j] && grid[1][j] === grid[2][j]) {
      for (const player of players) {
        if (player.character === grid[0][j]) player.hasWon = true;
      }
      return true;
    }
  }

  if (grid[0][0] === grid[1][1] && grid[1][1] === grid[2][2]) {
    for (const player of players) {
      if (player.character === grid[0][0]) player.hasWon = true;
    }
    return true;
  }

  if (grid[2][0] === grid[1][1] && grid[1][1] === grid[0][2]) {
    for (const player of players) {
      if (player.character === grid[2][0]) player.hasWon = true;
    }
    return true;
  }

  if (isGridFull(grid)) {
    for (const player of players) {
      player.hasWon = true;
    }
    return true;
  }

  return false;
}

function isGridFull(grid) {
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
      if (typeof grid[i][j] === "number") return false;
    }
  }
  return true;
}

function printBoard(grid, printFn) {
  for (let i = 0; i < grid.length; i++) {
    let row = "";
    for (let j = 0; j < grid[0].length; j++) {
      row += "|" + grid[i][j] + "|";
    }
    printFn(row);
  }
}

function choosePlayer(players) {
  if (!players[0].turn && !players[1].turn) {
    const idx = Math.round(Math.random() * 1);
    players[idx].turn = true;
    return players[idx];
  }

  if (players[0].turn) {
    players[0].turn = false;
    players[1].turn = true;
    return players[1];
  }

  if (players[1].turn) {
    players[1].turn = false;
    players[0].turn = true;
    return players[0];
  }

  return null;
}

exports.choosePlayer = choosePlayer;
exports.printBoard = printBoard;
exports.isGameOver = isGameOver;
exports.setupGame = setupGame;
exports.buildBoard = buildBoard;
exports.setupPlayers = setupPlayers;
exports.startGame = startGame;
exports.play = play;
