'use strict';
{
  function setLevelList(){
    const ul=document.querySelector('ul');
    const listTexts=[
      'Level1:パドル狭＆上昇',
      "Level2:Level1＋スピードアップ",
      "Level3:Level2＋マスク",
      "Level4:パドル操作反転",
      "Level5:Level4＋マスク",
      "Level6:ボール2個",
      "Level7:Level6＋マスク",
      "Level8:Level7+パドル操作反転",
      // "Level9:Level8+スピードアップ",
      // "Level10:Level9+スピードアップ",
    ]
  
    listTexts.forEach(levelText=>{
      const li=document.createElement('li');
      li.textContent=levelText;
      ul.appendChild(li);
    });
  }

  function rand(min,max){
    return Math.random()*(max-min)+min;
  }

  function removeActive(){
    lists.forEach(list=>{
      list.classList.remove('active');
    })
  }
  
  class Ball{
    constructor(canvas){
      this.canvas=canvas;
      this.ctx=this.canvas.getContext('2d');
      this.r=10;
      this.x=rand(30,250);
      this.y=10;
      this.vx=3.8*(Math.random()<0.5?1:-1);
      this.vy=2.8;
      this.isMissed=false;
    }

    update(){
      this.x+=this.vx;
      this.y+=this.vy;

      if(this.x<this.r||this.x>this.canvas.width-this.r){
        this.vx*=-1;
      }
      if(this.y<this.r){
        this.vy*=-1;
      }

      if(this.y-this.r>this.canvas.height){
        this.isMissed=true;
      }

    }

    draw(){
      this.ctx.beginPath();
      this.ctx.fillStyle='orange';
      this.ctx.arc(this.x,this.y,this.r,0,2*Math.PI);
      this.ctx.fill();
    }

    getX(){
      return this.x;
    }

    getY(){
      return this.y;
    }

    getR(){
      return this.r;
    }

    bounce(){
      this.vy*=-1;
    }

    pushUp(paddleTop){
      this.y=paddleTop-this.r;
    }

    getIsMissed(){
      return this.isMissed;
    }

    speedUp(){
      this.vx*=1.25;
      this.vy*=1.25;
    }

    speedDown(){
      this.vx*=0.8;
      this.vx*=0.8;
    }
  }

  class Paddle{
    constructor(canvas,game){
      this.game=game;
      this.canvas=canvas;
      this.ctx=this.canvas.getContext('2d');
      this.w=60;
      this.h=10;
      this.x=this.canvas.width/2-this.w/2;
      this.y=this.canvas.height-30;
      this.mouseX=this.x;
      this.getMouseX();
      this.isReversed=false;
    }

    getMouseX(){
      document.addEventListener('mousemove',e=>{
        this.mouseX=e.clientX;
      });
    }

    update(ball){
      const paddleTop=this.y;
      const paddleLeft=this.x;
      const paddleRight=this.x+this.w;
      const paddleBottom=this.y+this.h;
      const ballTop=ball.getY()-ball.getR();
      const ballBottom=ball.getY()+ball.getR();
      const ballCenter=ball.getX();

      if(
        paddleTop<ballBottom&&
        paddleBottom>ballTop&&
        paddleLeft<ballCenter&&
        ballCenter<paddleRight){
        ball.pushUp(paddleTop);
        ball.bounce();
        this.game.addScore();
      }

      const rect=this.canvas.getBoundingClientRect();
      if(this.isReversed){
        this.x=this.canvas.width-(this.mouseX-rect.left-this.w/2);
      }else{
        this.x=this.mouseX-rect.left-this.w/2;
      }
      if(this.x<0){
        this.x=0;
      }
      if(this.x>this.canvas.width-this.w){
        this.x=this.canvas.width-this.w;
      }
    }

    draw(){
      this.ctx.fillStyle="white";
      this.ctx.fillRect(this.x,this.y,this.w,this.h);
    }

    narrow(){
      this.w-=20;
    }

    spread(){
      this.w=60;
    }

    goUp(){
      setTimeout(()=>{
        this.y-=20;
      },200)
    }

    goDown(){
      setTimeout(()=>{
        this.y=this.canvas.height-30;
      },200)
    }

    switchReverse(){
      this.isReversed=!this.isReversed;
    }

    getY(){
      return this.y;
    }

    getIsReversed(){
      return this.isReversed;
    }
  }

  class Game{
    constructor(canvas){
      this.canvas=canvas;
      this.ctx=this.canvas.getContext('2d');
      this.ball=new Ball(canvas);
      this.ball2=new Ball(canvas);
      this.paddle=new Paddle(canvas,this);
      this.level=new Level(this,this.ball,this.paddle);
      this.isGameover=true;
      this.isGameCleared=true;
      this.score=0;
      this.isMasked=false;
      this.isDoubled=false;
      this.drawOpening();
    }

    gameStart(){
      this.isGameover=false;
      this.isGameCleared=false;
      this.loop();
    }

    loop(){
      if(this.isGameover){
        return;
      }

      if(this.isGameCleared){
        return;
      }

      this.update();
      this.draw();
      requestAnimationFrame(()=>{
        this.loop();
      });
    }

    update(){
      this.ball.update();
      this.paddle.update(this.ball);

      if(this.ball.getIsMissed()){
        this.isGameover=true;
      }

      if(this.isDoubled){
        this.ball2.update();
        this.paddle.update(this.ball2);
  
        if(this.ball2.getIsMissed()){
          this.isGameover=true;
        }
      }
    }

    draw(){
      if(this.isGameover){
        this.drawScore();
        this.drawGameOver();
        return;
      }
      
      this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);

      
      this.drawScore();
      this.ball.draw();
      
      if(this.isDoubled){
        this.ball2.draw();
      }
      
      this.paddle.draw();
      
      if(this.isMasked===true){
        this.drawMask();
      }

      if(this.paddle.getIsReversed()){
        this.drawReverse();
      }
      
      if(this.isGameCleared){
        this.drawScore();
        this.drawGameClear();
        return;
      }
    }

    addScore(){
      this.score++;
      this.level.checkLevelUp();
    }

    getScore(){
      return this.score;
    }

    drawScore(){
      this.ctx.fillStyle="white";
      this.ctx.font='bold 20px sans-serif'
      this.ctx.fillText(this.score,15,25);
    }

    drawGameOver(){
      this.ctx.fillStyle="red";
      this.ctx.font="bold 30px sans-serif";
      this.ctx.textAlign="center";
      this.ctx.fillText('GAME OVER',this.canvas.width/2,this.canvas.height/2-20);
      this.ctx.font="bold 25px sans-serif";
      this.ctx.fillText('CLICK TO RESTART',this.canvas.width/2,this.canvas.height/2+20);
    }

    drawOpening(){
      this.ctx.fillStyle="red";
      this.ctx.font="bold 25px sans-serif";
      this.ctx.textAlign="center";
      this.ctx.fillText('PING PONG GAME',this.canvas.width/2,this.canvas.height/2);
      this.ctx.fillText('CLICK TO START',this.canvas.width/2,this.canvas.height/2+40);
    }

    drawGameClear(){
      this.ctx.fillStyle="red";
      this.ctx.textAlign="center";
      this.ctx.font="bold 24px sans-serif";
      this.ctx.fillText('CONGRATULATIONS',this.canvas.width/2,this.canvas.height/2-20);
      this.ctx.font="bold 30px sans-serif";
      this.ctx.fillText('GAME CLEAR!',this.canvas.width/2,this.canvas.height/2+20);
    }

    drawMask(){
      this.ctx.fillStyle='#eee'
      this.ctx.fillRect(0,50,this.canvas.width,130);
    }

    drawReverse(){
      this.ctx.fillStyle="red";
      this.ctx.font="bold 25px sans-serif";
      this.ctx.textAlign="center";
      this.ctx.fillText('反転',this.canvas.width/2,30);
    }

    switchMask(){
      this.isMasked=!this.isMasked;
    }

    switchDoubled(){
      this.isDoubled=!this.isDoubled;
    }

    switchGameCleared(){
      this.isGameCleared=!this.isGameCleared;
    }
  }

  class Level{
    constructor(game,ball,paddle){
      this.game=game;
      this.ball=ball;
      this.paddle=paddle;
      this.levelUpCount=3;
    }

    level1(){
      removeActive();
      lists[0].classList.add('active');
      this.paddle.narrow(); 
      this.paddle.goUp();
    }

    level2(){
      removeActive();
      lists[1].classList.add('active');
      this.ball.speedUp();
    }

    level3(){
      removeActive();
      lists[2].classList.add('active');
      this.game.switchMask();
    }

    level4(){
      removeActive();
      lists[3].classList.add('active');
      this.paddle.spread();
      this.paddle.goDown();
      this.ball.speedDown();
      this.game.switchMask();
      this.paddle.switchReverse();
    }

    level5(){
      removeActive();
      lists[4].classList.add('active');
      this.game.switchMask();
    }

    level6(){
      removeActive();
      lists[5].classList.add('active');
      this.game.switchMask();
      this.paddle.switchReverse();
      this.game.switchDoubled();
    }

    level7(){
      removeActive();
      lists[6].classList.add('active');
      this.game.switchMask();
    }

    level8(){
      removeActive();
      lists[7].classList.add('active');
      this.paddle.switchReverse();
    }

    // level9(){
    //   removeActive();
    //   lists[8].classList.add('active');
    //   this.paddle.narrow(); 
    //   this.paddle.goUp();      
    // }

    // level9(){
    //   removeActive();
    //   lists[8].classList.add('active');
    //   this.ball.speedUp();  
    // }

    checkLevelUp(){
      switch(this.game.getScore()){
        case this.levelUpCount*1:
          this.level1()
        break;
        case this.levelUpCount*2:
          this.level2()
        break;
        case this.levelUpCount*3:
          this.level3()
        break;
        case this.levelUpCount*4:
          this.level4()
        break;
        case this.levelUpCount*5:
          this.level5()
        break;
        case this.levelUpCount*6:
          this.level6()
        break;
        case this.levelUpCount*8:
          this.level7()
        break;
        case this.levelUpCount*10:
          this.level8()
        break;
        // case this.levelUpCount*12:
        //   this.level9();
        // break;
        // case this.levelUpCount*14:
        //   this.level10();
        // break;
        case this.levelUpCount*12:
          this.game.switchGameCleared();
        break;
      }
    }
  }


  const canvas=document.querySelector('canvas');
  let game=new Game(canvas);
  setLevelList();
  const lists=document.querySelectorAll('ul li');
  
  canvas.addEventListener('click',()=>{
    if(game.isGameover===true||game.isGameCleared===true){
      removeActive();
      game=new Game(canvas);
      game.gameStart();
    }
  })

  const modal=document.getElementById('modal');
  setTimeout(()=>{
    modal.classList.remove('hidden');
  },50)
  const button=document.getElementById('button');

  button.addEventListener('click',()=>{
    modal.classList.add('hidden');
  });

  document.addEventListener('click',()=>{
    button.click();
  })
  
}