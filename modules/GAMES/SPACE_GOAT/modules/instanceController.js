'use-strict'
const dataController = require('./dataController.js')
const renderController = require('./renderController.js')
// dotenv
require('dotenv').config()
const readline = require('readline')

let grounded = true


// create the frame-rate controller
function frameRateController () {
  const frameRate = process.env.FRAME_RATE // 60
  const frameRateInterval = 1000 / frameRate // 1000ms / 60 = 16.666666666666668 ms

  renderController.mainRender()

  let oldPosition = [dataController.instance.players[0].position[0], dataController.instance.players[0].position[1]]
  let oldVelocity = [dataController.instance.players[0].velocity[0], dataController.instance.players[0].velocity[1]]


 
  if (dataController.instance.players[0].velocity[0] > 0) { // if the player velocity go up
    //moov
    dataController.instance.players[0].position[0] -= Math.round(dataController.instance.players[0].velocity[0] / 4)

  } else if (dataController.instance.players[0].velocity[0] < 0) { // if the player velocity go down
    dataController.instance.players[0].position[0] -= Math.round(dataController.instance.players[0].velocity[0] / 4)
  } else if (dataController.instance.players[0].velocity[0] === 0) {
    // do nothing
  }

  // moov in the y axis
  if (dataController.instance.players[0].velocity[1] > 0) { // if the player velocity go right
    //moov
    dataController.instance.players[0].position[1] += Math.round(dataController.instance.players[0].velocity[1] / 4)
    //decrease velocity
    dataController.instance.players[0].velocity[1] -= 1

  } else if (dataController.instance.players[0].velocity[1] < 0) { // if the player velocity go left

    dataController.instance.players[0].position[1] += Math.round(dataController.instance.players[0].velocity[1] / 4)
    //decrease velocity
    dataController.instance.players[0].velocity[1] += 1

  } else if (dataController.instance.players[0].velocity[1] === 0) {
    // do nothing
  }


  // simulate gravity
  if (dataController.instance.players[0].position[0] < 60 && grounded === false) {
    dataController.instance.players[0].velocity[0] -= 1
  }

  grounded = false // reset grounded

  //gestion rotation player
  if (dataController.instance.players[0].velocity[1] > 0) {
    dataController.instance.players[0].rotation = 0
  } else if (dataController.instance.players[0].velocity[1] < 0) {
    dataController.instance.players[0].rotation = 1
  }

  

  // boundCollider();
  collider(oldPosition,oldVelocity) //oldPosition x and y of the player before the moov



  setTimeout(() => {
    frameRateController()
  }
  , frameRateInterval)

}

  //simulate velocity up and down


function boundCollider(){
  if (dataController.instance.players[0].position[0] > 60) { //vertical bound
    dataController.instance.players[0].position[0] = 60
    dataController.instance.players[0].velocity[0] = 0

  } else if (dataController.instance.players[0].position[0] < 8 ) {
    
    dataController.instance.players[0].position[0] = 8

  }

  if (dataController.instance.players[0].position[1] > 125) { //horizontal bound
    dataController.instance.players[0].position[1] = 125
    dataController.instance.players[0].velocity[1] = 0
  }
  else if (dataController.instance.players[0].position[1] < 11) {
    dataController.instance.players[0].position[1] = 11
    dataController.instance.players[0].velocity[1] = 0
  }
}

function collider(aOldPosition,aOldVelocity){ //Plutar have 6x7px collider
  
  //detect block collision 

  const playerPosition = dataController.instance.players[0].position
  // playerVelocity = dataController.instance.players[0].velocity //not used
  const colision = detectCollision() //return bottomLeft, bottomRight, floorLeft, floorRight 

      // if (colision.bottomLeft === true || colision.bottomRight === true ) {
      //   dataController.instance.players[0].position[0] -= 1
      //   dataController.instance.players[0].velocity[0] = 0
      //   grounded = true
      // } else if (colision.floorRight === true || colision.bottomRight === true) {
      //   dataController.instance.players[0].velocity[0] = 0
      //   grounded = true
      // }



}

