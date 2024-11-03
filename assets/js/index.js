const canvas = document.getElementById("canvas");

const ctx = canvas.getContext("2d");

const game = new Game(ctx);

const startButton = document.getElementById("startButton");

startButton.addEventListener("click", () => {
  if (game.started === false) {
    if (game.isGameOver) {
      // Reiniciar las variables del juego
      game.level = 1;
      game.lives = 3;
      game.isGameOver = false;
      game.generateFake();

      game.platforms = [];
      game.addPlatform();

      // Coloca al jugador en la posición inicial
      game.player.x = game.platforms[0].x;
      game.player.y = game.platforms[0].y - game.player.h;

      // Restablecer la puerta
      game.lastPlatform = {
        x: game.platforms[game.platforms.length - 1].x,
        y: game.platforms[game.platforms.length - 1].y,
      };
      game.door = new Door(game.ctx, game.lastPlatform);
    }

    // Inicia el juego
    game.start();
  } else {
    game.pause();
  }
});
