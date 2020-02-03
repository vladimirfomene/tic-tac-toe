function startGame () {
  const players = setupPlayers();
  const grid = buildBoard();
  setupGame(grid, players);
  while (!isGameOver(grid)) {
    const currentPlayer = choosePlayer();
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
      hasWon: false
    },
    {
      type: "AI",
      character: "",
      hasWon: false
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

exports.buildBoard = buildBoard;
exports.setupPlayers = setupPlayers;
exports.startGame = startGame;
exports.play = play;
