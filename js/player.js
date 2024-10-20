const playerImg = new Image();
playerImg.src = 'img/nave.png';

let player = {
    x: 50,
    y: canvas.height / 2 - 25,
    width: 50,
    height: 50,
    speed: 5,
    bullets: [],
    lastShootTime: 0,
};

const bulletImg = new Image();
bulletImg.src = 'img/tiro.jpg';

const shootSound = new Audio('sounds/tiro.wav');

// You need to add the 'keys' object globally, either in game.js or here
let keys = {}; // Define keys to track user input

window.addEventListener('keydown', function (e) {
    keys[e.key] = true;
});
window.addEventListener('keyup', function (e) {
    keys[e.key] = false;
});

function updatePlayer() {
    if (keys['ArrowUp'] && player.y > 0) player.y -= player.speed;
    if (keys['ArrowDown'] && player.y < canvas.height - player.height)
        player.y += player.speed;

    let now = Date.now();
    if ((keys[' '] || keys['Spacebar']) && now - player.lastShootTime > 500) {
        player.bullets.push({
            x: player.x + player.width,
            y: player.y + player.height / 2,
            width: 5,
            height: 2,
        });
        shootSound.play();
        player.lastShootTime = now;
    }
}

function updateBullets() {
    player.bullets = player.bullets.filter(
        (bullet) => bullet.x <= canvas.width
    );
    player.bullets.forEach((bullet) => (bullet.x += 10));
}

function drawPlayer() {
    ctx.drawImage(playerImg, player.x, player.y, player.width, player.height);
}

function drawBullets() {
    player.bullets.forEach((bullet) => {
        ctx.drawImage(bulletImg, bullet.x, bullet.y, 10, 10);
    });
}
