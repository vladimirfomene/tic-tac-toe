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

describe("testing printGameInstructions...", () => {
  test("were instructions printed", () => {
    const printMock = jest.fn();
    commandLine.printGameInstructions(printMock);
    expect(printMock).toHaveBeenCalledTimes(2);
  });
});

describe("testing getCharacterForHuman...", () => {
  test("was the position gotten from user?", () => {
    const mockRead = jest.fn(() => "x");
    const char = commandLine.getCharacterForHuman(mockRead);
    expect(mockRead).toHaveBeenCalled();
    expect(char).toEqual("x");
  });
});

describe("testing declareWinner....", () => {
  test("is correct winner declared?", () => {
    const printMock = jest.fn();
    commandLine.declareWinner("tie", gameController.players, printMock);
    expect(printMock).toHaveBeenCalledWith("Oh, it is a draw");

    gameController.players[0].character = "o";
    commandLine.declareWinner("o", gameController.players, printMock);
    expect(printMock).toHaveBeenCalledWith("Congratulations, You win!");

    gameController.players[1].character = "x";
    commandLine.declareWinner("x", gameController.players, printMock);
    expect(printMock).toHaveBeenCalledWith("Oh la la, the computer wins");
  });
});
