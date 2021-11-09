var bg,boy1,boy2,boy3;
var obstacle1,obstacle2;
var boy;
var invisibleGround,invisibleGroundGroup;
var obstaclesGroup,a=500;
var gameState = "serve"; 

function preload(){
    bg = loadImage("bluemoon.png");

    boy1 = loadAnimation("boy1.png");
    boy2 = loadAnimation("boy4..png","boy5.png");
    boy3 = loadAnimation("boy2.png");
    boy4 = loadAnimation("boy3.png");

    obstacle1 = loadImage("Oobstacle1.png");
    obstacle2 = loadImage("Oobstacle2.png");

}

function setup(){
    
    var canvas = createCanvas(windowWidth,windowHeight);
   

    bgi = createSprite(windowWidth/2,windowHeight/2,10,10);
    bgi.addImage(bg);
 
    boy = createSprite(275,335,10,10);
    boy.addAnimation("initialboy",boy1);
    boy.addAnimation("boyrunning",boy2);
    boy.scale=1;

    obstaclesGroup= createGroup();
    invisibleGroundGroup= createGroup();

    // invisibleGround = createSprite(300,500,250,10);
    // invisibleGround.visible=true; 

    

}

function draw(){
    background(0);

    

    if(keyDown("space")){
        gameState = "play";      
    }

    if(gameState === "play"){

        if(keyDown(UP_ARROW) && boy.y>=300){
            boy.velocityY=-10;
            boy.velocityX= 0.4;
        }    
        boy.velocityY+=0.8;

        bgi.velocityX= -4;
        
        boy.collide(invisibleGroundGroup);

        spawnObstacles();

        boy.changeAnimation("boyrunning",boy2);

        if (bgi.x < 440){
            bgi.x = bgi.width/2;
        }
        // if (boy.isTouching(obstaclesGroup)){
        //     boy.velocityY=0;
        // }

    }  
boy.debug=true;
 

    drawSprites();
    if(gameState === "serve"){
        textSize(40);
        fill(255);
        text("RULES- ", 500,100);
        textSize(30);
        text("1-Press SPACE to start the game !! ", 500,150);
        text("2-Press UP ARROW after starting the game!! ", 500,200);
        text("3-Try to cross all the obstacles to win the game !! ", 500,250);
        }
}

function spawnObstacles() {
    if(frameCount % 80 === 0) {
        var obstacle = createSprite(a,165,10,40);
        if(a<1500){            
            a+=100
        }
      //obstacle.debug = true;

      obstacle.velocityX = -5;
      obstacle.y = Math.round(random(400,600));
      
      invisibleGround = createSprite(400,600,100,10);
      
      invisibleGround.x= obstacle.x;
      invisibleGround.y= obstacle.y-10;  

      invisibleGround.visible=true;
      invisibleGround.velocityX=-5;  

      invisibleGround.debug=true;

     

      //generate random obstacles
      var rand = Math.round(random(1,2));
      switch(rand) {
        case 1: obstacle.addImage(obstacle1);
                obstacle.scale= 2;
                break;
        case 2: obstacle.addImage(obstacle2);
                break;
        // case 3: obstacle.addImage(obstacle3);
        //         break;
        // case 4: obstacle.addImage(obstacle4);
        //         break;
        // case 5: obstacle.addImage(obstacle5);
        //         break;
        // case 6: obstacle.addImage(obstacle6);
        //         break;
        default: break;
      }
      
      //assign scale and lifetime to the obstacle           
      obstacle.scale = 0.5;
      obstacle.lifetime = 300;
      
      invisibleGround.lifetime = 300;
      //add each obstacle to the group
      obstaclesGroup.add(obstacle);
      invisibleGroundGroup.add(invisibleGround);
    }
  }
