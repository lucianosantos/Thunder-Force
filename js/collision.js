const explosionImg = new Image();
explosionImg.src = 'img/explosao.png'; // Path to the explosion sprite sheet

const explosionSound = new Audio('sounds/medium-explosion.mp3');
const playerHitSound = new Audio('sounds/medium-explosion.mp3');

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
                // Bullet hits enemy: Trigger explosion and play explosion sound
                triggerExplosion(enemy.x, enemy.y);

                // Create a new instance of the explosion sound for each explosion
                let explosionSound = new Audio('sounds/medium-explosion.mp3'); // Path to your explosion sound file
                explosionSound.play(); // Play the explosion sound

                score += 5; // Add 5 points for each destroyed enemy
                enemies.splice(enemyIndex, 1); // Remove enemy
                player.bullets.splice(bulletIndex, 1); // Remove bullet
            }
        });

        // Check collision between player and enemies
        if (
            player.isAlive &&
            player.x < enemy.x + enemy.width &&
            player.x + player.width > enemy.x &&
            player.y < enemy.y + enemy.height &&
            player.y + player.height > enemy.y
        ) {
            // Player hit by enemy
            playerHit();

            // Play player hit sound when the player is hit
            let playerHitSound = new Audio('sounds/medium-explosion.mp3'); // Path to player hit sound file
            playerHitSound.play(); // Play the sound when the player is hit

            enemies.splice(enemyIndex, 1); // Remove enemy after collision
        }
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
