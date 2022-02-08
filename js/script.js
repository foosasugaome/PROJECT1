console.log('hello from your console.')

// const timerDisplay = document.querySelector('#timer')
const tokenDisplay = document.querySelector('#token')
const messageDisplay = document.querySelector('#game-message')
messageDisplay.innerText = 'Hello! Please read instructions below before you start.'

// define game area
const gameArea = document.querySelector('#screen')

// canvas rendering
const ctx = gameArea.getContext('2d')

gameArea.setAttribute('height', getComputedStyle(gameArea)['height'])
gameArea.setAttribute('width', getComputedStyle(gameArea)['width'])

// capture user input
const pressedKeys = {}
document.addEventListener('keydown', e => (pressedKeys[e.key] = true))
document.addEventListener('keyup', e => (pressedKeys[e.key] = false))

// class to create position of elements
class gameElement {
  constructor (x, y, width, height, color, imgSrc) {
    this.x = x
    this.y = y
    this.width = width
    this.height = height
    this.color = color
    this.img = imgSrc
    this.token = Math.floor(Math.random() * 3) + 1
  }
  render () {
    // use image to draw on canvas
    ctx.drawImage(this.img, this.x, this.y)
    // ctx.fillStyle = this.color
    // ctx.fillRect(this.x, this.y, this.width, this.width)
  }
}

// store player tokens
class turnToken {
  constructor (token) {
    this.token = token
  }
}

//initial value of tokens
let token = 3
let turn = new turnToken(token)

// function to compute tokens
function procTokens (tok, i) {
  tok += i
  return tok
}

function randomise (limit) {
  // set lower limit of random number so it will never hit starting area of hamster
  let min = 60
  // must pass a limit value -- usually the end of x and y axis
  let number = Math.floor(Math.random() * (limit - min)) + min
  return number
}

// y limit 360 - height of element
//render hamster -- this will always be the position of the hamster
let imgHamster = new Image()
imgHamster.src = 'images/hamster.png'
let imgCandy = new Image()
imgCandy.src = 'images/candy-sticker.png'

const hamster = new gameElement(0, 0, 40, 40, '#FFFFFF', imgHamster)
hamster.render()

// x,y limit for target elements
let x = 420
let y = 280
const candyOne = new gameElement(
  randomise(x),
  randomise(y),
  40,
  40,
  'coral',
  imgCandy
)
const candyTwo = new gameElement(
  randomise(x),
  randomise(y),
  40,
  40,
  'coral',
  imgCandy
)

// variable to know if player has moved the x/y axis
let xMove = false
let yMove = false
tokenDisplay.innerText = `Tokens :${turn.token}`

function movementHandler () {
  // random speed for difficulty
  const speed = Math.floor(Math.random() * 50) + 10
  if (
    pressedKeys.ArrowRight &&
    hamster.x <= 450 &&
    yMove == false &&
    xMove == false
  ) {
    hamster.x += speed
  }
  if (pressedKeys.ArrowRight == false) {
    // toggle condition for the hamster to stop traversing the x axis
    xMove = true
  }
  if (pressedKeys.ArrowDown && xMove && yMove == false && hamster.y <= 300)
    hamster.y += speed
  if (pressedKeys.ArrowDown == false) {
    // toggle condition for the hamster to stop traversing the y axis
    yMove = true
  }
}

// collision
function detectHit () {
  if (
    (hamster.x + hamster.width - 30 >= candyOne.x - 20 &&
      hamster.x - 20 <= candyOne.x + candyOne.width - 30 &&
      hamster.y + hamster.height - 30 >= candyOne.y - 20 &&
      hamster.y - 20 <= candyOne.y + candyOne.height - 30) ||
    (hamster.x + hamster.width - 30 >= candyTwo.x - 20 &&
      hamster.x - 20 <= candyTwo.x + candyTwo.width - 30 &&
      hamster.y + hamster.height - 30 >= candyTwo.y - 20 &&
      hamster.y - 20 <= candyTwo.y + candyTwo.height - 30)
  ) {
    turn.token = procTokens(turn.token, 1)
    console.log(hamster.width, candyOne.x)
    messageDisplay.innerText = 'Good job! Hamster caught a candy! You win 1 token.'
  } else {
    messageDisplay.innerText = 'Sorry! Try again.'
  }
}

let gameLoopInterval

function startGame () {  
  gameLoopInterval = setInterval(looper, 60)
}

function stopInterval () {
  clearInterval(gameLoopInterval)
  gameLoopInterval = null
}

function looper () {
  ctx.clearRect(0, 0, gameArea.width, gameArea.height)

  if (xMove && yMove) {
    if (turn.token === 0) {
      stopInterval()
    } else {      
      turn.token = procTokens(turn.token, -1)
      detectHit()
      stopInterval()
    }
    tokenDisplay.innerText = `Tokens :${turn.token}`
  } else {
    movementHandler()
  }

  // render elements here
  console.log(hamster.token)
  candyOne.render()
  candyTwo.render()
  hamster.render()
}

function drawMsg (msg,x,y) {
  ctx.beginPath()
  ctx.rect(0, 0, 500, 360)
  ctx.fillStyle = 'rgb(240, 216, 188)'
  ctx.fill()
  ctx.closePath()
  ctx.font = 'bold 23px "IBM Plex Sans Thai Looped"'
  ctx.fillStyle = 'rgb(0,0,0)'
  ctx.fillText(msg, x, y)  
}


function reinitialise () {
  xMove = false
  yMove = false
  hamster.x = 0
  hamster.y = 0
  candyOne.x = randomise(x)
  candyOne.y = randomise(y)
  candyTwo.x = randomise(x)
  candyTwo.y = randomise(y)
  pressedKeys.ArrowDown = null
  pressedKeys.ArrowRight = null
  speed = Math.floor(Math.random() * 50) + 10
}
drawMsg("Press Enter key to start game.",100,180)
document.addEventListener('keydown', e => {
  if (e.key == 'Enter') {
    
    messageDisplay.innerText = `You have ${turn.token} left.`
    reinitialise()
    stopInterval()
    if (turn.token != 0) {
      setTimeout(startGame(), 3000)
    } else {
      ctx.clearRect(0, 0, gameArea.width, gameArea.height)
      drawMsg("Game over!",180,180)
      messageDisplay.innerHTML =
        'Click <a href=index.html>here</a> to try again.'
    }
  }
})
