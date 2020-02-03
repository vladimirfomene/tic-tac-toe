const readline = require("readline-sync");

function startGame () {
  let shouldContinue = true;
  while (shouldContinue) {
    const players = setupPlayers();
    const grid = buildBoard();
    setupGame(players, readline.question);
    while (!isGameOver(grid, players)) {
      printBoard(grid, console.log);
      const currentPlayer = choosePlayerToPlay(players);
      if (currentPlayer.type === "AI") console.log("It is now the computer's turn...");
      play(currentPlayer, grid);
    }
    printBoard(grid, console.log);
    declareWinner(players, console.log);

    const answer = readline
      .question("Do you want to continue playing(y/n)? ")
      .trim();
    if (answer === "n") {
      shouldContinue = false;
    }
  }
}

function play (player, grid) {
  const position = choosePosition(player, grid, readline.question);
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

function setupGame (players, read) {
  console.log("Welcome! This is a Tic Tac Toe game.");
  console.log(
    "To start playing you need to choose a character you will use from either \"o\" or \"x\""
  );

  let char = "";
  while (["o", "x"].indexOf(char) === -1) {
    char = read("Enter your chosen character? ");
  }

  if (char === "o") {
    players[0].character = char;
    players[1].character = "x";
  } else {
    players[0].character = char;
    players[1].character = "o";
  }
}

function isGameOver (grid, players) {
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

function isGridFull (grid) {
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
      if (typeof grid[i][j] === "number") return false;
    }
  }
  return true;
}

function printBoard (grid, printFn) {
  for (let i = 0; i < grid.length; i++) {
    let row = "";
    for (let j = 0; j < grid[0].length; j++) {
      row += "|" + grid[i][j] + "|";
    }
    printFn(row);
  }
}

function choosePlayerToPlay (players) {
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

function choosePosition (player, grid, read) {
  let position = -1;
  if (player.type === "human") {
    while (position < 1 || position > 9 || isNaN(position)) {
      position = parseInt(read("Choose a position on the board? "));
      if (!isPositionEmpty(position, grid)) position = -1;
    }
  }

  if (player.type === "AI") {
    while (!isPositionEmpty(position, grid)) {
      position = Math.round(Math.random() * 8) + 1;
    }
  }

  return position;
}

function isPositionEmpty (position, grid) {
  if (position < 1 || position > 9) return false;

  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
      if (grid[i][j] === position) return true;
    }
  }
  return false;
}

function updateBoard (grid, position, player) {
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
      if (grid[i][j] === position) grid[i][j] = player.character;
    }
  }
}

function declareWinner (players, printFn) {
  if (players[0].hasWon && players[1].hasWon) {
    printFn("Oh, it is a draw");
  }

  if (players[0].hasWon) {
    printFn("Congratulations, You win!");
  }

  if (players[1].hasWon) {
    printFn("Oh la la, the computer wins");
  }
}

exports.isPositionEmpty = isPositionEmpty;
exports.updateBoard = updateBoard;
exports.choosePosition = choosePosition;
exports.choosePlayerToPlay = choosePlayerToPlay;
exports.printBoard = printBoard;
exports.isGameOver = isGameOver;
exports.setupGame = setupGame;
exports.buildBoard = buildBoard;
exports.setupPlayers = setupPlayers;
exports.startGame = startGame;
exports.play = play;
