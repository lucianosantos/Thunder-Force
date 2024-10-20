let score = 0;

function drawScore() {
    ctx.font = '20px Arial';
    ctx.fillStyle = 'white';
    ctx.textAlign = 'right'; // Align text to the right
    ctx.fillText(`Score: ${score}`, canvas.width - 10, 30); // Draw score in the top-right corner
}
