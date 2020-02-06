const { GameLogic } = require("./game_logic");
const { UI } = require("./ui");
const readline = require("readline-sync");

function startGame () {
  let shouldContinue = true;
  while (shouldContinue) {
    const logic = new GameLogic();
    const ui = new UI();
    ui.setupGame(logic.players, readline.question);
    while (!logic.isGameOver(ui.board, logic.players, readline.question)) {
      ui.board.printBoard(console.log);
      const currentPlayer = logic.choosePlayerToPlay(logic.players);
      if (currentPlayer.type === "AI") console.log("It is now the computer's turn...");
      const position = logic.play(currentPlayer, ui.board, readline.question);
      ui.board.updateBoard(position, currentPlayer);
    }
    ui.board.printBoard(console.log);
    logic.declareWinner(logic.players, console.log);

    const answer = readline
      .question("Do you want to continue playing(y/n)? ")
      .trim();
    if (answer === "n") {
      shouldContinue = false;
    }
  }
}

exports.startGame = startGame;
