import { GameObject } from './game-object.model';
import { ImageUtils } from './../utils/image.util';

import playerShip from '../assets/image/playerShip.png';
import { Vector2D } from './vector-2d.model';

export class Player extends GameObject {
  public frames = 0;
  public time = 0;

  constructor() {
    super(
      ImageUtils.createImage(playerShip),
      35,
      55,
      new Vector2D(0, 0),
      new Vector2D(1024 / 2, 576 - 55),
    );
  }

  public update(ctx: CanvasRenderingContext2D): void {
    this.time++;

    if (this.time % 6 == 0) {
      this.frames++;
    }

    if (this.frames >= 2) {
      this.frames = 0;
    }

    this.draw(ctx);
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
  }

  public draw(ctx: CanvasRenderingContext2D): void {
    ctx.drawImage(
      this.image,
      32,
      24 * this.frames,
      16,
      24,
      this.position.x,
      this.position.y,
      this.width,
      this.height,
    );
  }
}
