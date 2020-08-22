var gapBetween=30
var turn ="X",gameState ="play"
//var title = createElement('h1','title')
var winner;
function setup() {
  if(windowHeight<windowWidth){
     createCanvas(windowHeight*0.75, windowHeight*0.75);
  }
  else if(windowHeight>windowWidth){
     createCanvas(windowWidth*0.75,windowWidth*0.75);
  }
  database = firebase.database();
  game= new Game()
  gapBetween= width*0.25
  //resetGame()
 // game.display()

   
}

function draw() {
//translate(width/2, height/2)
  background("#FFF2CC");
  game.highlight(mouseX, mouseY)
  game.display()
  game.showReset()
  
  push()
            //textFont("COMICS")
            textSize(50)
            textAlign(CENTER)
            if(winner){
              textSize(75)
              text(winner +" Wins!", width/2,gapBetween*0.35)
            }
            else{
              text(turn +" Turn", width/2,gapBetween*0.4)
            }
  pop()
}

function mouseClicked(){
  
  if(gameState=="play"){
     game.set(turn)
  }
 
}
function resetGame(){
  console.log("reset Entered")
  gameState = "play"
  game.arr=[["","",""],["","",""],["","",""]]
  database.ref('/').update({
    arr: game.arr
  })
}
