var game = {
   
  groundWidth : 700,
  groundHeight : 400,
  netWidth : 6,
  groundColor : "#000000",
  netColor : "#FFFFFF",
  
  groundLayer : null,  
  scoreLayer : null,
  playersBallLayer : null,
  gameEndLayer : null,
  scorePosPlayer1 : 300,
  scorePosPlayer2 : 365,
  playerOneScore : 0,
  playerTwoScore : 0,
  gameEnd : false,
  ball : {
    width : 10,
    height : 10,
    color : "#FFD700",
    posX : 200,
    posY : 200,
    directionX : 1,
    directionY : 1,
    speed : 3,
	audioBouncing : null,
 
    move : function() {
      this.posX += this.directionX * this.speed;
      this.posY += this.directionY * this.speed;
    },
   
    bounce : function() {
      if ( this.posX > game.groundWidth || this.posX < 0 ){
			this.audioBouncing.play();
         this.directionX = -this.directionX;
		 if(this.posX<0){
			game.playerTwoScore+=1;
			this.posX=200;
			this.posY=200;
			this.directionX=1;
			this.speed=3;
		 }
		 else{
			game.playerOneScore+=1;
			this.posX=400;
			this.posY=200;
			this.directionX=-1;
			this.speed=3;
		 }
	  }
      if ( this.posY > game.groundHeight || this.posY < 0  ){
		this.audioBouncing.play();
		this.directionY = -this.directionY; 
	  }
       
    },
	
    collide : function(anotherItem) {
      if ( !( this.posX >= anotherItem.posX + anotherItem.width || this.posX <= anotherItem.posX - this.width
      || this.posY >= anotherItem.posY + anotherItem.height || this.posY <= anotherItem.posY - this.height ) ) {
        // Collision
        return true;
      } 
      return false;
    }
  },
    
  playerOne : {
    width : 10,
    height : 50,
    color : "#FFFFFF",
    posX : 30,
    posY : 200,
  goUp : false,
  goDown : false
  },
    
  playerTwo : {
    width : 10,
    height : 50,
    color : "#FFFFFF",
    posX : 650,
    posY : 200,
  goUp : false,
  goDown : false
  },
    
  init : function() {
	this.ball.audioBouncing=new Audio('file:///C:/Users/corme/Desktop/Programmation/NodeJs/Projet/PongHtml5/sound/collision2.mp3');
	this.gameEnd=false;
    this.groundLayer= game.display.createLayer("terrain", this.groundWidth, this.groundHeight, undefined, 0, "#000000", 0, 0); 
    game.display.drawRectangleInLayer(this.groundLayer, this.netWidth, this.groundHeight, this.netColor, this.groundWidth/2 - this.netWidth/2, 0);
    
    this.scoreLayer = game.display.createLayer("score", this.groundWidth, this.groundHeight, undefined, 1, undefined, 0, 0);
    game.display.drawTextInLayer(this.scoreLayer , "SCORE", "10px Arial", "#FF0000", 10, 10);
    
    this.playersBallLayer = game.display.createLayer("joueursetballe", this.groundWidth, this.groundHeight, undefined, 2, undefined, 0, 0);  
    game.display.drawTextInLayer(this.playersBallLayer, "JOUEURSETBALLE", "10px Arial", "#FF0000", 100, 100);
    this.gameEndLayer = game.display.createLayer("end",this.groundWidth,this.groundHeight,undefined,1,undefined,0,0);
    this.displayScore();
    this.displayBall(200,200);
    this.displayPlayers();
   
    this.initKeyboard(game.control.onKeyDown, game.control.onKeyUp);
    this.initMouse(game.control.onMouseMove);
  },
  replay : function(){
	this.playerOneScore=0;
	this.playerTwoScore=0;
	game.playerTwo.goUp = false;
	game.playerTwo.goUp = false;
	game.playerOne.goDown = false;
	game.playerOne.goDown = false;
	this.gameEnd=false;
	this.clearLayer(game.gameEndLayer);
	game.display.drawRectangleInLayer(this.groundLayer, this.netWidth, this.groundHeight, this.netColor, this.groundWidth/2 - this.netWidth/2, 0);
	game.display.drawTextInLayer(this.scoreLayer , "SCORE", "10px Arial", "#FF0000", 10, 10);
	game.display.drawTextInLayer(this.playersBallLayer, "JOUEURSETBALLE", "10px Arial", "#FF0000", 100, 100);
	this.displayScore();
	this.displayBall(200,200);
	this.displayPlayers();
  },
  displayScore : function() {
    game.display.drawTextInLayer(this.scoreLayer, this.playerOneScore, "60px Arial", "#FFFFFF", this.scorePosPlayer1, 55);
    game.display.drawTextInLayer(this.scoreLayer, this.playerTwoScore, "60px Arial", "#FFFFFF", this.scorePosPlayer2, 55);
  },
    
  displayBall : function() {
    game.display.drawRectangleInLayer(this.playersBallLayer, this.ball.width, this.ball.height, this.ball.color, this.ball.posX, this.ball.posY);
  },
  moveBall : function() { 
    this.ball.move();
	this.ball.speed+=0.00001;
    this.ball.bounce();
    this.displayBall();
  }, 
  
  movePlayers : function() {
    if ( game.control.controlSystem == "KEYBOARD" ) {
      // keyboard control
      if ( game.playerOne.goUp ) {
        game.playerOne.posY-=5;
      } else if ( game.playerOne.goDown ) {
        game.playerOne.posY+=5;
      }
	  if ( game.playerTwo.goUp) {
        game.playerTwo.posY-=5;
      }
	  else if ( game.playerTwo.goDown ) {
        game.playerTwo.posY+=5;
      }
    } else if ( game.control.controlSystem == "MOUSE" ) {
      // mouse control
      if (game.playerOne.goUp && game.playerOne.posY > game.control.mousePointer)
        game.playerOne.posY-=5;
      else if (game.playerOne.goDown && game.playerOne.posY < game.control.mousePointer)
        game.playerOne.posY+=5;
    }
  },
   
  displayPlayers : function() {
    game.display.drawRectangleInLayer(this.playersBallLayer, this.playerOne.width, this.playerOne.height, this.playerOne.color, this.playerOne.posX, this.playerOne.posY);
    game.display.drawRectangleInLayer(this.playersBallLayer, this.playerTwo.width, this.playerTwo.height, this.playerTwo.color, this.playerTwo.posX, this.playerTwo.posY);
  },
  endGame : function(){
	 if(this.playerOneScore===5 ||this.playerTwoScore===5){
		 this.gameEnd=true;
		 this.display.drawTextInLayer(game.gameEndLayer , "Pour rejouer appuyez sur n'importe quelle touche", "30px Arial", "#FFFF", 20,game.groundHeight/2);
	 }
  },
  clearLayer : function(targetLayer) {
  targetLayer.clear();
  },
   
  initKeyboard : function(onKeyDownFunction, onKeyUpFunction) {
    window.onkeydown = onKeyDownFunction;
    window.onkeyup = onKeyUpFunction;
  },
  
  initMouse : function(onMouseMoveFunction) {
    window.onmousemove = onMouseMoveFunction;
  },
  
  collideBallWithPlayersAndAction : function() { 
    if ( this.ball.collide(game.playerOne) ){
		// let audio = new Audio('file:///C:/Users/corme/Desktop/Programmation/NodeJs/Projet/PongHtml5/sound/collision2.mp3');
		// audio.play();
		this.ball.audioBouncing.play();
      game.ball.directionX = -game.ball.directionX;
	}
    if ( this.ball.collide(game.playerTwo) ){
		// let audio = new Audio('file:///C:/Users/corme/Desktop/Programmation/NodeJs/Projet/PongHtml5/sound/collision2.mp3');
		// audio.play();
		this.ball.audioBouncing.play();
      game.ball.directionX = -game.ball.directionX;
	}
  }
   
};