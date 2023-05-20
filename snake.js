let lastRenderTime = 0
const gameBoard = document.getElementById('gameboard')
const seqBoard = document.getElementById('sequenceboard')
const left=document.getElementById('leftbutton')
const right=document.getElementById('rightbutton')
const above=document.getElementById('upbutton')
const down=document.getElementById('downbutton')
const pasueses = document.getElementById('pausebutton')
let snakespeed=7
let Time=45
let timer=0
let c=0
const scoreElement = document.querySelector(".score")
const HighscoreElement=document.querySelector(".highscore")
const timeElement = document.querySelector(".time")
let Score=0
let gameover = 0
let secondssincelast
let pause = false
let request

function main(currentTime){

if (gameover === 1){
    if (confirm('You lost press ok to restart')){
      window.location ='/'
    }
    if(!hs.includes(Score)){
    hs.push(Score)
    hs.sort((a,b)=>b-a)
    hs.pop()
    }
    for(let i=0;i<5;i++){
      localStorage.setItem(localhigh[i],JSON.stringify(hs[i]))
    }
    return
  }
if(!pause){
  request=requestAnimationFrame(main)
}    
  secondssincelast= (currentTime- lastRenderTime) / 1000
  if (secondssincelast < 1/snakespeed) return
  lastRenderTime=currentTime
  loop()
  scoreElement.innerText=`Score: ${Score}`
  HighscoreElement.innerText=`High Score: ${hs[0]}`
  timer+=secondssincelast
  if(inputDirection.x ==0 && inputDirection.y ==0)return
  if(timer <1) return
  Time-=1
  timer=0
  timeElement.innerText=`Time: ${Time}`
}

window.requestAnimationFrame(main)

function loop(){
  updatesnake()
  gameBoard.innerHTML=''
  if (c===0){
    randomfoodncoords()
   }
  c=1
  drawsnake(gameBoard)
  high()
  generate(foodtype,coords)
  passcheck()
  checkgame(snakeBody[0])
}

const snakeBody = [{x:14, y:15},{x: 15, y:15},{x: 17, y:15}]

function pausegame(){
  if(!pause){
    cancelAnimationFrame(request)
    window.removeEventListener('keydown',changedirection)
    window.removeEventListener('mousedown',changedirection)
    document.getElementById('pausebutton').style.backgroundImage='url(files/play.png)'
    pause = true
  }
}
function playgame(){
  if(pause){
    pause = false
    addEventListener('keydown',changedirection)
    addEventListener('mousedown',changedirection)
    document.getElementById('pausebutton').style.backgroundImage='url(files/pause.png)'
    main()
  }
}

function updatesnake(){
  const input = getInputDirection()
  for( let i=snakeBody.length-2; i>=0; i--){
    snakeBody[i+1] = { ...snakeBody[i] }
  }

  snakeBody[0].x +=input.x
  snakeBody[0].y +=input.y
}

function drawsnake(gameBoard){
  const headElement = document.createElement('div')
  headElement.style.gridRowStart = snakeBody[0].y
  headElement.style.gridColumnStart = snakeBody[0].x
  headElement.classList.add('head')
  gameBoard.appendChild(headElement)
  for(let i=1;i<=snakeBody.length-1;i++){
    const snakeElement = document.createElement('div')
    snakeElement.style.gridRowStart = snakeBody[i].y
    snakeElement.style.gridColumnStart = snakeBody[i].x
    snakeElement.classList.add('body')
    gameBoard.appendChild(snakeElement)
  } 
}

let position

function onsnake(position){
  return equalPositions(snakeBody[0],position)
}

function equalPositions(pos1, pos2){
  return pos1.x === pos2[0] && pos1.y === pos2[1]
  
}

let inputDirection = { x:0, y:0}
let lastinput = {x:0, y:0}
let hold=0

window.addEventListener('keydown',changedirection)
window.addEventListener('mousedown',changedirection)
window.addEventListener('keydown',pausegamee)
window.addEventListener('mousedown',pausegamee)

