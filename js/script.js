console.log('Project 1. Author : Norman Teodoro')

// define game area
const gameArea = document.querySelector('#screen')

const messageDisplay = document.querySelector('#game-message')
messageDisplay.innerText = 'Hamster, The Candy Hunter'

// y limit 360 - height of element
//render hamster -- this will always be the position of the hamster
let imgHamster = new Image()
imgHamster.src = 'images/hamster.png'
let imgCandy = new Image()
imgCandy.src = 'images/candy-sticker.png'

let gameMessage = ''

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
  constructor (x, y, width, height, imgSrc) {
    this.x = x
    this.y = y
    this.width = width
    this.height = height
    this.img = imgSrc
    this.token = Math.floor(Math.random() * 3) + 1
  }
  render () {
    // use image to draw on canvas
    ctx.drawImage(this.img, this.x, this.y)
    ctx.font = 'bold 20px "IBM Plex Sans Thai Looped"'
    ctx.fillStyle = 'rgb(0,0,0)'
    ctx.fillText(`Tokens :${turn.token}`, 390, 20)
    ctx.fillText(`Candies : ${points}`, 260, 20)
    ctx.fillText(gameMessage, 20, 350)
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

// initial points,display
let points = 0

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

const hamster = new gameElement(0, 0, 40, 40, imgHamster)
hamster.render()

// x,y limit for target elements
let x = 420
let y = 280
const candyOne = new gameElement(randomise(x), randomise(y), 40, 40, imgCandy)
const candyTwo = new gameElement(randomise(x), randomise(y), 40, 40, imgCandy)

// variable to know if player has moved the x/y axis
let xMove = false
let yMove = false

function movementHandler () {
  // random speed for difficulty
  let speed = Math.floor(Math.random() * 50) + 5

  if (pressedKeys.ArrowRight && hamster.x <= 450 && xMove == false) {
    hamster.x += speed
    moveSound.play()
  }

  if (pressedKeys.ArrowDown && yMove == false && hamster.y <= 300) {
    hamster.y += speed
    moveSound.play()
  }

  if (pressedKeys.ArrowRight == false) {
    xMove = true
  }
  if (pressedKeys.ArrowDown == false) {
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
    points += 1
    // pointsDisplay.innerText = `Candies collected : ${points}`
    turn.token = procTokens(turn.token, 1)
    gameMessage = 'Good job! You win 1 token.'
    hitSound.play()
  } else {
    missedSound.play()
    gameMessage = 'Sorry! Try again.'
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
      detectHit()
      stopInterval()
    }
  } else {
    movementHandler()
  }

  // render elements here
  candyOne.render()
  candyTwo.render()
  hamster.render()
}

function drawMsg (msg, x, y) {
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

function soundByte (src) {
  this.sound = document.createElement('audio')
  this.sound.src = src
  this.sound.setAttribute('preload', 'auto')
  this.sound.setAttribute('controls', 'none')
  this.sound.style.display = 'none'
  document.body.appendChild(this.sound)
  this.play = function () {
    this.sound.play()
  }
  this.stop = function () {
    this.sound.pause()
  }
}

let moveSound = new soundByte('media/move.wav')
let hitSound = new soundByte('media/detecthit.wav')
let gameOver = new soundByte('media/gameover.wav')
let missedSound = new soundByte('media/nohit.wav')

let endGame = false
drawMsg('Press Enter key to start game.', 100, 180)

document.addEventListener('keydown', e => {
  if (e.key == 'Enter') {
    // traps pressing enter key after pressing right/down arrow key
    if (xMove || yMove) {
      missedSound.play()
      turn.token = procTokens(turn.token, -1)
    }
    gameMessage = ``
    reinitialise()
    stopInterval()
    if (turn.token != 0) {
      setTimeout(startGame(), 3000)
    } else {
      ctx.clearRect(0, 0, gameArea.width, gameArea.height)
      drawMsg('Game over! Your score : ' + points, 105, 180)
      gameOver.play()
      if (endGame && turn.token == 0) {
        location.reload()
      }
      endGame = true
    }
  }
})
