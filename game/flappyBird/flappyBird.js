const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Load images
const bird = new Image();
const bg = new Image();
const fg = new Image();
const pipeNorth = new Image();
const pipeSouth = new Image();

bird.src = 'images/bird.png';
bg.src = 'images/bg.png';
fg.src = 'images/fg.png';
pipeNorth.src = 'images/pipeNorth.png';
pipeSouth.src = 'images/pipeSouth.png';

const gap = 85;
const constant = pipeNorth.height + gap;

let bX = 10;
let bY = 150;

const gravity = 1.5;

const fly = new Audio();
const scor = new Audio();

fly.src = 'sounds/fly.mp3';
scor.src = 'sounds/score.mp3';

document.addEventListener('keydown', moveUp);

function moveUp() {
    bY -= 25;
    fly.play();
}

const pipe = [];

pipe[0] = {
    x: canvas.width,
    y: 0
};

let score = 0;

function draw() {
    ctx.drawImage(bg, 0, 0);

    for (let i = 0; i < pipe.length; i++) {
        ctx.drawImage(pipeNorth, pipe[i].x, pipe[i].y);
        ctx.drawImage(pipeSouth, pipe[i].x, pipe[i].y + constant);

        pipe[i].x--;

        if (pipe[i].x == 125) {
            pipe.push({
                x: canvas.width,
                y: Math.floor(Math.random() * pipeNorth.height) - pipeNorth.height
            });
        }

        if (bX + bird.width >= pipe[i].x && bX <= pipe[i].x + pipeNorth.width && (bY <= pipe[i].y + pipeNorth.height || bY + bird.height >= pipe[i].y + constant) || bY + bird.height >= canvas.height - fg.height) {
            location.reload(); // reload the page
        }

        if (pipe[i].x == 5) {
            score++;
            scor.play();
        }
    }

    ctx.drawImage(fg, 0, canvas.height - fg.height);

    ctx.drawImage(bird, bX, bY);

    bY += gravity;

    ctx.fillStyle = "#000";
    ctx.font = "20px Verdana";
    ctx.fillText("Score : " + score, 10, canvas.height - 20);

    requestAnimationFrame(draw);
}

draw();
