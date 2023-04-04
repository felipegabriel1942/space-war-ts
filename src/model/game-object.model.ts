import type { Vector2D } from './vector-2d.model';

export abstract class GameObject {
  image: HTMLImageElement;
  width: number;
  height: number;
  velocity: Vector2D;
  position: Vector2D;

  public constructor(
    image: HTMLImageElement,
    width: number,
    height: number,
    velocity: Vector2D,
    position: Vector2D,
  ) {
    this.image = image;
    this.width = width;
    this.height = height;
    this.velocity = velocity;
    this.position = position;
  }

  public abstract draw(ctx: CanvasRenderingContext2D): void;
  public abstract update(ctx: CanvasRenderingContext2D): void;
}
