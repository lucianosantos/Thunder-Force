// Load resources
const backgroundImg = new Image();
backgroundImg.src = 'img/sky.gif';
/*
const backgroundMusic = new Audio('assets/background-music.mp3');
backgroundMusic.loop = true;
backgroundMusic.play();
*/
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
