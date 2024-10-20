// Load resources
const backgroundImg = new Image();
backgroundImg.src = 'img/sky.gif';

const backgroundMusic = new Audio('sounds/music-for-arcade-style-game.mp3');
backgroundMusic.loop = true;
backgroundMusic.volume = 0.8;

function startBackgroundMusic() {
    if (backgroundMusic.paused) {
        backgroundMusic.play().catch((err) => {
            console.log('Background music autoplay prevented:', err);
        });
    }
}

window.addEventListener('click', startBackgroundMusic);
window.addEventListener('keydown', startBackgroundMusic);

let backgroundX = 0;
const backgroundSpeed = 2;

function drawBackground() {
    backgroundX -= backgroundSpeed;
    if (backgroundX <= -canvas.width) {
        backgroundX = 0;
    }
    ctx.drawImage(backgroundImg, backgroundX, 0, canvas.width, canvas.height);
    ctx.drawImage(
        backgroundImg,
        backgroundX + canvas.width,
        0,
        canvas.width,
        canvas.height
    );
}

// Main game loop
function gameLoop() {
    drawBackground();
    updatePlayer();
    updateEnemies();
    updateBullets();
    checkCollisions();
    drawExplosions();
    drawPlayer();
    drawEnemies();
    drawBullets();
    drawLives(); // Draw lives in top-left
    drawScore(); // Draw score in top-right
    requestAnimationFrame(gameLoop);
}

gameLoop();
