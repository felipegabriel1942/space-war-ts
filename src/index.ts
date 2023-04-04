import { Vector2D } from './model/vector-2d.model';
import { Player } from './model/player.model';
import { Projectil } from './model/projectil.model';

// Link dos Assets: https://ansimuz.itch.io/spaceship-shooter-environment

const canvas = document.querySelector<HTMLCanvasElement>('canvas');

if (canvas) {
  canvas.width = 1024;
  canvas.height = 576;
}

const ctx = canvas?.getContext('2d');

const player = new Player();
const keys = {
  a: {
    pressed: false,
  },
  d: {
    pressed: false,
  },
  space: {
    pressed: false,
  },
};

let projectiles: Array<Projectil> = [];

function runGameLoop(): void {
  requestAnimationFrame(() => {
    runGame();
    runGameLoop();
  });
}

function runGame(): void {
  runAnimation();
}

function runAnimation(): void {
  if (!canvas || !ctx) {
    return;
  }

  clearCanvas();
  moveProjectiles();
  movePlayer();
}

function clearCanvas(): void {
  if (canvas) {
    ctx?.fillRect(0, 0, canvas?.width, canvas?.height);
  }
}

function moveProjectiles(): void {
  if (ctx) {
    projectiles.forEach((projectil) => projectil.update(ctx));
    projectiles = projectiles.filter((projectil) => projectil.position.y > 0);
  }
}

function movePlayer(): void {
  if (!canvas || !ctx) {
    return;
  }

  if (keys.a.pressed && player.position.x >= 0) {
    player.velocity.x = -player.speed;
  } else if (
    keys.d.pressed &&
    player.position.x <= canvas.width - player.width
  ) {
    player.velocity.x = player.speed;
  } else {
    player.velocity.x = 0;
  }

  player.update(ctx);
}

// TODO: separar em classes proprias
addEventListener('keydown', ({ key }) => {
  switch (key) {
    case 'a':
      keys.a.pressed = true;
      break;
    case 'd':
      keys.d.pressed = true;
      break;
    case ' ':
      keys.space.pressed = true;

      // TODO: Isso precisa ser movido para outro local
      const position = new Vector2D(player.position.x, player.position.y - 50);
      projectiles.push(new Projectil(position));
      break;
  }
});

addEventListener('keyup', ({ key }) => {
  switch (key) {
    case 'a':
      keys.a.pressed = false;
      break;
    case 'd':
      keys.d.pressed = false;
      break;
    case ' ':
      keys.space.pressed = false;
      break;
  }
});

runGameLoop();
