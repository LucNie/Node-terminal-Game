'use-strict'
const dataController = require('./dataController.js')
const renderController = require('./renderController.js')
// dotenv
require('dotenv').config()
const readline = require('readline')


// create the frame-rate controller
function frameRateController () {
  const frameRate = process.env.FRAME_RATE // 60
  const frameRateInterval = 1000 / frameRate // 1000ms / 60 = 16.666666666666668 ms

  renderController.mainRender()

  let oldPosition = [dataController.instance.players[0].position[0], dataController.instance.players[0].position[1]]




  if (dataController.instance.players[0].velocity[0] > 0) { // if the player velocity go up
    //moov
    dataController.instance.players[0].position[0] -= Math.round(dataController.instance.players[0].velocity[0] / 4)
    //decrease velocity
    dataController.instance.players[0].velocity[0] -= 1

  } else if (dataController.instance.players[0].velocity[0] < 0) { // if the player velocity go down

    dataController.instance.players[0].position[0] -= Math.round(dataController.instance.players[0].velocity[0] / 4)

  } else if (dataController.instance.players[0].velocity[0] == 0) {
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

  } else if (dataController.instance.players[0].velocity[1] == 0) {
    // do nothing
  }


  // simulate gravity
  if (dataController.instance.players[0].position[0] < 60) {
    dataController.instance.players[0].velocity[0] -= 1
  }

  //gestion rotation player
  if (dataController.instance.players[0].velocity[1] > 0) {
    dataController.instance.players[0].rotation = 0
  } else if (dataController.instance.players[0].velocity[1] < 0) {
    dataController.instance.players[0].rotation = 1
  }



  boundCollider();

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

function collider(oldPosition){ //Plutar have 6x7px collider
  //check if the player is in the collider with the instanced map
  
  
  
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