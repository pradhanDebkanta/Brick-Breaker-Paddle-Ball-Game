const scoreContainer = document.querySelector('.score-container');
const gameContainer = document.querySelector('.game-container');
const startScreen = document.querySelector('.startScreen');
const gameArea = document.querySelector('.gameArea');
let gameAreaDim;

let isStart = false;
let isGamePlay = false;
let lHScore = 0;

if (window.localStorage.getItem('hScore')) {
    lHScore = window.localStorage.getItem('hScore');
} else {
    window.localStorage.setItem('hScore', 0);
    lHScore = 0;
}

const player = {
    score: 0,
    live: 3,
    highestScore: lHScore,
    speed: 7,
    ballSpeed: [2, -5],
}
const keys = {
    ArrowLeft: false,
    ArrowRight: false,
}
const brikeData = {
    height: 50,
    width: 100,
}

startScreen.addEventListener('click', startGame);

function keyListen() {
    document.addEventListener('keydown', (e) => {
        e.preventDefault();
        if (isStart) {
            if (e.keyCode === 38 && (!isGamePlay)) {
                isGamePlay = true;
                // console.log('game played by up arrow');
            }
        }
        if (e.keyCode === 37) {
            keys.ArrowLeft = true;
        }
        if (e.keyCode === 39) {
            keys.ArrowRight = true;
        }

    });
    document.addEventListener('keyup', (e) => {
        e.preventDefault();
        if (e.keyCode === 37) {
            keys.ArrowLeft = false;
        }
        if (e.keyCode === 39) {
            keys.ArrowRight = false;
        }
    });
}
function paddleControl() {
    let dirControlBox = document.createElement('div');
    let upArr = document.createElement('div');
    let rightArr = document.createElement('div');
    let leftArr = document.createElement('div');
    upArr.innerHTML = `<i class="fas fa-chevron-up c_arrow1"></i>`;
    rightArr.innerHTML = `<i class="fas fa-chevron-right c_arrow2"></i>`;
    leftArr.innerHTML = `<i class="fas fa-chevron-left c_arrow4"></i>`;

    dirControlBox.setAttribute('class', 'dir-control-box');
    upArr.setAttribute('class', 'up_arrow_box');
    rightArr.setAttribute('class', 'right_arrow_box');
    leftArr.setAttribute('class', 'left_arrow_box');
    dirControlBox.appendChild(upArr);
    dirControlBox.appendChild(leftArr);
    dirControlBox.appendChild(rightArr);
    gameContainer.appendChild(dirControlBox);

    // up arrow event 
    upArr.addEventListener('click', () => {
        if (isStart) {
            if (!isGamePlay) {
                isGamePlay = true;
                // console.log('game played by up arrow');
            }
            upArr.classList.add('play_btn');
            if (isGamePlay) {
                let cArrowUp = document.querySelector('.c_arrow1');
                cArrowUp.style.cursor = 'not-allowed';
            }
        }
    }, false);

    // right arrow event 
    rightArr.addEventListener('pointerdown', () => {
        keys.ArrowRight = true;
        rightArr.classList.add('border_class');
    }, false);
    rightArr.addEventListener('pointerup', () => {
        keys.ArrowRight = false;
        rightArr.classList.remove('border_class');
    }, false);

    // left arrow event
    leftArr.addEventListener('pointerdown', () => {
        keys.ArrowLeft = true;
        leftArr.classList.add('border_class');

    }, false);
    leftArr.addEventListener('pointerup', () => {
        keys.ArrowLeft = false;
        leftArr.classList.remove('border_class');
    }, false);
}
function paddleMove() {
    let paddle = document.querySelector('.paddle');
    let ball = document.querySelector('.ball');
    let cPaddle = paddle.offsetLeft;
    if (!isGamePlay) {
        ball.style.left = cPaddle + 'px';
        ball.style.top = paddle.offsetTop - 27 + 'px';
        ball.style.transform = 'translate(-50%, 0)';
    }

    if (keys.ArrowRight) {
        cPaddle = cPaddle + 52 > (gameAreaDim.right - 4) ? cPaddle : cPaddle + player.speed;
    }
    if (keys.ArrowLeft) {
        cPaddle = cPaddle - 52 < (gameAreaDim.left + 4) ? cPaddle : cPaddle - player.speed;
    }
    paddle.style.left = cPaddle + 'px';
    if (isGamePlay) {
        moveBall();
    }
    if (isStart) {
        window.requestAnimationFrame(paddleMove);
    }
}

