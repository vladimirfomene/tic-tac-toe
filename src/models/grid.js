class Grid {
  constructor () {
    this.grid = this.buildGrid();
  }

  buildGrid () {
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

  isGridFull () {
    for (let i = 0; i < this.grid.length; i++) {
      for (let j = 0; j < this.grid[0].length; j++) {
        if (typeof this.grid[i][j] === "number") return false;
      }
    }
    return true;
  }

  isPositionEmpty (position) {
    if (position < 1 || position > 9) return false;

    for (let i = 0; i < this.grid.length; i++) {
      for (let j = 0; j < this.grid[0].length; j++) {
        if (this.grid[i][j] === position) return true;
      }
    }
    return false;
  }

  getPositionIndices (position) {
    for (let i = 0; i < this.grid.length; i++) {
      for (let j = 0; j < this.grid[0].length; j++) {
        if (this.grid[i][j] === position) return { i, j };
      }
    }
  }

  updateGrid (i, j, character) {
    this.grid[i][j] = character;
  }
}

exports.Grid = Grid;
