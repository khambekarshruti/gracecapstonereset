var underwater, background1, background2,score;
var diverGroup, diver1, diver2, diver3, diver4, diver5, diver6,diver7,diver8,diver9;
var diver,diver_swimming,shark_swim,jelly_fish;
var reef_img,reef1,reef2,reef3;
var sharkGroup,jellyfGroup,fnetGroup; 
var net_Img;
var END =0;
var PLAY =1;
var gameState = PLAY;

var gameOver, restart;

function preload(){
    background1 = loadImage("background_1.png");
    background2 = loadImage("KT3p.gif");
    diver_swimming = loadAnimation("diver1a.png","diver2a.png","diver3a.png","diver4a.png","diver5a.png","diver6a.png","diver7a.png","diver8a.png","diver9a.png");
    shark_swim = loadAnimation("shark1a.png","shark2a.png","shark3a.png","shark4a.png","shark5a.png","shark6a.png","shark7a.png");
    reef_img = loadImage("reefa.png");
    jelly_fish = loadAnimation("jelly1a.png","jelly2a.png");
    net_Img = loadImage("net.png");
    
    gameOverImg = loadImage("gameOver.png");
}

function setup() {
    createCanvas(windowWidth,windowHeight);

    reef=createSprite(300,600,100,2500);
    reef.addImage(reef_img);

    reef2=createSprite(700,600,100,2500);
    reef2.addImage(reef_img);

    reef3=createSprite(1200,600,100,2500);
    reef3.addImage(reef_img);
    
    diver = createSprite(100,200,20,50);
    diver.addAnimation("swimming", diver_swimming);
    diver.setCollider("rectangle",0,0,40,40,90);
    
    gameOver = createSprite(650,150,20,50);
    gameOver.addImage(gameOverImg);
    gameOver.scale = 3;
    gameOver.visible = false;  

    sharkGroup = new Group();
    jellyfGroup = new Group();
    fnetGroup = new Group();



    score=0;
}

function draw() {
  
    background(background2)
    
    
    if(gameState===PLAY){

    
     if(reef.x <0 ){
          reef.x = width/2;
        }

     
      diver.y = World.mouseY;
         
    edges= createEdgeSprites();
    diver.collide(edges);
      var select_dangers = Math.round(random(1,3));
  
      if (World.frameCount % 50 == 0) {
        if (select_dangers == 1) {
          sharks();
        } else if (select_dangers == 2) {
          jellyfish();
        } else {
          fishNet();
        }
      }

      if(sharkGroup.isTouching(diver)){
        gameState = END;
        shark.velocityX = 0;

       }
       else if(jellyfGroup.isTouching(diver)){
        gameState = END;
        jellyf.velocityX = 0;

       }
       else if(fnetGroup.isTouching(diver)){
        gameState = END;
        fnet.velocityX = 0;

       }
       else
       {
        score=score+2;
       }

    }else if (gameState === END) {
      gameOver.visible = true;
      gameOver.depth = gameOver.depth + 20;
      
      textSize(50);
      stroke("red")
      fill("ORANGE")
      text("GAME OVER",500,200);

      textSize(25);
      stroke("red")
      fill("YELLOW")
      text("Press Space Bar to Restart the game!", 450,300);
      //underwater.velocityX = 0;
      //diver.velocityX = 0;
      //diver.setLifetimeEach(-1);
      sharkGroup.setVelocityXEach(0);
      sharkGroup.setLifetimeEach(-1);
      fnetGroup.setVelocityXEach(0);
      fnetGroup.setLifetimeEach(-1);
      jellyfGroup.setVelocityXEach(0);
      jellyfGroup.setLifetimeEach(-1);
      sharkGroup.destroyEach();
      jellyfGroup.destroyEach();
      fnetGroup.destroyEach();
      reef.visible=false
      reef2.visible=false
      reef3.visible=false
      background("black")
      
      
      if(keyDown("space")) {
         reset();
      }
  }
  
  

  drawSprites();
    //Display score
  textSize(25);
  stroke("yellow")
  fill("white")
  text("Score : "+ score,250,50);
}

function fishNet(){
  fnet = createSprite(1000,Math.round(random(120,550)),20,50);
  fnet.addImage("net", net_Img);
  fnet.velocityX = -6;
  fnet.scale = 0.5;
  fnet.setLifetime=170;
  fnetGroup.add(fnet);
}

function jellyfish(){
  jellyf = createSprite(1000,Math.round(random(120,550)),20,50);
  jellyf.addAnimation("jelly", jelly_fish);
  jellyf.velocityX = -4;
  jellyf.setLifetime=170;
  jellyfGroup.add(jellyf);
}

function sharks(){
  
  shark = createSprite(1000,Math.round(random(50,550)),30,350);
  shark.addAnimation("shark", shark_swim);
  shark.velocityX = -4;
  shark.scale = 2;
  shark.setLifetime=170;
  sharkGroup.add(shark);
}

function reset(){
  console.log("reset called")
  gameState = PLAY;
  gameOver.visible = false;
  diver.addAnimation("swimming", diver_swimming);
  
  sharkGroup.destroyEach();
  jellyfGroup.destroyEach();
  fnetGroup.destroyEach();
  score=0;

 }