// Load the player ship image
const playerImg = new Image();
playerImg.src = 'img/nave.png';

// Additional variable to handle blinking state
let isBlinking = false;
let blinkSpeed = 50;

// Define the player object with initial properties
let player = {
    x: 50,
    y: canvas.height / 2 - 25,
    width: 50,
    height: 50,
    speed: 5,
    bullets: [],
    lastShootTime: 0,
    lives: 3, // Player starts with 3 lives
    isAlive: true, // Track if player is alive
};

// Load the bullet image
const bulletImg = new Image();
bulletImg.src = 'img/tiro.jpg';

// Track which keys are pressed
let keys = {};

// Listen for keyboard input
window.addEventListener('keydown', function (e) {
    keys[e.key] = true;
});
window.addEventListener('keyup', function (e) {
    keys[e.key] = false;
});

// Update player movement and shooting
function updatePlayer() {
    if (player.isAlive) {
        if (keys['ArrowUp'] && player.y > 0) player.y -= player.speed;
        if (keys['ArrowDown'] && player.y < canvas.height - player.height)
            player.y += player.speed;

        let now = Date.now();
        if (
            (keys[' '] || keys['Spacebar']) &&
            now - player.lastShootTime > 500
        ) {
            // Fire a bullet and reset shoot time
            player.bullets.push({
                x: player.x + player.width,
                y: player.y + player.height / 2,
                width: 5,
                height: 2,
            });
            player.lastShootTime = now;
        }
    }
}

// Function to draw player
function drawPlayer() {
    if (player.isAlive) {
        if (!isBlinking || Math.floor(Date.now() / blinkSpeed) % 2 === 0) {
            // Only draw the player when not blinking or every other 200ms during blinking
            ctx.drawImage(
                playerImg,
                player.x,
                player.y,
                player.width,
                player.height
            );
        }
    }
}

// Update bullets
function updateBullets() {
    // Remove bullets that are off-screen
    player.bullets = player.bullets.filter(
        (bullet) => bullet.x <= canvas.width
    );

    // Move each bullet forward
    player.bullets.forEach((bullet) => (bullet.x += 10));
}

// Draw bullets
function drawBullets() {
    player.bullets.forEach((bullet) => {
        ctx.drawImage(bulletImg, bullet.x, bullet.y, 10, 10);
    });
}

// Update playerHit to include respawn and blinking
function playerHit() {
    player.isAlive = false; // Mark player as not alive
    player.lives--;

    if (player.lives <= 0) {
        // Player is out of lives, game over logic can go here
        triggerExplosion(player.x, player.y); // Explosion effect
    } else {
        // Trigger explosion and respawn
        triggerExplosion(player.x, player.y); // Explosion effect
        setTimeout(respawnPlayer, 2000); // Respawn after 2 seconds
    }
}

function respawnPlayer() {
    player.x = 50; // Reset player position
    player.y = canvas.height / 2 - 25;
    player.isAlive = true;
    isBlinking = true; // Start blinking effect
    startBlinking(); // Call the blinking function for 5 seconds
}

// Function to make the player blink for 5 seconds
function startBlinking() {
    let blinkDuration = 5000; // Blinking lasts 5 seconds
    let blinkInterval = blinkSpeed; // Toggle visibility every 200ms
    let blinkStartTime = Date.now();

    let blinkTimer = setInterval(() => {
        let elapsed = Date.now() - blinkStartTime;
        if (elapsed >= blinkDuration) {
            // Stop blinking after 5 seconds
            clearInterval(blinkTimer);
            isBlinking = false;
        }
    }, blinkInterval);
}

// Draw player lives in the top left corner
function drawLives() {
    ctx.font = '20px Arial';
    ctx.fillStyle = 'white';
    ctx.fillText(`Lives: ${player.lives}`, 10, 30); // Display lives at top left corner
}
