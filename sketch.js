var path,mainCyclist;
var Player1,Player2,Player3
var pathImg,mainRacerImg1,mainRacerImg2,opPink1,opPink2,opYellow3,opYellow4,opRed5, opRed6;
var opPink,opYellow,opRed;
var opCyclist1,opCyclist2;
var END =0;
var PLAY =1;
var gameState = PLAY;
var GameOverImg,GameOver,restart;
var distance=0;
var cycleBell,cycleBellSound
var rand;
function preload(){
  pathImg = loadImage("images/Road.png");
  mainRacerImg1 =loadImage("images/mainPlayer1.png","images/mainPlayer2.png");
  mainRacerImg2= loadImage("images/mainPlayer3.png");
  opPink1= loadImage("images/opponent1.png","images/opponent2.png");
  opPink2= loadImage("images/opponent3.png");
  opYellow3=loadImage("images/opponent4.png","images/opponent2.png");
  opYellow4=loadImage("images/opponent6.png");
  opRed5=loadImage("images/opponent7.png","images/opponent8.png");
  opRed6=loadImage("images/opponent9.png");
  GameOverImg=loadImage("images/gameOver.png");
  cycleBellSound=loadSound("sound/bell.mp3");
}

function setup(){
  
createCanvas(500,300);
  
// Moving background
path=createSprite(100,150);
path.addImage(pathImg);
path.velocityX = -5;

//creating boy running
mainCyclist  = createSprite(70,150,20,20);
mainCyclist.addImage(mainRacerImg1);
mainCyclist.scale=0.1;
mainCyclist.velocityX=2;

GameOver=createSprite(650,150);
GameOver.addImage(GameOverImg);
GameOver.scale=0.8
GameOver.visible=false;
  
pinkCyG = new Group();
yellowCyG =new Group();
redCyG = new Group();
}
function draw() {
  background(0);
  
  drawSprites();
  textSize(20);
  fill(255);
  text("Distance: "+ distance,350,30);
  
  if(gameState===PLAY){
  
   distance = distance + Math.round(getFrameRate()/50);
   path.velocityX = -(6 + 2*distance/150);
    
   mainCyclist.y = World.mouseY;
  
   edges= createEdgeSprites();
   mainCyclist.collide(edges);
  //code to reset the background
    
      if(keyDown("SPACE")){
    cycleBell.play(cycleBellSound);
  }
    
  if(path.x < 0 ){
    path.x = path.width/2;} 
    
  if (World.frameCount % 150 == 0) {
    if (select_oppPlayer == 1) {
      pinkCyclists();
    } else if (select_oppPlayer == 2) {
      yellowCyclists();
    } else {
      redCyclists();
    } 
  }
    
if(pinkCyG.isTouching(mainCyclist)){
gameState = END;
Player1.velocityY = 0;      
Player1.addAnimation("opponentPlayer1",opPink2Img);   
}
    
if(yellowCyG.isTouching(mainCyclist)){
  GameState=END;
  Player2.velocityX=0; 
  Player2.addAnimation("opponentplayer2",opYellow4Img);
}

if(redCyG.isTouching(mainCyclist)){
  GameState=END;
  Player3.velocityX=0;
  Player3.addAnimation("opponentplayer3",opRed6Img)
} 
} else if(gameState===END){
  GameOver.visible =true;
  textSize(20);
  fill(255);
  text("Press Up Arrow to Restart The Game",500,200);
  
  path.velocityX=0;
  mainCyclist.velocityY=0;
  
  
  mainCyclist.addAnimation("Mainracerrunning",mainRacerImg2);
  
    pinkCG.setVelocityXEach(0);
    pinkCG.setLifetimeEach(-1);
  
    yellowCG.setVelocityXEach(0);
    yellowCG.setLifetimeEach(-1);
  
    redCG.setVelocityXEach(0);
    redCG.setLifetimeEach(-1);
  
  if(keyDown("UP_ARROW"));{
    reset();
  }
}
  
}
function pinkCyclists(){
        player1 =createSprite(1100,Math.round(random(50, 250)));
        player1.scale =0.06;
        player1.velocityX = -(6 + 2*distance/150);
        player1.addAnimation("opponentPlayer1",oppPink1Img);
        player1.setLifetime=170;
        pinkCG.add(player1);
}

function yellowCyclists(){
        player2 =createSprite(1100,Math.round(random(50, 250)));
        player2.scale =0.06;
        player2.velocityX = -(6 + 2*distance/150);
        player2.addAnimation("opponentPlayer2",oppYellow1Img);
        player2.setLifetime=170;
        yellowCG.add(player2);
}

function redCyclists(){
        player3 =createSprite(1100,Math.round(random(50, 250)));
        player3.scale =0.06;
        player3.velocityX = -(6 + 2*distance/150);
        player3.addAnimation("opponentPlayer3",oppRed1Img);
        player3.setLifetime=170;
        redCG.add(player3);
}

function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  mainCyclist.addAnimation("SahilRunning",mainRacerImg1);
  
  pinkCG.destroyEach();
  yellowCG.destroyEach();
  redCG.destroyEach();
  
  distance = 0;
}