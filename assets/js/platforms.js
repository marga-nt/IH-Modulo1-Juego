class Platform {
  constructor(ctx, x, y, level) {
    this.ctx = ctx;

    this.level = level;

    this.x = x;
    this.y = y;

    this.w = 100;
    this.h = 10;
    this.fillStyle = "green";
    this.isFake = false;

    this.img1 = new Image();
    this.img1.src = "assets/images/suelo-verde1.jpg";

    this.img2 = new Image();
    this.img2.src = "assets/images/suelo-lava.JPG";
  }

  draw() {
    //pinta el suelo y plataformas en verde
    this.ctx.drawImage(this.img1, this.x, this.y, this.w, this.h);
  }

  draw2() {
    //pinta la lava en la plataforma que sea
    this.ctx.drawImage(this.img2, this.x, this.y, this.w, this.h);
  }
}
