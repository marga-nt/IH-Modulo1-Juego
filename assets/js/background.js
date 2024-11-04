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
    this.ctx.font = "20px Comic Sans MS";
    this.ctx.fillStyle = "darkblue";
    this.ctx.textAlign = "left"; // Asegura que el texto esté alineado a la izquierda
    this.ctx.textBaseline = "top"; // Alinea el texto al borde superior
    this.ctx.fillText("Level: " + level, 10, 10); // Ajusta las coordenadas si es necesario

    //marcador de vidas
    this.ctx.font = "20px Comic Sans MS";
    this.ctx.fillStyle = "darkblue";
    this.ctx.textAlign = "right"; // Alinea el texto a la derecha
    this.ctx.textBaseline = "top"; // Alinea el texto al borde superior
    this.ctx.fillText("Lives: " + lives, this.ctx.canvas.width - 10, 10); // Un pequeño margen desde el borde
    
  }

}
