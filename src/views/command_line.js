class CommandLine {
  printBoard (printFn, grid) {
    for (let i = 0; i < grid.length; i++) {
      let row = "";
      for (let j = 0; j < grid[0].length; j++) {
        row += "|" + grid[i][j] + "|";
      }
      printFn(row);
    }
  }

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

  printGameInstructions (printFn) {
    printFn("Welcome! This is a Tic Tac Toe game.");
    printFn(
      "To start playing you need to choose a character you will use from either \"o\" or \"x\""
    );
  }

  getCharacterForHuman (read) {
    let char = "";
    while (["o", "x"].indexOf(char) === -1) {
      char = read("Enter your chosen character? ");
    }

    return char;
  }

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
