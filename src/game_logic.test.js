const { UI } = require("./ui");
const { GameLogic } = require("./game_logic");

let logic;
let ui;

beforeAll(() => {
  logic = new GameLogic();
  ui = new UI();
});

describe("testing setupPlayers...", () => {
  test("do we have two players", () => {
    expect(logic.players.length).toBe(2);
  });

  test("no player has won at start", () => {
    logic.players.forEach(player => {
      expect(player.hasWon).toBeFalsy();
    });
  });

  test("do we have a human player", () => {
    const human = logic.players.filter(player => player.type === "human");
    expect(human.length).toBe(1);
    expect(human[0].type).toEqual("human");
  });

  test("do we have an AI player", () => {
    const ai = logic.players.filter(player => player.type === "AI");
    expect(ai.length).toBe(1);
    expect(ai[0].type).toEqual("AI");
  });
});

describe("testing choosePlayerToPlay...", () => {
  test("was current player chosen", () => {
    const initPlayers = [
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
    const turnPlayers = [
      {
        type: "human",
        character: "",
        hasWon: false,
        turn: true
      },
      {
        type: "AI",
        character: "",
        hasWon: false,
        turn: false
      }
    ];
    expect(logic.choosePlayerToPlay(initPlayers)).not.toBeNull();
    expect(logic.choosePlayerToPlay(turnPlayers)).toEqual({
      type: "AI",
      character: "",
      hasWon: false,
      turn: true
    });
  });
});

describe("testing isGameOver...", () => {
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
    ui.board.grid = horizontalGrid;
    expect(logic.isGameOver(ui.board, logic.players)).toBeTruthy();
    ui.board.grid = verticalGrid;
    expect(logic.isGameOver(ui.board, logic.players)).toBeTruthy();
    ui.board.grid = diagonalGrid;
    expect(logic.isGameOver(ui.board, logic.players)).toBeTruthy();
    ui.board.grid = fullGrid;
    expect(logic.isGameOver(ui.board, logic.players)).toBeTruthy();
  });
});
