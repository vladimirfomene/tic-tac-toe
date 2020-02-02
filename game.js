function startGame() {
  const players = setupPlayers();
  const grid = buildBoard();
  setupGame(grid, players);
  while (!isGameOver(grid)) {
    let currentPlayer = choosePlayer();
    play(currentPlayer, grid);
    printBoard(grid);
  }
  declareWinner();
}

function play(player, grid) {
  let position = choosePosition();
  updateBoard(grid, position, player);
}

function setupPlayers() {
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

exports.setupPlayers = setupPlayers;
exports.startGame = startGame;
exports.play = play;
