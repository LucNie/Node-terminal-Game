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

  setTimeout(() => {
    frameRateController()
  }
  , frameRateInterval)
}



function initController () {
  // remove old listener
  process.stdin.removeAllListeners('keypress')

  readline.emitKeypressEvents(process.stdin)
  process.stdin.setRawMode(true)

  process.stdin.on('keypress', (str, key) => {
    if (key.name == '8') {
      dataController.instance.players[0].position[0]--
    } else if (key.name == '2') {
      dataController.instance.players[0].position[0]++
    } else if (key.name == '4') {
      dataController.instance.players[0].position[1]--
    } else if (key.name == '6') {
      dataController.instance.players[0].position[1]++
    } else if (key.name == '0') {
      process.exit(0)
    }
  })

  frameRateController()
}

module.exports = {
  initController
}