function detectCollision(){
  const playerPosition = dataController.instance.players[0].position
  const _pixelMap = dataController.pixelInstancedMap[dataController.currentMap]

  //colision
  const topLeft = _pixelMap[playerPosition[0]][playerPosition[1]] !== 0
  const topRight = _pixelMap[playerPosition[0]-7][playerPosition[1]] !== 0
  // const bottomLeft = _pixelMap[playerPosition[0]+8][playerPosition[1]] !== 0
  // const bottomRight = _pixelMap[playerPosition[0]][playerPosition[1]+8] !== 0
  // const floorLeft = _pixelMap[playerPosition[0]+9][playerPosition[1]] !== 0
  // const floorRight = _pixelMap[playerPosition[0]+9][playerPosition[1]+8] !== 0

  const debugRendu = { topLeft, topRight}

  // rendu debug
  for(let i = 0 ; i < Object.keys(debugRendu).length ; i++){
    console.log(Object.keys(debugRendu)[i] , "\x1b[33m" + debugRendu[Object.keys(debugRendu)[i]] + "\x1b[0m")
  } 

  console.log(playerPosition)
  console.log("topleft : ["  )
  // collision bottom left
  // const bottomLeft = dataController.instanceMap[dataController.currentMap][Math.round(playerPosition[0]/4)-1][Math.round(playerPosition[1]/4)-2 ][playerPosition[0]%4][playerPosition[1]%4] !== 0
  // const bottomRight = dataController.instanceMap[dataController.currentMap][Math.round(playerPosition[0]/4)-1][Math.round(playerPosition[1]/4)-1 ][playerPosition[0]%4][playerPosition[1]%4] !== 0
  // const floorLeft = dataController.instanceMap[dataController.currentMap][Math.round(playerPosition[0]/4)][Math.round(playerPosition[1]/4)-2 ][playerPosition[0]%4][playerPosition[1]%4] !== 0
  // const floorRight = dataController.instanceMap[dataController.currentMap][Math.round(playerPosition[0]/4)][Math.round(playerPosition[1]/4)-1 ][playerPosition[0]%4][playerPosition[1]%4] !== 0
  // const topLeft = dataController.instanceMap[dataController.currentMap][Math.round(playerPosition[0]/4)-1][Math.round(playerPosition[1]/4)-2 ][playerPosition[0]%4][playerPosition[1]%4] !== 0
  // const topRight = dataController.instanceMap[dataController.currentMap][Math.round(playerPosition[0]/4)-1][Math.round(playerPosition[1]/4)-1 ][playerPosition[0]%4][playerPosition[1]%4] !== 0

  



  // return { topLeft, topRight, bottomLeft, bottomRight, floorLeft, floorRight }
}



function initController () {
  
  process.stdin.removeAllListeners('keypress')

  readline.emitKeypressEvents(process.stdin)
  process.stdin.setRawMode(true)

  process.stdin.removeAllListeners('keypress')

  readline.emitKeypressEvents(process.stdin)
  process.stdin.setRawMode(true)

  process.stdin.on('keypress', (str, key) => {
    if (key.name == '8') {
      dataController.instance.players[0].velocity[0] === 0 ? dataController.instance.players[0].velocity[0] += 10 : null

    } else if (key.name == '2') {
      //not used 
    } else if (key.name == '0') {
      process.exit(0)
    }
  })

  process.stdin.on('keypress', (str, key) => {
    if (key.name == '4') {
      dataController.instance.players[0].velocity[1] < -20 ? null : dataController.instance.players[0].velocity[1] -= 5
    }})
    
  process.stdin.on('keypress', (str, key) => {
   if (key.name == '6') {
    dataController.instance.players[0].velocity[1] > 20 ? null : dataController.instance.players[0].velocity[1] += 5
    // dataController.instance.players[0].velocity[1] += 5
  }
  })
  

  frameRateController()
}


module.exports = {
  initController
}

/**
 * 



 */