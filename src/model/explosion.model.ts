import { GameObject } from './game-object.model';
import { Vector2D } from './vector-2d.model';

import { ImageUtils } from './../utils/image.util';

import explosionSrc from '../assets/image/explosion.png';

export class Explosion extends GameObject {
  public frames = 0;
  public time = 0;
  public cropWidth = 16;
  public cropHeight = 16;

  constructor(position: Vector2D) {
    super(
      ImageUtils.createImage(explosionSrc),
      14,
      14,
      new Vector2D(0, 0),
      position,
    );
  }

  public update(ctx: CanvasRenderingContext2D): void {
    this.time++;

    // TODO: vericar se essa lógica de troca de fram es a cada periodo de tempo pode ser melhorada
    if (this.time % 6 == 0) {
      this.frames++;
    }

    if (this.frames <= 5) {
      this.draw(ctx);
    }
  }

  public draw(ctx: CanvasRenderingContext2D): void {
    ctx.drawImage(
      this.image,
      this.cropWidth * this.frames,
      this.cropHeight * 0,
      this.cropWidth,
      this.cropHeight,
      this.position.x,
      this.position.y,
      this.width * 3,
      this.height * 3,
    );
  }
}
