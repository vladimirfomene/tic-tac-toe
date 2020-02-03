const game = require("./game");

describe("testing setupPlayers", () => {
  const players = game.setupPlayers();
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

describe("testing buildBoard", () => {
  const grid = game.buildBoard();
  test("has grid been created with initial vals", () => {
    let count = 1;
    for (let i = 0; i < grid.length; i++) {
      for (let j = 0; j < grid[0].length; j++) {
        expect(grid[i][j]).toBe(count++);
      }
    }
  });
});
