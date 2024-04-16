playSound("Pac-Man-Theme-Song.mp3", true);
var beginTime;
var isRunning = false;
var score = 0;
var lives = 3;
var playerStepSize = 20;
var pacWidth = 60;
var pacHeight = 40;
var coinWidth =45;
var coinHeight = 30;
var moveX;
var moveY;
var id1X = getXPosition("image1");
var id2X = getXPosition("image2");
var id3X = getXPosition("image3");
var id1Y = getYPosition("image1");
var id2Y = getYPosition("image2");
var id3Y = getYPosition("image3");
var keys = [false, false, false, false];

onEvent("startButton", "click", function() {
  setScreen("gameScreen");
  setPosition("image1",15,115,40,50);
  setPosition("image2",125,205,40,50);
  setPosition("image3",250,300,40,50);
  startTime();
  score = 0;
  lives =3;
  setText("livesText","Lives: " + lives);
  setText("total_score","Score: " + score);
  keys = [false, false, false, false];
  timedLoop(17, function(){
  coins();
  playerMovement();
  moveEnemy("image1", "image2", "image3");
  collectCoin();
  Game();
  });
});

onEvent("playAgain", "click", function() {
  score = 0;
  lives = 3;
  isRunning=false;
  stopTimedLoop();
  setScreen("startScreen");
});

onEvent("gameScreen", "keydown", function(event) {
  if (event.key == "Left"){
    keys[0] = true;
  }else if ((event.key == "Right")){
    keys[1] = true;
  }else if ((event.key == "Up")){
    keys[2] = true;
  }else if ((event.key == "Down")){
    keys[3] = true;
}
});
onEvent("gameScreen", "keyup", function(event) {
  if (event.key == "Left") {
 keys[0] = false;
  }else if ((event.key == "Right")){
    keys[1] = false;
  }else if ((event.key == "Up")){
    keys[2] = false;
  }else if ((event.key == "Down")){
    keys[3] = false;
  }
});


function startTime() {
  if (!isRunning) {
      isRunning = true;
      beginTime = getTime();
      timedLoop(1000, function() {
       var currentTime = getTime();
       var elapsedTime=currentTime-beginTime;
       elapsedTime = Math.round(elapsedTime/1000);
       setText("time_text","Time: " + elapsedTime);
      });
    }
}



function playerMovement(){
    moveX = 0;
    moveY = 0;
    if(keys[0]) {
      moveX += -5;
    }
    if(keys[1]){
      moveX += 5;
    }
    if(keys[2]){
      moveY += -5;
    }
    if(keys[3]){
      moveY += 5;
    }
    var newX = getXPosition("pacman")+moveX;
    var newY = getYPosition("pacman")+moveY;
    if (newX < 0 - (pacWidth / 2) ){
      newX = 320 - (pacWidth / 2);
    }else if (newX > 320 - (pacWidth / 2)){
      newX = 0 - (pacWidth / 2);
    }
    else if (newY < 0 - (pacHeight/2)) {
      newY = 450 - pacHeight/2;
    }
    else if (newY > 450 - (pacHeight/2)){
      newY = 0 - pacHeight/2;
    }
    setPosition("pacman", newX, newY);
    
}
function coins() {
  setPosition("coins1", getXPosition("coins1"), getYPosition("coins1") + 1);
  setPosition("coins2", getXPosition("coins2"), getYPosition("coins2") + 1);
  setPosition("coins3", getXPosition("coins3"), getYPosition("coins3") + 1);
  if (getYPosition("coins1") > 450) {
      setPosition("coins1", randomNumber(0, 320), 0);
    }
  if (getYPosition("coins2") > 450) {
      setPosition("coins2", randomNumber(0, 320), 0);
    }
  if (getYPosition("coins3") > 450) {
      setPosition("coins3", randomNumber(0, 320), 0);
    }
}

function moveAround(obst,x,y,width){
  moveX = 3;
  var newX = x+moveX;
  if (newX < 0 - (width / 2) ){
    newX = 320 - (width / 2);
  } else if (newX > 320 - (width / 2)){
    newX = 0 - (width / 2);
  }
setPosition(obst, newX, y);
}

function moveEnemy(id1, id2, id3) {
  moveAround(id1,getXPosition(id1),getYPosition(id1),50);
  moveAround(id2,getXPosition(id2),getYPosition(id2),50);
  moveAround(id3,getXPosition(id3),getYPosition(id3),50);
  
}


//cite
function checkCollision(x2,y2,h2,w2) {
  var x1= getXPosition("pacman");
  var y1= getYPosition("pacman");
  var h1= pacHeight;
  var w1=pacWidth;
  return x1 < x2 + w2 && x1 + w1 > x2 && y1 < y2 + h2 && y1 + h1 > y2;
}

// obstacles
function obstacleCollision(){
  for(var i=1; i < 4; i++){
    if (checkCollision(getXPosition("image"+i), getYPosition("image"+i),40,50)){
      return true;
    }
  }
  return false;
}

// Coins
function collectCoin() {
  for(var i=1; i < 4; i++){
    if (checkCollision(getXPosition("coins"+i), getYPosition("coins"+i),30,45)){
    updScore();
    setProperty("coins"+i, "hidden", true);
    setPosition("coins"+i, randomNumber(0, 320), 0);
    setProperty("coins"+i, "hidden", false);


  }
  
}
}

function Game() {
  if (obstacleCollision()){
      updLives();
      setPosition("pacman", 123, 385); 
    }
}

function updScore() {
  score+=1;
  setText("total_score", "Score: " + score);
  console.log("Score updated");
}

function updLives() {
    lives = lives-1;
    setText("livesText", "Lives: " + lives);
    console.log("lives updated");
    if(lives == 0){
    setScreen("youLoseScreen")
  }
}
