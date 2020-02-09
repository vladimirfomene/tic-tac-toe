const readline = require("readline-sync");
const { CommandLine } = require("../views/command_line");
const { Player } = require("../models/player");
const { Grid } = require("../models/grid");

class GameController {
  constructor () {
    this.scores = this.setupScores();
    this.players = this.setupPlayers("human", "ai");
  }

  /**
   * Controls the game play
   */
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

  /**
   * Create array for human and ai players
   * @param {string} firstPlayer - type for first player
   * @param {string} secondPlayer - type for second player
   * @returns {Array} - array of human and ai players
   */
  setupPlayers (firstPlayer, secondPlayer) {
    return [
      new Player(firstPlayer),
      new Player(secondPlayer)
    ];
  }

  /**
   * Assign a char to each player
   * @param {string} humanChar - character chosen by human player
   */
  assignCharToPlayers (humanChar) {
    if (humanChar === "o") {
      this.players[0].character = humanChar;
      this.players[1].character = "x";
    } else {
      this.players[0].character = humanChar;
      this.players[1].character = "o";
    }
  }

  /**
   * setup scores for evaluating the terminal state of the minimax
   * @returns {object} - object with a score for each player at the end of a game
   */
  setupScores () {
    return {
      human: -10,
      ai: 10,
      tie: 0
    };
  }

  /**
   * From the players array choose player to play the current turn
   * @returns {object} - instance of Player to play current turn
   */
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

  /**
   * Check if the game is in a terminating condition and return winning character
   * @param {Grid} board - winning character
   * @returns {string} - "x", "o" or "tie"
   */
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

  /**
   * Choose a move for ai player using minimax algorithm.
   * @param {Grid} board - instance of the Grid class (game board)
   * @param {Player} player - instance of ai player
   * @returns {position} - cell position where ai wants to play
   */
  choosePositionForAI (board, player) {
    return this.findBestMove(board, player);
  }

  /**
   * Use the minimax algorithm to play all possible game scenario from the
   * current state of the board to figure out the most optimal move.
   * @param {Grid} board - instance of the Grid class (game board)
   * @param {Player} player - instance of ai player
   * @returns {number} - optimal cell position
   */
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

  /**
   * Implements the minimax algorithm by playing all possible scenario from
   * current game board using maximizer and minimizer.
   * @param {Grid} board - instance of the Grid class (game board)
   * @param {boolean} isMaximizer - tells if player is maximizer or minimizer
   * @returns {number} - optimal value from minimax
   */
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

  /**
   * Gets the score from a winning character
   * @param {String} winningChar - "x", "o" or "tie"
   * @returns {number} - score for winning character
   */
  evaluation (winningChar) {
    const winner = this.players.filter(player => player.character === winningChar);
    if (winner.length === 1 && winner[0].type === "human") return this.scores.human;
    if (winner.length === 1 && winner[0].type === "ai") return this.scores.ai;
    if (winner.length === 0) return this.scores.tie;
  }
}

exports.GameController = GameController;
