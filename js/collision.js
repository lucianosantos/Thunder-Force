const explosionImg = new Image();
explosionImg.src = 'img/explosao.png'; // Path to the explosion sprite sheet

let explosions = []; // To keep track of all active explosions

// Explosion frame details
const frameWidth = 64;
const frameHeight = 64;
const numExplosionFrames = 9;
const frameDuration = 100; // Time each frame is shown in ms

function checkCollisions() {
    enemies.forEach((enemy, enemyIndex) => {
        player.bullets.forEach((bullet, bulletIndex) => {
            if (
                bullet.x < enemy.x + enemy.width &&
                bullet.x + bullet.width > enemy.x &&
                bullet.y < enemy.y + enemy.height &&
                bullet.y + bullet.height > enemy.y
            ) {
                // Bullet hits enemy: Trigger explosion
                triggerExplosion(enemy.x, enemy.y);
                enemies.splice(enemyIndex, 1); // Remove enemy
                player.bullets.splice(bulletIndex, 1); // Remove bullet
            }
        });
    });
}

function triggerExplosion(x, y) {
    const explosion = {
        x: x,
        y: y,
        frameIndex: 0, // Start from the first frame of the sprite
        startTime: Date.now(),
    };
    explosions.push(explosion);
}

function drawExplosions() {
    const now = Date.now();

    // Filter out explosions that have completed
    explosions = explosions.filter((explosion) => {
        const elapsed = now - explosion.startTime;
        const currentFrame = Math.floor(elapsed / frameDuration);

        if (currentFrame < numExplosionFrames) {
            explosion.frameIndex = currentFrame;
            const sx = explosion.frameIndex * frameWidth; // X position on the sprite sheet
            ctx.drawImage(
                explosionImg,
                sx,
                0,
                frameWidth,
                frameHeight,
                explosion.x,
                explosion.y,
                50,
                50
            );
            return true; // Keep this explosion in the array
        }

        // Explosion is done, remove it
        return false;
    });
}
