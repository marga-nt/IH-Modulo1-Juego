class Player {
  constructor(ctx, firstPlatform) {
    this.ctx = ctx;

    this.w = 30;
    this.h = 30;

    this.x = firstPlatform.x;
    this.y = firstPlatform.y - this.h;

    this.vx = 0;
    this.vy = 0;

    this.ax = 0;
    this.ay = 1;

    this.jumpStrength = 15;
    this.speed = 2;

    this.firstPlatformy = firstPlatform.y;
    this.isFallingThrough = false;

    this.img = new Image();
    this.img.src = "/assets/images/monigote.PNG";

    this.img2 = new Image();
    this.img2.src = "/assets/images/humo.JPG";
  }

  move() {
    this.vy += this.ay; // Aplica la gravedad normal
    this.vx += this.ax;

    this.x += this.vx; // Se mueve
    this.y += this.vy;

    // Limitar movimientos al canvas en el eje x
    if (this.x < 0) this.x = 0;
    if (this.x + this.w > this.ctx.canvas.width) {
      this.x = this.ctx.canvas.width - this.w;
    }

    //Limitar movimientos al canvas en eleje y
    if (this.y < 0) this.y = 0;
    if (this.y > this.ctx.canvas.height - this.firstPlatformy) {
      this.y + this.h >= this.ctx.canvas.height - this.firstPlatformy;
    }
  }

  stare() {
    //no deja qeu el jugador se mueva
    this.vy = 0;
    this.vw = 0;
    this.x = this.x;
    this.y = this.y;
  }

  jump() {
    this.vy = -this.jumpStrength;
  }

  draw() {
    //dibuja al jugador
    this.ctx.strokeRect(this.x, this.y, this.w, this.h);
    this.ctx.drawImage(this.img, this.x, this.y, this.w, this.h);
  }

  draw2() {
    //dibuja explosión
    this.ctx.drawImage(this.img2, this.x, this.y, this.w * 2, this.h * 2);
  }

  onKeyDown(code) {
    switch (code) {
      case KEY_UP:
        this.jump();
        break;
      case KEY_RIGHT:
        this.vx = this.speed;
        break;
      case KEY_LEFT:
        this.vx = -this.speed;
        break;
    }
  }

  onKeyUp(code) {
    switch (code) {
      case KEY_RIGHT:
      case KEY_LEFT:
        this.vx = 0;
        break;
    }
  }

  inPlatform(el) {
    const inPlatformX = el.x < this.x + this.w && this.x < el.x + el.w;
    const inPlatformY = el.y <= this.y + this.h && el.y + el.h >= this.y;

    return inPlatformX && inPlatformY;
  }

  inDoor(el) {
    const inDoorX = el.x <= this.x && this.x + this.w <= el.x + el.w;
    const inDoorY = this.y >= el.y && this.y + this.h < el.y + el.h;

    return inDoorX && inDoorY;
  }
}