function pausegamee(e){
  if(e.key==' '||e.target==pasueses){
    if(hold%2==0){
      hold+=1
      pausegame()
      Time=Time+1
      return
    }
    if(hold%2!==0){
      hold+=1
      playgame()
      return
    }
  } 
}
function changedirection(e){
  
  if(e.key== 'ArrowUp' || e.target==above){
    if(lastinput.y==0){
      inputDirection = {x:0, y: -1}
    }
  }
  if(e.key== 'ArrowDown' || e.target==down){
    if(lastinput.y==0){
      inputDirection = { x:0, y: 1}
    }
  }
  if(e.key=='ArrowLeft'|| e.target==left ){
    if(lastinput.x==0){
      inputDirection = { x:-1, y: 0}
    }
  }  
  if(e.key=='ArrowRight'|| e.target==right){
    if(lastinput.x==0){
      inputDirection = { x:1, y: 0}
    }
  } 
}

function getInputDirection(){
  lastinput=inputDirection
  return inputDirection
}

let foodtype=[]
let coords=[]
let clone=[]

function randomfoodncoords(){
  for(let i=0;i<5;i++){
    randomnumber(foodtype)
  }
  for(let i=0;i<5;i++){
    randomcoord(coords)
  }
  clone=foodtype.slice()
}

let y

function randomnumber(array){
    y=Math.floor(Math.random()*10)+1
    if(!array.includes(y)){
      array.push(y)
      return
    }
    randomnumber(array)
}

let xcoord,ycoord

function randomcoord(arr){
  xcoord=Math.floor(Math.random()*30)+1
  ycoord=Math.floor(Math.random()*30)+1
  const tempo=[]
  tempo.push(xcoord)
  tempo.push(ycoord)
  if(!arr.includes(tempo)){
    arr.push(tempo)
    return
  }
  randomcoord(arr)
}

function generate(arr1,arr2){
    for(let i=0;i<foodtype.length;i++){
      const foodadderelement = document.createElement('div')
      foodadderelement.style.gridRowStart= arr2[i][1]
      foodadderelement.style.gridColumnStart= arr2[i][0]
      switch(arr1[i]){
        case 1:
          foodadderelement.classList.add('food1')
          
          break
        case 2:
          foodadderelement.classList.add('food2')
          
          break
        case 3:
          foodadderelement.classList.add('food3')
          
          break
        case 4:
          foodadderelement.classList.add('food4')
          break
        case 5:
          foodadderelement.classList.add('food5')
          break
        case 6:
          foodadderelement.classList.add('food6')
          break
        case 7:
          foodadderelement.classList.add('food7')
          break
        case 8:
          foodadderelement.classList.add('food8')
          break
        case 9:
          foodadderelement.classList.add('food9')
          break
        case 10:
          foodadderelement.classList.add('food10')
          break
        }
      gameBoard.appendChild(foodadderelement)
    }
    for(let i=0;i<5;i++){
      if(eatelement[i]==2){
          sequencegen(seq[i],clone[i],0)
      }
      if(eatelement[i]==1){
        sequencegen(seq[i],clone[i],2)
      }
      if(eatelement[i]==0){
        sequencegen(seq[i],clone[i],1)
      }
    }
}

let l=0
let eatelement=[2,0,0,0,0]

function passcheck(){
  if(onsnake(coords[0])){
    foodtype.splice(0,1)
    coords.splice(0,1)
    l+=1
    Score+=1
    eatelement[l-1]=1
    eatelement[l]=2
 }
  for(let i=1;i<foodtype.length;i++){
    if(onsnake(coords[i])){
      gameover=1
    }
  }
  if(l==5){
    eatelement=[2,0,0,0,0]
    randomfoodncoords()
    Time+=30
    l=0
  }
  
}

seq=[[1,1],[2,1],[3,1],[4,1],[5,1]]

