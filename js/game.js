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
    drawExplosions(); // Add this to ensure explosions are drawn
    drawPlayer();
    drawEnemies();
    drawBullets();
    requestAnimationFrame(gameLoop);
}

gameLoop();
