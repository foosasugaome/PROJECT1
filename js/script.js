console.log('hello from your console.')

const locationDisplay = document.querySelector('#loc-disp')

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

// document.addEventListener('keydown', (event)=> {
//     console.log(event); // all event related info
//     console.log(event.type);
//     console.log(event.key);
//     console.log(event.code);
// });

// class to create position of elements
class gameElement {
  constructor (x, y, width, height, color,imgSrc) {
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
    ctx.drawImage(this.img, this.x, this.y);
    // ctx.fillStyle = this.color
    // ctx.fillRect(this.x, this.y, this.width, this.width)
  }
}

// store player tokens
class playerToken {
  constructor (token) {
    this.token += token
  }
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

const hamster = new gameElement(0, 0, 40, 40, '#FFFFFF',imgHamster)
hamster.render()

// x,y limit for target elements
let x = 460
let y = 300
const candyOne = new gameElement(randomise(x), randomise(y), 40, 40, 'coral', imgCandy)
const candyTwo = new gameElement(randomise(x), randomise(y), 40, 40, 'coral', imgCandy)

// variable to know if player has moved the x/y axis
let xMove = false
let yMove = false

function movementHandler () {
  const speed = 10
  locationDisplay.innerText = `X:${hamster.x} Y:${hamster.y}`
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
  if (pressedKeys.ArrowDown && xMove && yMove == false) hamster.y += speed
  if (pressedKeys.ArrowDown == false) {
    // toggle condition for the hamster to stop traversing the y axis
    yMove = true
  }
}

// if (pressedKeys.Enter) {
//   console.log(e.key)
// }

// setup the gameloop
let gameLoopInterval = setInterval(looper, 60)
function looper () {
  ctx.clearRect(0, 0, gameArea.width, gameArea.height)

  if (xMove && yMove) {
    // call colision function here.
    console.log(`xMove: ${xMove} yMove: ${yMove}`)
    console.log(hamster.token)    
    clearInterval(gameLoopInterval)
  } else {
    // invoke movementHandler function here
    movementHandler()
  }

  // render elements here
  candyOne.render()
  candyTwo.render()
  hamster.render()
}
