var gameState = "play";
var endState = "end";

var END = 0;
var PLAY = 1;

var knife, knifeImg;

var fruit, fruit1, fruit2, fruit3, fruit4, fruitGroup;

var monster, alien, monsterGroup;

var score = 0;

var gameover, gameoverImg;

function preload() {
  knifeImg = loadImage("sword.png");

  fruit1 = loadImage("fruit1.png");
  fruit2 = loadImage("fruit2.png");
  fruit3 = loadImage("fruit3.png");
  fruit4 = loadImage("fruit4.png");

  alien = loadAnimation("a1.png", "a2.png");

  //gameoverImg = loadAnimation("gameover.mp3");

  gameoverImg = loadImage("gameover.png");
}




function setup() {

  createCanvas(400, 400)

  knife = createSprite(200, 200, 50, 50);
  knife.addImage(knifeImg);
  knife.scale = 0.5;

  fruitGroup = new Group();
  monsterGroup = new Group();

}


function draw() {
  background("lightblue");
  text("score: " + score, 300, 50);

  if (gameState == "play") {
    knife.x = mouseX
    knife.y = mouseY

    Fruits();
    Monster();

    if (knife.isTouching(fruitGroup)) {
      fruitGroup.destroyEach();
      score = score + 1
    }

    if (knife.isTouching(monsterGroup)) {
      monsterGroup.destroyEach();
      gameState = END;
    }
  }

  if (gameState === END) {
    knife.addImage(gameoverImg);
    knife.x = 200;
    knife.y = 200;
  }

  drawSprites();
}

function Fruits() {

  if (frameCount % 80 == 0) {
    fruit = createSprite(60, 60, 1, 1);

    var r = Math.round(random(1, 4));
    switch (r) {
      case 1:
        fruit.addImage(fruit1);
        break;
      case 2:
        fruit.addImage(fruit2);
        break;
      case 3:
        fruit.addImage(fruit3);
        break;
      case 4:
        fruit.addImage(fruit4);
        break;
      default:
        break;
    }

    fruit.scale = 0.2;
    fruit.velocityX = 6;
    fruit.lifetime = 100;
    fruitGroup.add(fruit);
  }

}



function Monster() {

  if (frameCount % 80 == 0) {

    monster = createSprite(400, Math.round(random(40, 360)), 10, 10);
    monster.addAnimation("ENEMY", alien);
    monster.velocityX = -6;
    monster.lifetime = 90;
    monsterGroup.add(monster);

  }

}