class Background {
  constructor(ctx) {
    this.ctx = ctx;

    this.x = 0;
    this.y = 0;
    this.w = this.ctx.canvas.width;
    this.h = this.ctx.canvas.height;

    this.fillStyle = "#f0f0f0";
  }

  draw(level, lives) {
    this.ctx.fillStyle = this.fillStyle;
    this.ctx.fillRect(this.x, this.y, this.w, this.h);

    // marcador de nivel
    this.ctx.font = "20px Arial";
    this.ctx.fillStyle = "black";
    this.ctx.fillText("Level: " + level, 0, 20);

    //marcador de vidas
    this.ctx.font = "20px Arial";
    this.ctx.fillStyle = "black";
    this.ctx.fillText("Lifes: " + lives, 0, 40);
  }
}