function sequencegen(seq,n,a){
  const foodElement = document.createElement('div')
  foodElement.style.gridRowStart = seq[1]
  foodElement.style.gridColumnStart = seq[0]
  switch(n){
    case 1:
      if(a==0){
        foodElement.style.border= "medium solid #FF0000"
        foodElement.style.backgroundColor="#ffffff"
        break
      }
      if(a==1){
        foodElement.style.backgroundColor="#ffffff"
        break
      } 
      if(a==2){
        foodElement.style.border= "medium solid #000000"
        foodElement.style.backgroundColor="#ffffff"
        break
      }
    case 2:
      if(a==0){
        foodElement.style.border= "medium solid #FF0000"
        foodElement.style.backgroundColor="#464646"
        break}
      if(a==1){
        foodElement.style.backgroundColor="#464646"
        break} 
      if(a==2){
        foodElement.style.border= "medium solid #000000"
        foodElement.style.backgroundColor="#464646"
        break}
    case 3:
      if(a==0){
        foodElement.style.border= "medium solid #FF0000"
        foodElement.style.backgroundColor="#9c5a3c"
        break}
      if(a==1){
        foodElement.style.backgroundColor="#9c5a3c"
        break} 
      if(a==2){
        foodElement.style.border= "medium solid #000000"
        foodElement.style.backgroundColor="#9c5a3c"
        break}
    case 4:
      if(a==0){
        foodElement.style.border= "medium solid #FF0000"
        foodElement.style.backgroundColor="#ffa3b1"
        break}
      if(a==1){
        foodElement.style.backgroundColor="#ffa3b1"
        break} 
      if(a==2){
        foodElement.style.border= "medium solid #000000"
        foodElement.style.backgroundColor="#ffa3b1"
        break}
    case 5:
      if(a==0){
        foodElement.style.border= "medium solid #FF0000"
        foodElement.style.backgroundColor="#ff8000"
        break}
      if(a==1){
        foodElement.style.backgroundColor="#ff8000"
        break} 
      if(a==2){
        foodElement.style.border= "medium solid #000000"
        foodElement.style.backgroundColor="#ff8000"
        break}
    case 6:
      if(a==0){
        foodElement.style.border= "medium solid #FF0000"
        foodElement.style.backgroundColor="#4f5bff" 
        break}
      if(a==1){
        foodElement.style.backgroundColor="#4f5bff" 
        break} 
      if(a==2){
        foodElement.style.border= "medium solid #000000"
        foodElement.style.backgroundColor="#542674f5bff" 
        break}
    case 7:
      if(a==0){
        foodElement.style.border= "medium solid #FF0000"
        foodElement.style.backgroundColor="#fff200"  
        break}
      if(a==1){
        foodElement.style.backgroundColor="#fff200" 
        break} 
      if(a==2){
        foodElement.style.border= "medium solid #000000"
        foodElement.style.backgroundColor="#fff200" 
        break}
    case 8:
      if(a==0){
        foodElement.style.border= "medium solid #FF0000"
        foodElement.style.backgroundColor="#542673" 
        break}
      if(a==1){
        foodElement.style.backgroundColor="#542673"
        break} 
      if(a==2){
        foodElement.style.border= "medium solid #000000"
        foodElement.style.backgroundColor="#542673"
        break}
    case 9:
      if(a==0){
        foodElement.style.border= "medium solid #FF0000"
        foodElement.style.backgroundColor="#22b14d"
        break}
      if(a==1){
        foodElement.style.backgroundColor="#22b14d"
        break} 
      if(a==2){
        foodElement.style.border= "medium solid #000000"
        foodElement.style.backgroundColor="#22b14d"
        break}
    case 10:
      if(a==0 ){
        foodElement.style.border= "medium solid #FF0000"
        foodElement.style.backgroundColor="#e312ab" 
        break}
      if(a==1){
        foodElement.style.backgroundColor="#e312ab"
        break} 
      if(a==2){
        foodElement.style.border= "medium solid #000000"
        foodElement.style.backgroundColor="#e312ab"
        break}
    }
  seqBoard.appendChild(foodElement)
}

function checkgame(position){
  if(position.x < 1 || position.x > 30 || position.y < 1 || position.y > 30 || Time == 0){
    gameover=1
  }
}

let hs= [0,0,0,0,0]
const localhigh = ['one','two','three','four','five']
let val1
let constant, element;

function high(){
  for(let i=0;i<5;i++){
    val1=localStorage.getItem(localhigh[i])
    if (val1==null){
      hs[i]=0
    }
    else{
    hs[i]=JSON.parse(val1)
    }
    element= document.getElementById("highscorelist")
    children = element.children
    children[i].innerText=`${hs[i]}`
  }
}




