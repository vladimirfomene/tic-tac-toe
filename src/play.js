const { GameController } = require("./controllers/game_controller");

/**
 * Initialize game controller and start
 * the game.
 */
const gameController = new GameController();
gameController.play();
