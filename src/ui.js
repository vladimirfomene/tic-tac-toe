class UI {
  constructor () {
    this.board = this.buildBoard();
  }

  buildBoard () {
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

    return {
      grid,
      isGridFull () {
        for (let i = 0; i < this.grid.length; i++) {
          for (let j = 0; j < this.grid[0].length; j++) {
            if (typeof this.grid[i][j] === "number") return false;
          }
        }
        return true;
      },
      isPositionEmpty (position) {
        if (position < 1 || position > 9) return false;

        for (let i = 0; i < this.grid.length; i++) {
          for (let j = 0; j < this.grid[0].length; j++) {
            if (this.grid[i][j] === position) return true;
          }
        }
        return false;
      },
      printBoard (printFn) {
        for (let i = 0; i < this.grid.length; i++) {
          let row = "";
          for (let j = 0; j < this.grid[0].length; j++) {
            row += "|" + this.grid[i][j] + "|";
          }
          printFn(row);
        }
      },
      updateBoard (position, player) {
        for (let i = 0; i < this.grid.length; i++) {
          for (let j = 0; j < this.grid[0].length; j++) {
            if (this.grid[i][j] === position) this.grid[i][j] = player.character;
          }
        }
      }

    };
  }

  setupGame (players, read) {
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
}

exports.UI = UI;
