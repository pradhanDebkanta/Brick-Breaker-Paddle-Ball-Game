const scoreContainer = document.querySelector('.score-container');
const gameContainer = document.querySelector('.game-container');
const startScreen = document.querySelector('.startScreen');
const gameArea = document.querySelector('.gameArea');

let isStart = false;
let isGamePlay = false;
let ff = 0;
const formFactor = 20;
let lHScore = 0;

if (window.localStorage.getItem('hScore')) {
    lHScore = window.localStorage.getItem('hScore');
} else {
    window.localStorage.setItem('hScore', 0);
    lHScore = 0;
}

const player = {
    score: 0,
    highestScore: lHScore,

}
const keys = {
    ArrowLeft: false,
    ArrowRight: false,
    ArrowUp: false,
}

startScreen.addEventListener('click', startGame);
document.addEventListener('keydown', (e)=>{
    if(e.keyCode ===38){
        keys.ArrowUp= true;
    }
    if(e.keyCode===37){
        keys.ArrowRight= true;
    }
    if(e.keyCode===39){
        keys.ArrowUp= true;
    }

});
document.addEventListener('keyup', (e)=>{
    if(e.keyCode===37){
        keys.ArrowLeft= false;
    }
    if(e.keyCode===39){
        keys.ArrowRight= false;
    }
});
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
        // console.log('up mouse down');
        keys.ArrowUp = true;
        upArr.classList.add('border_class');
    }, false);

    // right arrow event 
    rightArr.addEventListener('pointerdown', () => {
        // console.log('right mouse down');
        keys.ArrowRight = true;
        rightArr.classList.add('border_class');
    }, false);
    rightArr.addEventListener('pointerup', () => {
        // console.log('right mouse up');
        keys.ArrowRight = false;
        rightArr.classList.remove('border_class');
    }, false);

    // left arrow event
    leftArr.addEventListener('pointerdown', () => {
        // console.log('left mouse down');
        keys.ArrowLeft = true;
        leftArr.classList.add('border_class');

    }, false);
    leftArr.addEventListener('pointerup', () => {
        // console.log('left mouse up');
        keys.ArrowLeft = false;
        leftArr.classList.remove('border_class');
    }, false);

}



function gamePlay() {
    console.log('game play');
}
function startGame() {
    console.log('start game');

    isStart = true;
    startScreen.classList.add('hide');
    scoreContainer.innerHTML =
        `Score : <span class="score">${player.score}</span> 
     <span class="highest-score"> Highest Score: <span class="h-score">${player.highestScore}</span></span> `;
    scoreContainer.style.padding = 1 + 'rem';
    gameArea.classList.remove('hide');
    let paddle = document.createElement('div');
    let ball = document.createElement('div');
    paddle.setAttribute('class', 'paddle');
    ball.setAttribute('class', 'ball');
    gameArea.appendChild(paddle);
    gameArea.appendChild(ball);
    paddleControl();


}