const { Grid } = require("grid");

let board;
beforeAll(() => {
  board = new Grid();
});

describe("testing buildGrid...", () => {
  test("has grid been created with initial vals", () => {
    let count = 1;
    for (let i = 0; i < board.grid.length; i++) {
      for (let j = 0; j < board.grid[0].length; j++) {
        expect(board.grid[i][j]).toBe(count++);
      }
    }
  });
});

describe("testing updateGrid...", () => {
  const grid = [
    ["x", "x", "x"],
    [4, "o", "o"],
    [7, 8, 9]
  ];
  test("can update grid from state A to B", () => {
    board.grid = grid;
    board.updateGrid(1, 0, "o");
    expect(board.grid).toEqual([
      ["x", "x", "x"],
      ["o", "o", "o"],
      [7, 8, 9]
    ]);
  });
});

describe("testing isPositionEmpty...", () => {
  const grid = [
    ["x", "x", "x"],
    ["x", "o", "o"],
    ["x", "x", "x"]
  ];
  test("check if we have an empty position in the grid", () => {
    board.grid = grid;
    expect(board.isPositionEmpty(1)).toBeFalsy();
    expect(board.isPositionEmpty(-1)).toBeFalsy();
  });
});
