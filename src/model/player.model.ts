import { GameObject } from './game-object.model';
import { Vector2D } from './vector-2d.model';

import { ImageUtils } from './../utils/image.util';

import playerShipSrc from '../assets/image/playerShip.png';

// TODO: Corrigir logicas de tamanho das imagens
export class Player extends GameObject {
  public frames = 0;
  public time = 0;
  public speed = 7;
  public cropWidth = 16;
  public cropColumn = 2;
  public cropHeight = 24;
  public opacity = 1;

  constructor() {
    super(
      ImageUtils.createImage(playerShipSrc),
      16,
      24,
      new Vector2D(0, 0),
      new Vector2D(1024 / 2, 576 - 80),
    );
  }

  public update(ctx: CanvasRenderingContext2D): void {
    this.time++;

    // TODO: vericar se essa lógica de troca de frames a cada periodo de tempo pode ser melhorada
    if (this.time % 6 == 0) {
      this.frames++;

      if (this.velocity.x === 0) {
        this.cropColumn = 2;
      } else if (this.velocity.x === this.speed) {
        this.cropColumn = 3;
      } else if (this.velocity.x === -this.speed) {
        this.cropColumn = 1;
      }
    }

    if (this.frames >= 2) {
      this.frames = 0;
    }

    this.position.x += this.velocity.x;
    this.draw(ctx);
  }

  public draw(ctx: CanvasRenderingContext2D): void {
    ctx.save();

    ctx.globalAlpha = this.opacity;

    ctx.drawImage(
      this.image,
      this.cropWidth * this.cropColumn,
      this.cropHeight * this.frames,
      this.cropWidth,
      this.cropHeight,
      this.position.x,
      this.position.y,
      this.width * 3,
      this.height * 3,
    );

    ctx.restore();
  }
}
