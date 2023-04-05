import { GameObject } from './game-object.model';
import { Vector2D } from './vector-2d.model';
import { EnemyProjectile } from './enemy-projectile.model';

import { ImageUtils } from './../utils/image.util';

import enemySmallSrc from '../assets/image/enemySmall.png';

// TODO: Corrigir logicas de tamanho das imagens
export class Enemy extends GameObject {
  public frames = 0;
  public time = 0;
  public speed = 2;
  public cropWidth = 16;
  public cropHeight = 16;

  constructor(position: Vector2D) {
    super(
      ImageUtils.createImage(enemySmallSrc),
      16,
      16,
      new Vector2D(0, 0),
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

    if (this.frames > 1) {
      this.frames = 0;
    }

    this.draw(ctx);
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

  public shoot(projectiles: Array<EnemyProjectile>) {
    const position = new Vector2D(
      this.position.x + this.width / 2,
      this.position.y + this.height,
    );

    projectiles.push(new EnemyProjectile(position));
  }
}
