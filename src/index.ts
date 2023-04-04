import { Player } from './model/player.model';

const canvas = document.querySelector<HTMLCanvasElement>('canvas');

if (canvas) {
  canvas.width = 1024;
  canvas.height = 576;
}

const ctx = canvas?.getContext('2d');

const player = new Player();

function runGame(): void {
  requestAnimationFrame(runGame);

  if (!canvas || !ctx) {
    return;
  }

  ctx?.fillRect(0, 0, canvas?.width, canvas?.height);

  player.update(ctx);
}

runGame();
