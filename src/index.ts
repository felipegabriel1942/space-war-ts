import { Vector2D } from './model/vector-2d.model';
import { Player } from './model/player.model';
import { Projectile } from './model/projectile.model';
import { Enemy } from './model/enemy.model';
import { Explosion } from './model/explosion.model';

import { CollisionUtils } from './utils/collision.utils';
import type { EnemyProjectile } from './model/enemy-projectile.model';

// Link dos Assets: https://ansimuz.itch.io/spaceship-shooter-environment

// TODO: criar classe com padrão singleton para armazenar as variaveis globais
// e para controlar o estado do jogo
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

const game = {
  over: false,
  active: true,
};

let projectiles: Array<Projectile> = [];
let enemies: Array<Enemy> = [];
let explosions: Array<Explosion> = [];
let frames = 0;
let enemyProjectiles: Array<EnemyProjectile> = [];

function runGameLoop(): void {
  if (game.active) {
    requestAnimationFrame(() => {
      runGame();
      runGameLoop();
    });
  }
}

function runGame(): void {
  runAnimation();
}

function runAnimation(): void {
  clearCanvas();
  spawnEnemies();
  createEnemyProjectiles();
  detectCollisions();
  movePlayer();
  drawGameObjects();
}

function spawnEnemies(): void {
  if (frames % 100 === 0 && canvas) {
    const position = new Vector2D(
      Math.floor(Math.random() * canvas?.width - 60),
      30,
    );
    enemies.push(new Enemy(position));
    frames = 0;
  }

  frames++;
}

function createEnemyProjectiles(): void {
  if (frames % 50 === 0 && enemies.length > 0) {
    enemies[Math.floor(Math.random() * enemies.length)].shoot(enemyProjectiles);
  }
}

function detectCollisions(): void {
  detectEnemyCollisions();
  detectEnemyProjectileCollisions();
  detectProjectileCollisions();
}

function detectEnemyCollisions(): void {
  enemies.forEach((enemy, i) => {
    if (CollisionUtils.rectangularCollision(player, enemy)) {
      enemies.splice(i, 1);
      player.opacity = 0;
      game.over = true;

      setTimeout(() => {
        game.active = !game.over;
      }, 1000);

      explosions.push(new Explosion(player.position));
    }
  });
}

function detectProjectileCollisions(): void {
  enemies.forEach((enemy, i) => {
    projectiles.forEach((projectile, x) => {
      if (CollisionUtils.rectangularCollision(projectile, enemy)) {
        const { position } = enemies[i];

        explosions.push(new Explosion(new Vector2D(position.x, position.y)));

        enemies.splice(i, 1);
        projectiles.splice(x, 1);
      }
    });
  });
}

function detectEnemyProjectileCollisions(): void {
  enemyProjectiles.forEach((ep, i) => {
    if (CollisionUtils.rectangularCollision(ep, player)) {
      enemyProjectiles.splice(i, 1);
      player.opacity = 0;
      game.over = true;

      setTimeout(() => {
        game.active = !game.over;
      }, 1000);

      explosions.push(new Explosion(player.position));
    }
  });
}

function clearCanvas(): void {
  if (canvas) {
    ctx?.fillRect(0, 0, canvas?.width, canvas?.height);
  }
}

function drawGameObjects(): void {
  drawExplosions();
  drawProjectiles();
  drawEnemyProjectiles();
  drawEnemies();
  drawPlayer();
}

function drawExplosions(): void {
  if (ctx) {
    explosions.forEach((e) => e.update(ctx));
  }
}

function drawProjectiles(): void {
  if (ctx) {
    projectiles.forEach((p) => p.update(ctx));
    projectiles = projectiles.filter((p) => p.position.y > 0);
  }
}

function drawEnemies(): void {
  if (ctx && canvas) {
    enemies.forEach((enemy) => {
      enemy.position.y += enemy.speed;
      enemy.update(ctx);
    });

    enemies = enemies.filter((enemy) => enemy.position.y < canvas?.height);
  }
}

function drawPlayer(): void {
  if (ctx) {
    player.update(ctx);
  }
}

function movePlayer(): void {
  if (!canvas || game.over) {
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
}

function drawEnemyProjectiles(): void {
  if (ctx && canvas) {
    enemyProjectiles.forEach((e) => e.update(ctx));
    enemyProjectiles = enemyProjectiles.filter(
      (ep) => ep.position.y <= canvas?.height - ep.height,
    );
  }
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

      if (!game.over) {
        // TODO: Isso precisa ser movido para outro local
        const position = new Vector2D(
          player.position.x,
          player.position.y - 50,
        );
        projectiles.push(new Projectile(position));
      }

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
