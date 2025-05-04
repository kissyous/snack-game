// 定义画布和上下文
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// 定义画布大小和方块大小
const canvasSize = 400;
const blockSize = 20;
const gridSize = canvasSize / blockSize;

// 设置画布大小
canvas.width = canvasSize;
canvas.height = canvasSize;

// 定义蛇的初始位置和方向
let snake = [
    { x: 10, y: 10 }
];
let direction = 'right';

// 定义食物的初始位置
let food = {
    x: Math.floor(Math.random() * gridSize),
    y: Math.floor(Math.random() * gridSize)
};

// 定义游戏循环
function gameLoop() {
    // 清除画布
    ctx.clearRect(0, 0, canvasSize, canvasSize);

    // 绘制蛇
    ctx.fillStyle = 'green';
    snake.forEach(segment => {
        ctx.fillRect(segment.x * blockSize, segment.y * blockSize, blockSize, blockSize);
    });

    // 绘制食物
    ctx.fillStyle = 'red';
    ctx.fillRect(food.x * blockSize, food.y * blockSize, blockSize, blockSize);

    // 移动蛇
    let head = { ...snake[0] };
    switch (direction) {
        case 'up':
            head.y--;
            break;
        case 'down':
            head.y++;
            break;
        case 'left':
            head.x--;
            break;
        case 'right':
            head.x++;
            break;
    }
    snake.unshift(head);

    // 检查是否吃到食物
    if (head.x === food.x && head.y === food.y) {
        // 生成新的食物
        food = {
            x: Math.floor(Math.random() * (gridSize - 2)) + 1,
            y: Math.floor(Math.random() * (gridSize - 2)) + 1
        };
    } else {
        // 移除蛇的尾部
        snake.pop();
    }

    // 检查是否撞到边界或自己
    if (head.x < 0 || head.x >= gridSize || head.y < 0 || head.y >= gridSize) {
        // 游戏结束
        alert('游戏结束！');
        location.reload();
    }
    // 检查蛇头是否与身体碰撞
    let collision = false;
    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            collision = true;
            break;
        }
    }
    if (collision) {
        // 游戏结束
        alert('游戏结束！');
        location.reload();
    }

    // 定时调用游戏循环
    setTimeout(gameLoop, 115);
}

// 监听键盘事件
document.addEventListener('keydown', function (event) {
    switch (event.key) {
        case 'ArrowUp':
            if (direction !== 'down') direction = 'up';
            break;
        case 'ArrowDown':
            if (direction !== 'up') direction = 'down';
            break;
        case 'ArrowLeft':
            if (direction !== 'right') direction = 'left';
            break;
        case 'ArrowRight':
            if (direction !== 'left') direction = 'right';
            break;
    }
});

// 启动游戏循环
gameLoop();