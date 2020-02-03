const game = require("./game");

let players = null;
let grid = null;

beforeAll(() => {
  players = game.setupPlayers();
  grid = game.buildBoard();
});

describe("testing setupPlayers...", () => {
  test("do we have two players", () => {
    expect(players.length).toBe(2);
  });

  test("no player has won at start", () => {
    players.forEach(player => {
      expect(player.hasWon).toBeFalsy();
    });
  });

  test("do we have a human player", () => {
    const human = players.filter(player => player.type === "human");
    expect(human.length).toBe(1);
    expect(human[0].type).toEqual("human");
  });

  test("do we have an AI player", () => {
    const ai = players.filter(player => player.type === "AI");
    expect(ai.length).toBe(1);
    expect(ai[0].type).toEqual("AI");
  });
});

describe("testing buildBoard...", () => {
  test("has grid been created with initial vals", () => {
    let count = 1;
    for (let i = 0; i < grid.length; i++) {
      for (let j = 0; j < grid[0].length; j++) {
        expect(grid[i][j]).toBe(count++);
      }
    }
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
    expect(game.isGameOver(horizontalGrid, players)).toBeTruthy();
    expect(game.isGameOver(verticalGrid, players)).toBeTruthy();
    expect(game.isGameOver(diagonalGrid, players)).toBeTruthy();
    expect(game.isGameOver(fullGrid, players)).toBeTruthy();
  });
});

describe("testing printBoard...", () => {
  test("check if print row is working", () => {
    const printMock = jest.fn();
    game.printBoard(grid, printMock);
    expect(printMock).toHaveBeenCalledTimes(3);
  });
});

describe("testing choosePlayer...", () => {
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
    expect(game.choosePlayer(initPlayers)).not.toBeNull();
    expect(game.choosePlayer(turnPlayers)).toEqual({
      type: "AI",
      character: "",
      hasWon: false,
      turn: true
    });
  });
});

describe("testing choosePosition", () => {
  let human = {
    type: "human",
    character: "",
    hasWon: false,
    turn: false
  };

  let ai = {
    type: "AI",
    character: "",
    hasWon: false,
    turn: false
  };
  test("can ai or human choose position", () => {
      let posHuman = game.choosePosition(human);
      let posAI = game.choosePosition(ai);
      expect(posHuman).toBeGreaterThan(0);
      expect(posHuman).toBeLessThan(10);
      expect(posAI).toBeGreaterThan(0);
      expect(posAI).toBeLessThan(10);
  });
});
