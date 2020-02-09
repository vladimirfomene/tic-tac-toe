const { GameController } = require("./game_controller");
const { Grid } = require("../models/grid");

let gameController;
let board;
beforeAll(() => {
  board = new Grid();
  gameController = new GameController();
});

describe("testing setupPlayers...", () => {
  test("do we have two players", () => {
    expect(gameController.players.length).toBe(2);
  });

  test("no player has turn set", () => {
    gameController.players.forEach(player => {
      expect(player.turn).toBeFalsy();
    });
  });

  test("do we have a human player", () => {
    const human = gameController.players.filter(player => player.type === "human");
    expect(human.length).toBe(1);
    expect(human[0].type).toEqual("human");
  });

  test("do we have an AI player", () => {
    const ai = gameController.players.filter(player => player.type === "ai");
    expect(ai.length).toBe(1);
    expect(ai[0].type).toEqual("ai");
  });
});

describe("testing choosePlayerToPlay...", () => {
  test("was current player chosen", () => {
    const controller = new GameController();
    expect(controller.choosePlayerToPlay()).not.toBeNull();
    for (let i = 0; i < controller.players; i++) {
      controller.players[i].turn = false;
    }
    controller.players[0].turn = true;
    const chosenPlayer = controller.choosePlayerToPlay();
    expect(chosenPlayer.type).toEqual("ai");
    expect(chosenPlayer.character).toEqual("");
    expect(chosenPlayer.turn).toEqual(true);
  });
});

describe("testing getWinner...", () => {
  const horizontalGrid = [
    ["x", "x", "x"],
    [4, "o", "o"],
    [7, 8, 9]
  ];
  const verticalGrid = [
    ["x", "o", "o"],
    ["x", "o", "o"],
    ["x", 8, 9]
  ];
  const diagonalGrid = [
    ["x", "o", "x"],
    [4, "x", "o"],
    [7, 8, "x"]
  ];

  const fullGrid = [
    ["x", "o", "x"],
    ["x", "x", "o"],
    ["o", "x", "o"]
  ];

  test("has a player won the game", () => {
    board.grid = horizontalGrid;
    expect(gameController.getWinner(board)).toEqual("x");
    board.grid = verticalGrid;
    expect(gameController.getWinner(board)).toEqual("x");
    board.grid = diagonalGrid;
    expect(gameController.getWinner(board)).toEqual("x");
    board.grid = fullGrid;
    expect(gameController.getWinner(board)).toEqual("tie");
  });
});

describe("testing setupScores...", () => {
  const scores = {
    human: -10,
    ai: 10,
    tie: 0
  };

  test("check if scores object was setup", () => {
    expect(gameController.setupScores()).toEqual(scores);
  });
});

describe("testing assignCharToPlayers...", () => {
  test("check if players have characters", () => {
    gameController.assignCharToPlayers("o");
    expect(gameController.players[0].character).toEqual("o");
    expect(gameController.players[1].character).toEqual("x");

    gameController.assignCharToPlayers("x");
    expect(gameController.players[0].character).toEqual("x");
    expect(gameController.players[1].character).toEqual("o");
  });
});
