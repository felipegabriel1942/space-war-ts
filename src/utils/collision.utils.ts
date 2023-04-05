export class CollisionUtils {
  static rectangularCollision(rect1: any, rect2: any): boolean {
    return (
      rect1.position.y <= rect2.position.y + rect2.height &&
      rect1.position.x + rect1.width / 2 >= rect2.position.x &&
      rect1.position.x - rect1.width / 2 <= rect2.position.x + rect2.width &&
      rect1.position.y + rect1.height / 2 >= rect2.position.y
    );
  }
}
