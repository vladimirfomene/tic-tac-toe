
class GameLogic {
  constructor () {
    this.players = this.setupPlayers();
  }

  play (player, board, questFn) {
    return this.choosePosition(player, board, questFn);
  }

  setupPlayers () {
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

  choosePlayerToPlay (players) {
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

  isGameOver (board, players) {
    for (let i = 0; i < board.grid.length; i++) {
      if (board.grid[i][0] === board.grid[i][1] && board.grid[i][1] === board.grid[i][2]) {
        for (const player of players) {
          if (player.character === board.grid[i][0]) player.hasWon = true;
        }
        return true;
      }
    }

    for (let j = 0; j < board.grid.length; j++) {
      if (board.grid[0][j] === board.grid[1][j] && board.grid[1][j] === board.grid[2][j]) {
        for (const player of players) {
          if (player.character === board.grid[0][j]) player.hasWon = true;
        }
        return true;
      }
    }

    if (board.grid[0][0] === board.grid[1][1] && board.grid[1][1] === board.grid[2][2]) {
      for (const player of players) {
        if (player.character === board.grid[0][0]) player.hasWon = true;
      }
      return true;
    }

    if (board.grid[2][0] === board.grid[1][1] && board.grid[1][1] === board.grid[0][2]) {
      for (const player of players) {
        if (player.character === board.grid[2][0]) player.hasWon = true;
      }
      return true;
    }

    if (board.isGridFull()) {
      for (const player of players) {
        player.hasWon = true;
      }
      return true;
    }

    return false;
  }

  choosePosition (player, board, read) {
    let position = -1;
    if (player.type === "human") {
      while (position < 1 || position > 9 || isNaN(position)) {
        position = parseInt(read("Choose a position on the board? "));
        if (!board.isPositionEmpty(position)) position = -1;
      }
    }

    if (player.type === "AI") {
      while (!board.isPositionEmpty(position)) {
        position = Math.round(Math.random() * 8) + 1;
      }
    }

    return position;
  }

  declareWinner (players, printFn) {
    if (players[0].hasWon && players[1].hasWon) {
      printFn("Oh, it is a draw");
      return;
    }

    if (players[0].hasWon) {
      printFn("Congratulations, You win!");
      return;
    }

    if (players[1].hasWon) {
      printFn("Oh la la, the computer wins");
    }
  }
}

exports.GameLogic = GameLogic;
