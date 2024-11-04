class Game {
  constructor(ctx) {
    this.ctx = ctx;

    this.level = 1;
    this.lives = 3;
    this.lostLife = false; // Nueva variable para controlar el descuento de vida

    this.fakePlatformIndex = 0;
    this.generateFake(); //genera el indice del array de plataformas que es falsa, no puede ser ni la primera ni la ultima

    this.background = new Background(ctx);
    this.platforms = [new Platform(ctx)];
    this.addPlatform();

    this.lastPlatform = {
      x: this.platforms[this.platforms.length - 1].x,
      y: this.platforms[this.platforms.length - 1].y,
    };

    this.door = new Door(ctx, this.lastPlatform);

    this.firstPlatform = {
      x: this.platforms[0].x,
      y: this.platforms[0].y,
    };

    this.player = new Player(this.ctx, this.firstPlatform);

    this.interval = null;
    this.started = false;
    this.isGameOver = false;
    this.score = [];

    this.getScore();

    this.fontFamily = "Comic Sans MS";

    this.setListeners();
  }

  generateFake() {
    const index = [1, 2, 3][Math.floor(Math.random() * 3)];
    this.fakePlatformIndex = index;
    console.log("Fake index:", this.fakePlatformIndex);
  }

  start() {
    this.started = true;
    this.isGameOver = false;
    let tick = 0;

    this.interval = setInterval(() => {
      this.clear();

      this.move();

      this.draw();

      this.checkInPlatform();
      this.checkInDoor();

      tick++;
    }, 1000 / 60);
  }

  addPlatform() {
    // Plataforma 0 en la parte inferior
    const basePlatform = new Platform(this.ctx);

    basePlatform.x = 0;
    basePlatform.y = this.ctx.canvas.height - 50;
    basePlatform.w = this.ctx.canvas.width;
    basePlatform.h = 50;
    basePlatform.isFake = false; //indica qué plataforma es la falsa

    this.platforms[0] = basePlatform;

    // Posiciones específicas de y para las plataformas
    const yPositions = [300, 250, 200, 150];

    // construyo las plataformas
    for (let i = 0; i < 4; i++) {
      const xPos = Math.random() * (this.ctx.canvas.width - 175) + 75; // Posición aleatoria en x
      const yPos = yPositions[i]; // Posición específica en y

      const newPlatform = new Platform(this.ctx, xPos, yPos);

      this.platforms.push(newPlatform); //mete la nueva plataforma en el final del array de las plataformas
    }

    this.platforms[this.fakePlatformIndex].isFake = true; //cambia el atributo .isFake de la plataforma seleccionada, a falsa

    console.log(this.platforms);
  }

  draw() {
    this.background.draw(this.level, this.lives);
    this.platforms.forEach((p) => p.draw());
    this.door.draw();
    this.player.draw();
  }

  move() {
    this.player.move();
  }

  checkInPlatform() {
    //para cada plataforma compruebo si es la falsa.
    for (let i = 0; i < this.platforms.length; i++) {
      if (this.player.inPlatform(this.platforms[i])) {
        if (this.platforms[i].isFake) {
          this.lostLife = true;
          this.player.isFallingThrough = true;

          this.platforms[i].draw2(); // cambia la plataforma fake por lava
          this.platforms[0].draw2(); // cambia el suelo por lava

          this.player.draw2(this.platforms[i]); // cambia al jugador por humo
          this.player.stare(); //se queda quieto el jugador

          this.lives = this.lives - 1;

          if (this.lives > 0) {
            this.pause();

            setTimeout(() => {
              this.restartLevel();
            }, 1500);
          } else {
            this.gameOver();
          }
        } else {
          //si no es la falsa, se posa encima
          this.player.vy = 0;
          this.player.y = this.platforms[i].y - this.player.h;
        }
        return;
      }
    }
  }

  checkInDoor() {
    if (this.player.inDoor(this.door)) {
      this.door.draw2(); // Muestra la puerta abierta

      this.pause(); // Pausar el juego y esperar 1.5 segundos
      setTimeout(() => {
        this.nextLevel(); // Procede con el siguiente nivel después de la pausa
      }, 1500);
    }
  }

  nextLevel() {
    this.clear();

    // Mensaje "Next Level"
    this.ctx.font = "Bold 40px Comic Sans MS";
    this.ctx.fillStyle = "darkblue";
    this.ctx.textAlign = "center";
    this.ctx.fillText("Next Level", this.ctx.canvas.width / 2, 100);

    // Espera 1.5 segundos para reiniciar el nivel
    setTimeout(() => {
      this.level += 1; //sube el marcador del nivel
      this.generateFake(); //genera el nevo índice de plataforma falsa
      this.background = new Background(this.ctx, this.level, this.lives); //pinta de nuevo Background con los nuevos marcadores

      // Genera nuevas plataformas y puerta
      this.platforms = [];
      this.addPlatform();

      this.lastPlatform = {
        x: this.platforms[this.platforms.length - 1].x,
        y: this.platforms[this.platforms.length - 1].y,
      };
      this.door = new Door(this.ctx, this.lastPlatform);

      // Restablece la posición del jugador
      this.player.x = this.platforms[0].x;
      this.player.y = this.platforms[0].y - this.player.h;

      // Reanuda el juego
      this.start();
    }, 1500);
  }

  restartLevel() {
    console.log("dentro de restar", this.fakePlatformIndex);
    this.generateFake();
    console.log("dentro de restar2 ", this.fakePlatformIndex);

    // Detener el juego temporalmente para mostrar el mensaje
    this.clear();

    // Mensaje de restart
    this.ctx.font = "Bold 40px Comic Sans MS";
    this.ctx.fillStyle = "darkblue";
    this.ctx.textAlign = "center";
    this.ctx.fillText("Restart Level", this.ctx.canvas.width / 2, 100);

    this.lostLive = false;
    console.log(this.lostLive);

    setTimeout(() => {
      this.background = new Background(ctx, this.level, this.lives); //pinta el Background con los nuevos marcadores
      //no genera nuevas plataforma ni el fakeIndex porque rejuegas el mismo nivel

      console.log("en el settime del restart", this.fakePlatformIndex);
      console.log("en el restart", this.platforms);
      console.log("plataformas repintadas", this.fakePlatformIndex);

      this.player.x = this.platforms[0].x; // coloco al monigote en su sitio
      this.player.y = this.platforms[0].y - this.player.h;
      this.player.vy = 0; //reseteo para que no salte o se caiga

      this.start();
    }, 1500);
  }

  setListeners() {
    document.addEventListener("keydown", (event) => {
      this.player.onKeyDown(event.keyCode);
    });

    document.addEventListener("keyup", (event) => {
      this.player.onKeyUp(event.keyCode);
    });
  }

  clear() {
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
  }

  gameOver() {
    this.clear(); // Limpia el canvas
    this.pause(); // Detiene el juego

    //guarda la puntuación si procede
    this.addScore();
    this.getScore();


    // Mostrar mensaje de "Game Over"

    this.ctx.font = "Bold 40px Comic Sans MS";
    this.ctx.fillStyle = "darkblue";
    this.ctx.textAlign = "center";
    this.ctx.fillText(
      "Game Over",
      this.ctx.canvas.width / 2, // Centro horizontal
      100
    );

    this.ctx.font = "20px Comic Sans MS";
    this.ctx.fillStyle = "darkblue";
    this.ctx.textAlign = "center";
    this.ctx.fillText("Puntuaciones:", this.ctx.canvas.width / 2, 200);

    this.score.forEach((entry, index) => {
      const yPosition = 230 + index * 30; // Ajusta el espacio vertical entre puntajes
      this.ctx.fillText(
        `Fecha: ${entry.fecha} - Nivel: ${entry.nivel}`,
        this.ctx.canvas.width / 2,
        yPosition
      );
    });

    // Indica que el juego ha terminado
    this.started = false;
    this.isGameOver = true;
  }

  pause() {
    this.started = false;
    clearInterval(this.interval);
    this.interval = null;
  }

  addScore() {
    const hoy = new Date().toLocaleDateString(); // fecha de hoy
    this.score.sort((a, b) => b.nivel - a.nivel); //ordeno el score de mayor a menor nivel

    // Agrega el puntaje solo si el nivel actual es mayor o igual al más alto o si la lista está vacía
    if (this.score.length === 0 || this.level >= this.score[0].nivel) {
      this.score.unshift({ fecha: hoy, nivel: this.level });
      if (this.score.length >3) {
        this.score.pop();
      }
    }

    // Guarda el array actualizado en localStorage
    localStorage.setItem("scores", JSON.stringify(this.score));
  }

  getScore() {
    // Cargar desde localStorage solo si existe
    const savedScores = localStorage.getItem("scores");
    this.score = savedScores ? JSON.parse(savedScores) : []; // Inicia vacío si no hay guardado
    this.score.sort((a, b) => b.nivel - a.nivel); // Ordena los puntajes de mayor a menor nivel

    console.log(this.score);
  }
}