function brikeConstruct(brikeNum) {

    let leftRelPos = gameAreaDim.left + 4;
    let row = {
        x: ((gameAreaDim.width) % brikeData.width) / 2,
        y: gameAreaDim.y + 20,
    };
    for (let i = 0; i < brikeNum; i++) {
        if (row.x > (gameAreaDim.width - brikeData.width)) {
            // console.log('inside')
            row.y += brikeData.height;
            row.x = ((gameAreaDim.width) % brikeData.width) / 2;
        }
        // console.log(row.x, row.y);

        let brike = document.createElement('div');
        brike.setAttribute('class', 'brike');
        brike.style.left = row.x + leftRelPos + 'px';
        brike.style.top = row.y + 'px';
        let randColor = '#' + Math.random().toString(16).substr(-6);
        brike.style.backgroundColor = randColor;
        brike.style.borderColor = randColor;
        brike.innerText = i + 1;
        if (row.y > ((gameAreaDim.height / 2.5) + gameAreaDim.y)) return;
        gameArea.appendChild(brike);
        row.x += brikeData.width;

    }
}

function fallOff() {
    player.live--;
    isGamePlay = false;
    // console.log(player);
    scoreUpdate();
    if (player.live > 0) {
        player.ballSpeed = [2, -5];
        let brikes = document.querySelectorAll('.brike');
        for (let i = 0; i < brikes.length; i++) {
            brikes[i].remove();
        }
        brikeConstruct(60);
    }
    if (player.live <= 0) {
        gameOver();
    }
}

function gameOver() {
    console.log('game over');
    isStart = false;

    if (window.localStorage.getItem('hScore') < player.score) {
        window.localStorage.setItem('hScore', player.score);
    }
    let gameOverContainer = document.createElement('div');
    let modalBody = document.createElement('div');
    let modalHeading = document.createElement('div');
    let modalContent = document.createElement('div');
    let replayBtn = document.createElement('button');
    let cancleBtn = document.createElement('button');

    gameOverContainer.setAttribute('class', 'game-over-container');
    modalBody.setAttribute('class', 'modal-body');
    modalHeading.setAttribute('class', 'modal-heading');
    modalContent.setAttribute('class', 'modal-content');
    replayBtn.setAttribute('class', 'modal-btn replay-btn');
    cancleBtn.setAttribute('class', 'modal-btn cancle-btn');
    modalHeading.innerHTML = `Game Over!!! <br/> Score : ${player.score}`;
    replayBtn.innerText = 'Replay';
    cancleBtn.innerText = 'Cancle';

    modalBody.appendChild(modalHeading);
    modalContent.appendChild(replayBtn);
    modalContent.appendChild(cancleBtn);
    modalBody.appendChild(modalContent);
    gameOverContainer.appendChild(modalBody);
    let container = document.querySelector('.container');
    container.appendChild(gameOverContainer);

    cancleBtn.addEventListener('click', () => {
        gameOverContainer.remove();
        returnHome();
    });
    replayBtn.addEventListener('click', () => {
        isStart = true;

        lHScore = window.localStorage.getItem('hScore');
        player.highestScore = lHScore;
        player.score = 0;
        player.live = 3;
        player.ballSpeed = [2, -5];
        let brikes = document.querySelectorAll('.brike');
        for (let i = 0; i < brikes.length; i++) {
            brikes[i].remove();
        }
        scoreUpdate();
        brikeConstruct(60);
        gameOverContainer.remove();
        window.requestAnimationFrame(paddleMove);

    });
}
function returnHome() {
    console.log('home');
    isStart = false;
    lHScore = window.localStorage.getItem('hScore');
    player.highestScore = lHScore;
    player.score = 0;
    player.live = 3;
    player.ballSpeed = [2, -5];
    scoreContainer.innerHTML = '';
    scoreContainer.style.padding = 0;
    gameArea.innerHTML = '';
    gameArea.classList.add('hide');
    let dirControlBox = document.querySelector('.dir-control-box');
    dirControlBox.remove();
    isStart = false;
    startScreen.classList.remove('hide');
}

