const { UI } = require("./ui");
const { GameLogic } = require("./game_logic");

let logic;
let ui;

beforeAll(() => {
  logic = new GameLogic();
  ui = new UI();
});

describe("testing buildBoard...", () => {
  test("has grid been created with initial vals", () => {
    let count = 1;
    for (let i = 0; i < ui.board.grid.length; i++) {
      for (let j = 0; j < ui.board.grid[0].length; j++) {
        expect(ui.board.grid[i][j]).toBe(count++);
      }
    }
  });
});

describe("testing printBoard...", () => {
  test("check if print row is working", () => {
    const printMock = jest.fn();
    ui.board.printBoard(printMock);
    expect(printMock).toHaveBeenCalledTimes(3);
  });
});

describe("testing choosePosition", () => {
  const mockRead = jest.fn(() => Math.round((Math.random() * 8) + 1));
  test("can ai or human choose position", () => {
    const posHuman = ui.choosePosition(logic.players[0], ui.board, mockRead);
    const posAI = ui.choosePosition(logic.players[1], ui.board, mockRead);
    expect(posHuman).toBeGreaterThan(0);
    expect(posHuman).toBeLessThan(10);
    expect(posAI).toBeGreaterThan(0);
    expect(posAI).toBeLessThan(10);
  });
});

describe("testing updateBoard...", () => {
  const grid = [
    ["x", "x", "x"],
    [4, "o", "o"],
    [7, 8, 9]
  ];
  const human = {
    type: "human",
    character: "o",
    hasWon: false,
    turn: false
  };
  test("can update grid from state A to B", () => {
    ui.board.grid = grid;
    ui.board.updateBoard(4, human);
    expect(ui.board.grid).toEqual([
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
    ui.board.grid = grid;
    expect(ui.board.isPositionEmpty(1)).toBeFalsy();
    expect(ui.board.isPositionEmpty(-1)).toBeFalsy();
  });
});

describe("testing setupGame...", () => {
  const setupPlayers = [{
    type: "human",
    character: "o",
    hasWon: false,
    turn: false
  },
  {
    type: "AI",
    character: "x",
    hasWon: false,
    turn: false
  }];
  const mockRead = jest.fn(() => "o");

  test("were playing characters assigned", () => {
    ui.setupGame(logic.players, mockRead);
    expect(logic.players).toEqual(setupPlayers);
  });
});
