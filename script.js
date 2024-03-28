score = 0;
cross = true;
newTheme=false;
flagRules=false;
const gameStart=document.querySelector('.gameStart');
const gameContainer=document.querySelector('.gameContainer');
const theme=document.querySelector('.theme');
const rules=document.querySelector('.rules');
const level=document.querySelector('.level');


rules.addEventListener('click' , () => {  
    if(flagRules == false){
        rules.innerHTML ='';
        rules.classList.add('btn-close');
        flagRules =true;    
    }else{
        setTimeout(() => {
            rules.classList.remove('btn-close');
            rules.innerHTML ='Rules';
            flagRules =false;
        },400);    
    }
});

document.onkeydown = function (e) {
    gameOver.style.display = 'none';
    scoreCont.innerHTML = "Your Score: " + score;
    gameStart.style.display ='none';
    obstacle.classList.add('obstacleGif');
    dino.classList.add('dinoGif');
    gameContainer.classList.add('gameBackground');
    obstacle.classList.add('obstacleAni');
    level.disabled =true;
    if(level.value == 'easy'){
        obstacle.classList.add('obstacleAni');
    }else if(level.value == 'medium'){
        obstacle.classList.add('obstacleMedium');
    }else {
        obstacle.classList.add('obstacleHard');
    }
       
    if (e.key == 'ArrowUp') {
        dino = document.querySelector('.dino');
        dino.classList.add('animateDino');
        setTimeout(() => {
            dino.classList.remove('animateDino')
            }, 700);
    }
    if (e.key == 'ArrowRight') {
        dino = document.querySelector('.dino');
        dinoX = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
        let dinoRight =dinoX;
                    
            if(dinoRight < 1200)
                dino.style.left = dinoX + 112 + "px";

            if(dinoRight == 1244)
                dino.style.left = dinoX + 30 + "px";    
    }
    if (e.key == 'ArrowLeft') {
        dino = document.querySelector('.dino');
        dinoX = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
        let dinoLeft = dinoX;
                
        if(dinoLeft > -60)
            dino.style.left = (dinoX - 112) + "px";

        if(dinoLeft == -60)  
            dino.style.left = (dinoX - 40) + "px";
    }       
}

setInterval(() => {
    dino = document.querySelector('.dino');
    gameOver = document.querySelector('.gameOver');
    obstacle = document.querySelector('.obstacle');

    dx = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
    dy = parseInt(window.getComputedStyle(dino, null).getPropertyValue('top'));

    ox = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue('left'));
    oy = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue('top'));

    offsetX = Math.abs(dx - ox);
    offsetY = Math.abs(dy - oy);
    if (offsetX < 73 && offsetY < 52) {
                
        obstacle.classList.remove('obstacleGif')
        dino.classList.remove('dinoGif');
        gameContainer.classList.remove('gameBackground');
        score=0;
        gameOver.style.display ='block';    
        obstacle.classList.remove('obstacleAni');
        obstacle.classList.remove('obstacleMedium');
        obstacle.classList.remove('obstacleHard');
                
    }
    else if (offsetX < 145 && cross) {
        score += 1;
        updateScore(score);
        cross = false;
        setTimeout(() => {
            cross = true;
        }, 1000);
        setTimeout(() => {
            aniDur = parseFloat(window.getComputedStyle(obstacle, null).getPropertyValue('animation-duration'));
            newDur = aniDur - 0.1;
            obstacle.style.animationDuration = newDur + 's';
        }, 500);
    }
}, 10);

function updateScore(score) {
    scoreCont.innerHTML = "Your Score: " + score
}

