// Tic Tac Toe
let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';

const cells = document.querySelectorAll('.cell');
cells.forEach(cell => {
    cell.addEventListener('click', () => {
        const index = cell.getAttribute('data-index');
        if (!board[index] && !checkWinner()) {
            board[index] = currentPlayer;
            cell.textContent = currentPlayer;
            if (checkWinner()) {
                alert(`${currentPlayer} wins!`);
            } else {
                currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            }
        }
    });
});

document.getElementById('reset-tic-tac-toe').addEventListener('click', () => {
    board = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    cells.forEach(cell => cell.textContent = '');
});

// Check for winner
function checkWinner() {
    const winningCombos = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    return winningCombos.some(combo => {
        return board[combo[0]] && board[combo[0]] === board[combo[1]] && board[combo[1]] === board[combo[2]];
    });
}

// Snake Game
const snakeCanvas = document.getElementById('snakeCanvas');
const ctx = snakeCanvas.getContext('2d');
let snake = [{ x: 150, y: 150 }];
let direction = { x: 10, y: 0 };
let food = spawnFood();
let gameInterval;

document.addEventListener('keydown', changeDirection);
document.getElementById('reset-snake').addEventListener('click', resetSnake);
document.getElementById('start-race').addEventListener('click', startRace);

function startSnakeGame() {
    gameInterval = setInterval(() => {
        moveSnake();
        draw();
    }, 100);
}

function resetSnake() {
    clearInterval(gameInterval);
    snake = [{ x: 150, y: 150 }];
    direction = { x: 10, y: 0 };
    food = spawnFood();
    draw();
}

function spawnFood() {
    const x = Math.floor(Math.random() * 30) * 10;
    const y = Math.floor(Math.random() * 30) * 10;
    return { x, y };
}

function changeDirection(event) {
    if (event.key === 'ArrowUp' && direction.y === 0) {
        direction = { x: 0, y: -10 };
    } else if (event.key === 'ArrowDown' && direction.y === 0) {
        direction = { x: 0, y: 10 };
    } else if (event.key === 'ArrowLeft' && direction.x === 0) {
        direction = { x: -10, y: 0 };
    } else if (event.key === 'ArrowRight' && direction.x === 0) {
        direction = { x: 10, y: 0 };
    }
}

function moveSnake() {
    const newHead = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };
    snake.unshift(newHead);
    if (newHead.x === food.x && newHead.y === food.y) {
        food = spawnFood();
    } else {
        snake.pop();
    }
}

function draw() {
    ctx.clearRect(0, 0, snakeCanvas.width, snakeCanvas.height);
    snake.forEach(segment => {
        ctx.fillStyle = 'green';
        ctx.fillRect(segment.x, segment.y, 10, 10);
    });
    ctx.fillStyle = 'red';
    ctx.fillRect(food.x, food.y, 10, 10);
}

// Simple Car Race
function startRace() {
    const car = document.getElementById('car');
    let position = 0;
    const raceInterval = setInterval(() => {
        position += 5;
        car.style.transform = `translateX(${position}px)`;
        if (position > 300) {
            clearInterval(raceInterval);
            alert('Race Finished!');
        }
    }, 100);
}


