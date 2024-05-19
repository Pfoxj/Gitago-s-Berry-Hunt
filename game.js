const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const collectSound = document.getElementById('collectSound');

const wolf = {
    x: 50,
    y: 50,
    width: 50,
    height: 50,
    speed: 5
};

const berries = [];
const berryCount = 10;
let score = 0;

function createBerries() {
    for (let i = 0; i < berryCount; i++) {
        berries.push({
            x: Math.random() * (canvas.width - 20),
            y: Math.random() * (canvas.height - 20),
            width: 20,
            height: 20
        });
    }
}

function drawWolf() {
    ctx.fillStyle = 'gray';
    ctx.fillRect(wolf.x, wolf.y, wolf.width, wolf.height);
}

function drawBerries() {
    ctx.fillStyle = 'red';
    berries.forEach(berry => {
        ctx.fillRect(berry.x, berry.y, berry.width, berry.height);
    });
}

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function checkCollision(rect1, rect2) {
    return rect1.x < rect2.x + rect2.width &&
           rect1.x + rect1.width > rect2.x &&
           rect1.y < rect2.y + rect2.height &&
           rect1.y + rect1.height > rect2.y;
}

function update() {
    clearCanvas();
    drawWolf();
    drawBerries();
    berries.forEach((berry, index) => {
        if (checkCollision(wolf, berry)) {
            berries.splice(index, 1);
            score++;
            console.log('Score:', score);
            collectSound.play();
        }
    });

    if (berries.length === 0) {
        alert(`You collected all the berries! Your score: ${score}`);
        createBerries();
        score = 0;
    }

    requestAnimationFrame(update);
}

document.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'ArrowUp':
            if (wolf.y > 0) wolf.y -= wolf.speed;
            break;
        case 'ArrowDown':
            if (wolf.y < canvas.height - wolf.height) wolf.y += wolf.speed;
            break;
        case 'ArrowLeft':
            if (wolf.x > 0) wolf.x -= wolf.speed;
            break;
        case 'ArrowRight':
            if (wolf.x < canvas.width - wolf.width) wolf.x += wolf.speed;
            break;
    }
});

createBerries();
update();
