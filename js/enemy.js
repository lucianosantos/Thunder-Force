const enemyImg = new Image();
enemyImg.src = 'img/inimigo.png';

let enemies = [];
let lastEnemySpawn = 0;

function spawnEnemy() {
    enemies.push({
        x: canvas.width,
        y: Math.random() * (canvas.height - 50),
        width: 50,
        height: 50,
    });
}

function updateEnemies() {
    let now = Date.now();
    if (now - lastEnemySpawn > configs.enemyRespawnTime) {
        spawnEnemy();
        lastEnemySpawn = now;
    }

    enemies.forEach((enemy) => (enemy.x -= 3));
    enemies = enemies.filter((enemy) => enemy.x > -50); // Remove off-screen enemies
}

function drawEnemies() {
    enemies.forEach((enemy) => {
        ctx.drawImage(enemyImg, enemy.x, enemy.y, enemy.width, enemy.height);
    });
}
