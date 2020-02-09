const readline = require("readline-sync");
const { CommandLine } = require("../views/command_line");
const { Player } = require("../models/player");
const { Grid } = require("../models/grid");

class GameController {
  constructor () {
    this.scores = this.setupScores();
    this.players = this.setupPlayers("human", "ai");
  }

  play () {
    const commandLine = new CommandLine();
    commandLine.printGameInstructions(console.log);
    let shouldContinue = true;
    while (shouldContinue) {
      const humanChar = commandLine.getCharacterForHuman(readline.question);
      this.assignCharToPlayers(humanChar);
      const board = new Grid();
      let winner = this.getWinner(board);
      while (!winner) {
        commandLine.printBoard(console.log, board.grid);
        const currentPlayer = this.choosePlayerToPlay();
        if (currentPlayer.type === "ai") console.log("It is now the computer's turn");
        const position = (currentPlayer.type === "ai") ? this.choosePositionForAI(board, currentPlayer) : commandLine.choosePositionForHuman(currentPlayer, board, readline.question);
        const { i, j } = board.getPositionIndices(position);
        board.updateGrid(i, j, currentPlayer.character);
        winner = this.getWinner(board);
      }

      commandLine.printBoard(console.log, board.grid);
      commandLine.declareWinner(winner, this.players, console.log);

      const answer = readline
        .question("Do you want to continue playing(y/n)? ")
        .trim();
      if (answer === "n") {
        shouldContinue = false;
      }
    }
  }

  setupPlayers (firstPlayer, secondPlayer) {
    return [
      new Player(firstPlayer),
      new Player(secondPlayer)
    ];
  }

  assignCharToPlayers (humanChar) {
    if (humanChar === "o") {
      this.players[0].character = humanChar;
      this.players[1].character = "x";
    } else {
      this.players[0].character = humanChar;
      this.players[1].character = "o";
    }
  }

  setupScores () {
    return {
      human: -10,
      ai: 10,
      tie: 0
    };
  }

  choosePlayerToPlay () {
    if (!this.players[0].turn && !this.players[1].turn) {
      const idx = Math.round(Math.random() * 1);
      this.players[idx].turn = true;
      return this.players[idx];
    }

    if (this.players[0].turn) {
      this.players[0].turn = false;
      this.players[1].turn = true;
      return this.players[1];
    }

    if (this.players[1].turn) {
      this.players[1].turn = false;
      this.players[0].turn = true;
      return this.players[0];
    }

    return null;
  }

  getWinner (board) {
    let winner = null;
    for (let i = 0; i < board.grid.length; i++) {
      if (board.grid[i][0] === board.grid[i][1] && board.grid[i][1] === board.grid[i][2]) {
        winner = board.grid[i][0];
      }
    }

    for (let j = 0; j < board.grid.length; j++) {
      if (board.grid[0][j] === board.grid[1][j] && board.grid[1][j] === board.grid[2][j]) {
        winner = board.grid[0][j];
      }
    }

    if (board.grid[0][0] === board.grid[1][1] && board.grid[1][1] === board.grid[2][2]) {
      winner = board.grid[0][0];
    }

    if (board.grid[2][0] === board.grid[1][1] && board.grid[1][1] === board.grid[0][2]) {
      winner = board.grid[2][0];
    }

    if (board.isGridFull()) {
      winner = "tie";
    }

    return winner;
  }

  choosePositionForAI (board, player) {
    return this.findBestMove(board, player);
  }

  findBestMove (board, player) {
    let bestMove = -1;
    let optimalVal = -Infinity;
    for (let i = 0; i < board.grid.length; i++) {
      for (let j = 0; j < board.grid[0].length; j++) {
        if (typeof board.grid[i][j] === "number") {
          const position = board.grid[i][j];
          board.grid[i][j] = player.character;
          const val = this.minimax(board, false);
          board.grid[i][j] = position;
          if (val > optimalVal) {
            optimalVal = val;
            bestMove = position;
          }
        }
      }
    }
    return bestMove;
  }

  minimax (board, isMaximizer) {
    const winner = this.getWinner(board);
    if (winner !== null) {
      return this.evaluation(winner);
    }

    if (isMaximizer) {
      let maxVal = -Infinity;
      for (let i = 0; i < board.grid.length; i++) {
        for (let j = 0; j < board.grid[0].length; j++) {
          if (typeof board.grid[i][j] === "number") {
            const position = board.grid[i][j];
            board.grid[i][j] = this.players[1].character;
            const val = this.minimax(board, false);
            board.grid[i][j] = position;
            maxVal = Math.max(maxVal, val);
          }
        }
      }
      return maxVal;
    } else {
      let minVal = Infinity;
      for (let i = 0; i < board.grid.length; i++) {
        for (let j = 0; j < board.grid[0].length; j++) {
          if (typeof board.grid[i][j] === "number") {
            const position = board.grid[i][j];
            board.grid[i][j] = this.players[0].character;
            const val = this.minimax(board, true);
            board.grid[i][j] = position;
            minVal = Math.min(minVal, val);
          }
        }
      }
      return minVal;
    }
  }

  evaluation (winningChar) {
    const winner = this.players.filter(player => player.character === winningChar);
    if (winner.length === 1 && winner[0].type === "human") return this.scores.human;
    if (winner.length === 1 && winner[0].type === "ai") return this.scores.ai;
    if (winner.length === 0) return this.scores.tie;
  }
}

exports.GameController = GameController;