function reStart() {
    console.log('brick end');
    isStart = false;

    let restartContainer = document.createElement('div');
    let modalBody = document.createElement('div');
    let modalHeading = document.createElement('div');
    let modalContent = document.createElement('div');
    let okBtn = document.createElement('button');

    restartContainer.setAttribute('class', 'restart-container');
    modalBody.setAttribute('class', 'modal-body');
    modalHeading.setAttribute('class', 'modal-heading');
    modalContent.setAttribute('class', 'modal-content');
    okBtn.setAttribute('class', 'modal-btn replay-btn');
    modalHeading.innerHTML = `You break all bricks!!! <br/> Score : ${player.score} Live: ${player.live}`;
    okBtn.innerText = 'OK!!';
    modalBody.appendChild(modalHeading);
    modalContent.appendChild(okBtn);
    modalBody.appendChild(modalContent);
    restartContainer.appendChild(modalBody);
    let container = document.querySelector('.container');
    container.appendChild(restartContainer);

    okBtn.addEventListener('click', () => {
        isStart = true;
        isGamePlay = false;
        restartContainer.remove();
        brikeConstruct(60);
        window.requestAnimationFrame(paddleMove);

    })


}

function moveBall() {
    let ball = document.querySelector('.ball');
    let paddle = document.querySelector('.paddle');
    let ballDim = {
        x: ball.offsetLeft,
        y: ball.offsetTop,
    }
    if (ballDim.y < (gameAreaDim.top + 5) || ((ballDim.y + 25) > (gameAreaDim.bottom - 5))) {   //border 4px & some fraction add in gameAreaDim
        if ((ballDim.y + 25) > (gameAreaDim.bottom - 5)) {
            // console.log('bottom touch');
            fallOff();
        } else {
            player.ballSpeed[1] *= -1;  // [1] for vertical

        }
    }
    if (ballDim.x < (gameAreaDim.left + 5) || ((ballDim.x + 25) > (gameAreaDim.right - 5))) {
        player.ballSpeed[0] *= -1;      //[0] for horigental
    }

    if (isCollide(paddle, ball)) {
        let temp = ((ballDim.x - paddle.offsetLeft) - (paddle.offsetWidth / 2)) / 10;
        player.ballSpeed[1] *= -1;
        player.ballSpeed[0] = temp;
        // console.log('new hit', temp);
    }
    let brikes = document.querySelectorAll('.brike');
    if (brikes.length === 0) {
        reStart();
    }
    for (let i = 0; i < brikes.length; i++) {
        if (isCollide(brikes[i], ball)) {
            brikes[i].remove();
            player.score += 2;
            scoreUpdate();
            player.ballSpeed[1] *= -1;  // [1] for vertical
            // console.log('cut')
        }
    }
    ballDim.x += player.ballSpeed[0];
    ballDim.y += player.ballSpeed[1];
    ball.style.left = ballDim.x + 'px';
    ball.style.top = ballDim.y + 'px';


}

function isCollide(a, b) {
    let aRect = a.getBoundingClientRect();  //paddle
    let bRect = b.getBoundingClientRect();  //ball
    return !((bRect.bottom < aRect.top) || (bRect.top > aRect.bottom) || (bRect.right < aRect.left) || (bRect.left > aRect.right));
}

function scoreUpdate() {
    let point = document.querySelector('.point');
    let livePoint = document.querySelector('.livePoint');
    let hScore = document.querySelector('.h-score');
    point.innerText = player.score;
    livePoint.innerText = player.live;
    hScore.innerText = player.highestScore;
}

function startGame() {
    console.log('start game');

    isStart = true;
    startScreen.classList.add('hide');
    scoreContainer.innerHTML =
        `Score : <span class="score point">${player.score}</span> <span class="live"> Live : <span class="score livePoint">${player.live}</span></span>
     <span class="highest-score"> Highest Score: <span class="h-score">${player.highestScore}</span></span> `;
    scoreContainer.style.padding = 1 + 'rem';
    gameArea.classList.remove('hide');
    let paddle = document.createElement('div');
    let ball = document.createElement('div');
    paddle.setAttribute('class', 'paddle');
    ball.setAttribute('class', 'ball');
    gameArea.appendChild(paddle);
    gameArea.appendChild(ball);

    keyListen();
    paddleControl();
    gameAreaDim = gameArea.getBoundingClientRect();

    // console.log(gameAreaDim);
    brikeConstruct(60);  //60

    window.requestAnimationFrame(paddleMove);

}
