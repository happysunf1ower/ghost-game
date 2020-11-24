var tower, towerImage;

var ghost, ghostImage;

var door, doorImage;
var doorsGroup;

var climber, climberImage;
var climbersGroup;

var invisibleclimber;
var invisibleclimbersGroup;

var gameState = "play";

function preload()
{
  towerImage = loadImage("tower.png");
  doorImage = loadImage("door.png");
  climberImage = loadImage("climber.png");
  ghostImage = loadImage("ghost-standing.png");
}

function setup()
{
  createCanvas(800, 800);
  tower = createSprite(400, 400, 800, 800);
  tower.addImage(towerImage);
  tower.scale = 1.35;
  
  
  doorsGroup = new Group();
  climbersGroup = new Group();
  invisibleclimbersGroup = new Group();
  
  ghost = createSprite(400, 400, 25, 50);
  ghost.addImage(ghostImage);
  ghost.scale = 0.5;
}

function draw()
{
  background("black");
  
  
  if (gameState === "play")
  {
  drawSprites();
   tower.velocityY = 3; 
    
  if(tower.y > 800)
  {
    tower.y = 400;
  }

  if(keyDown("left"))
  {
    ghost.x = ghost.x - 3;
  }
  
  if(keyDown("right"))
  {
    ghost.x = ghost.x + 3;
  }
  
  if(keyDown("space"))
  {
    ghost.velocityY = -3;
  }
  
  ghost.velocityY = ghost.velocityY + 0.5;
  
  if(climbersGroup.isTouching(ghost))
  {
  ghost.velocityY = 0;
  }
  Spawndoor();
  if (invisibleclimbersGroup.isTouching(ghost) || ghost.y > 800)
    {
    gameState = "end";
    ghost.destroy();
    }
  
  }
  
  else if (gameState === "end")
  {
   tower.velocityY = 0; 
    textSize(60);
    textFont("ariel");
    fill("red");
    text("GAME OVER!!", 200, 400);
    
    
  }
  
  
}

function Spawndoor()
{
  if (frameCount % 125 ===0)
  {
  door = createSprite(150, 0, 50, 70);
  door.addImage(doorImage);
  door.velocityY = 3;
  door.x = Math.round(random(150, 650));
  door.lifetime = 267;
  doorsGroup.add(door);
    
  climber = createSprite(150, 60, 50, 25);
  climber.addImage(climberImage);
  climber.velocityY = 3;
  climber.x = door.x;
  climber.lifetime = 267;
  climbersGroup.add(climber);
    
  invisibleclimber = createSprite(150, 65, 50, 25);
  invisibleclimber.visible = false;
  invisibleclimber.velocityY = 3;
  invisibleclimber.x = climber.x;
  invisibleclimber.lifetime = 267;
  invisibleclimbersGroup.add(invisibleclimber);
    
  ghost.depth = door.depth;
  ghost.depth = ghost.depth + 1;
  }
    
}