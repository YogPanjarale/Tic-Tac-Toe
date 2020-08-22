var l=50,h=75
class Game {
    constructor(){
      this.arr= [[2,2,2],[2,2,2],[2,2,2]];
      this.state= "play"
      this.resetButton = createButton('Reset');
    }
    display(){
        var arr=this.arr
        
        
        this.lines( gapBetween)
        for (let i = 0; i < arr.length; i++) {            
            for (let j = 0; j < arr[i].length; j++) {         
              switch (arr[i][j]) {
                 
                  case "O":
                      this.zero( gapBetween *(j+1),gapBetween*(i+1))
                      break;
                  case "X":
                      this.cross( gapBetween *(j+1),gapBetween*(i+1))
                      break;
                  default:
                      break;
              }           
            }            
        }
        this.check(this.arr)
        this.updateArray()
    }
    showReset(){
        this.resetButton.style('width', '200px');
        this.resetButton.style('height', '40px');
        this.resetButton.style('background', 'lightblue');
        this.resetButton.position(width/2 -100, height-gapBetween/2)
        this.resetButton.mousePressed(()=>{
            resetGame()
        })
    }
    cross(x,y){
       push()
       strokeWeight(10)
       stroke(10)
       
       translate(x, y)
       line(-(l/2), (h/2),(l/2),-(h/2))
       line((l/2), (h/2),-(l/2),-(h/2))
      // console.log(x-(l/2), y-(h/2),x+(l/2),y+(h/2))
       pop()
    }
    zero(x,y){
        push()
       strokeWeight(10)
       stroke(0)
       noFill()
       var l=50,h=75
       translate(x, y)
      
       ellipse(0, 0,l,h)
      // console.log(x-(l/2), y-(h/2),x+(l/2),y+(h/2))
       pop()
    }
    lines(dist){  
        push()
        strokeWeight(10)
        stroke("#FF6200")
       for (let i = 1; i <= 2; i++) {
           line(dist*i +dist/2 ,(dist/2),dist*i +dist/2,dist*3+(dist/2))
           line((dist/2),dist*i +dist/2 ,dist*3+(dist/2),dist*i +dist/2)

       }
       pop()
    }
    highlight(x,y) {
       // x+=gapBetween/2;y+=gapBetween/2;
       x=mouseX + gapBetween/2,y=mouseY+ gapBetween/2
        if(x>gapBetween*4||y>gapBetween*4||x<gapBetween||y<gapBetween){
            return;
        }

        var ax=int(map(x,gapBetween,gapBetween*3,1,3,true))
        var ay=int(map(y,gapBetween,gapBetween*3,1,3,true))
        push()
        rectMode(CENTER)

        fill(255,100)
        strokeWeight(10)
        stroke("#394249");
        rect(ax*gapBetween,ay*gapBetween,gapBetween,gapBetween,20)
        pop()
    }
    set(val){
        var x=mouseX + gapBetween/2,y=mouseY+ gapBetween/2
        if(x>gapBetween*4||y>gapBetween*4||x<gapBetween||y<gapBetween){
            return;
        }
        var ax=int(map(x,gapBetween,gapBetween*3,1,3,true))-1
        var ay=int(map(y,gapBetween,gapBetween*3,1,3,true))-1;
        //this.arr[ay][ax]=val;
        if(this.arr[ay][ax]!=""){
            return;
        }
        switch (val) {
            case "O":
                this.arr[ay][ax]="O"
                break;
            case "X":
                this.arr[ay][ax]="X"
                break;
            default:
                break;
        }
        
        
        if(turn ==="X"){turn="O"}
        else if(turn ==="O"){turn="X"}
        this.updateData()
    }
    updateData() {
        database.ref('/').update({
            arr: this.arr,
            activeTurn : turn
          });
    }
    updateArray() {
        var arrRef = database.ref('arr');
         arrRef.on("value",(data)=>{
      this.arr = data.val();
    })
    var turnRef = database.ref('activeTurn');
    turnRef.on("value", function (data) {
        turn = data.val();
    })
    }
    check(arr){
         winner =null;
        if(gameState="play"){          
            // horizontal
            for (let i = 0; i < 3; i++) {
                if (equals3(arr[i][0], arr[i][1], arr[i][2])) {
                winner = arr[i][0];
                }
            }
            
            // Vertical
            for (let i = 0; i < 3; i++) {
                if (equals3(arr[0][i], arr[1][i], arr[2][i])) {
                winner = arr[0][i];
                }
            }
            // Diagonal
            if (equals3(arr[0][0], arr[1][1], arr[2][2])) {
                winner = arr[0][0];
            }
            if (equals3(arr[2][0], arr[1][1], arr[0][2])) {
                winner = arr[2][0];
            }
        }
      
        if(winner == null){
            var empty = false
            for (let i = 0; i < arr.length; i++) {
               for (let j = 0; j < arr[i].length; j++) {
                    if (arr[i][j]=="")
                       empty = true                  
               }              
            }
            if(empty== false){
                winner ="Nobody"
            }
        }
        if(winner){
            gameState="end"
            push()
            //textFont("COMICS")
            textSize(50)
            textAlign(CENTER)
            //text(winner +" Wins", width/2,gapBetween*0.5,)
            pop()
        }
        
    }
}
function equals3(a, b, c) {
    return (a == b && b == c && a != '');
  }

  