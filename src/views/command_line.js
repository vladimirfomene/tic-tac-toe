class CommandLine {
  /**
   * Renders the game board in the commandline
   * @param {function} printFn - function for printing (console.log)
   * @param {Array} grid - 3x3 2-d array which represents game board
   */
  printBoard (printFn, grid) {
    for (let i = 0; i < grid.length; i++) {
      let row = "";
      for (let j = 0; j < grid[0].length; j++) {
        row += "|" + grid[i][j] + "|";
      }
      printFn(row);
    }
  }

  /**
   * Ask user to choose the position where they will like to play
   * @param {object} player - instance of the Player class
   * @param {object} board - instance of the Grid class
   * @param {function} read - readline function.
   * @returns {number} - position where user wants to play
   */
  choosePositionForHuman (player, board, read) {
    let position = -1;
    if (player.type === "human") {
      while (position < 1 || position > 9 || isNaN(position)) {
        position = parseInt(read("Choose a position on the board? "));
        if (!board.isPositionEmpty(position)) position = -1;
      }
    }
    return position;
  }

  /**
   * Print tic tac toe game instructions
   * @param {function} printFn - function to print to commandline (console.log)
   */
  printGameInstructions (printFn) {
    printFn("Welcome! This is a Tic Tac Toe game.");
    printFn(
      "To start playing you need to choose a character you will use from either \"o\" or \"x\""
    );
  }

  /**
   * Ask user to choose the character they will like to play with.
   * @param {function} read - function to read characters from commandline
   * @returns {string} - character users want to use to play
   */
  getCharacterForHuman (read) {
    let char = "";
    while (["o", "x"].indexOf(char) === -1) {
      char = read("Enter your chosen character? ");
    }

    return char;
  }

  /**
   * Declare winner of the game.
   * @param {string} winner - winning player's character
   * @param {Array} players - array of human and ai player
   * @param {function} printFn  - function to print to the commandline (console.log)
   */
  declareWinner (winner, players, printFn) {
    if (winner === "tie") {
      printFn("Oh, it is a draw");
      return;
    }
    const winningPlayer = players.filter(player => player.character === winner);
    if (winningPlayer[0].type === "human") {
      printFn("Congratulations, You win!");
    } else {
      printFn("Oh la la, the computer wins");
    }
  }
}

exports.CommandLine = CommandLine;
