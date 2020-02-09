const { CommandLine } = require("./command_line");
const { Grid } = require("../models/grid");
const { GameController } = require("../controllers/game_controller");

let commandLine;
let board;
let gameController;

beforeAll(() => {
  commandLine = new CommandLine();
  board = new Grid();
  gameController = new GameController();
});

describe("testing printBoard...", () => {
  test("check if print row is working", () => {
    const printMock = jest.fn();
    commandLine.printBoard(printMock, board.grid);
    expect(printMock).toHaveBeenCalledTimes(3);
  });
});

describe("testing choosePositionForHuman", () => {
  const mockRead = jest.fn(() => Math.round((Math.random() * 8) + 1));
  test("can human choose position", () => {
    const posHuman = commandLine.choosePositionForHuman(gameController.players[0], board, mockRead);
    expect(posHuman).toBeGreaterThan(0);
    expect(posHuman).toBeLessThan(10);
  });
});
