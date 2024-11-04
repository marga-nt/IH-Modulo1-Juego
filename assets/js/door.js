class Door {
  constructor(ctx, lastPlatform) {
    this.ctx = ctx;
    this.w = 50;
    this.h = 70;

    this.x = lastPlatform.x + 50;
    this.y = lastPlatform.y - this.h;

    //this.x = 300;  uso esta posición cuando hay que hacer pruebas y pasar rápido de nivel
    //this.y = 300;

    this.img1 = new Image();
    this.img1.src = "assets/images/puerta-cerrada.JPG";

    this.img2 = new Image();
    this.img2.src = "assets/images/puerta-abierta.jpg";
  }

  draw() {
    this.ctx.drawImage(this.img1, this.x, this.y, this.w, this.h);
  }

  draw2() {
    this.ctx.drawImage(this.img2, this.x, this.y, this.w, this.h);
    console.log("Puerta abierta");
  }
}
