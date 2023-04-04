import { GameObject } from './game-object.model';
import { Vector2D } from './vector-2d.model';

import { ImageUtils } from './../utils/image.util';

import laserBolt from '../assets/image/laserBolts.png';

export class Projectil extends GameObject {
  public frames = 0;
  public time = 0;
  public speed = 5;
  public cropWidth = 14;
  public cropHeight = 16;

  constructor(position: Vector2D) {
    super( 
      ImageUtils.createImage(laserBolt),
      40,
      70,
      new Vector2D(0, -7),
      position,
    );
  }

  public update(ctx: CanvasRenderingContext2D): void {
    this.position.y += this.velocity.y;

    this.time++;

    // TODO: vericar se essa lógica de troca de fram es a cada periodo de tempo pode ser melhorada
    if (this.time % 6 == 0) {
      this.frames++;
    }

    if (this.frames >= 2) {
      this.frames = 0;
    }

    this.draw(ctx);
  }

  public draw(ctx: CanvasRenderingContext2D): void {
    ctx.drawImage(
      this.image,
      this.cropWidth * this.frames,
      this.cropHeight,
      this.cropWidth,
      this.cropHeight,
      this.position.x,
      this.position.y,
      this.width,
      this.height,
    );
  }
}
