'use-strict'
const dataController = require('./dataController.js')
const renderController = require('./renderController.js')
// dotenv
require('dotenv').config()
const readline = require('readline')

// create the frame-rate controller
function frameRateController () {
  const frameRate = process.env.FRAME_RATE
  const frameRateTime = 1000 / frameRate

  renderController.mainRender()

  setTimeout(() => {
    frameRateController()
  }
  , frameRateTime)
}



function initController () {
  readline.emitKeypressEvents(process.stdin)
  process.stdin.setRawMode(true)

  process.stdin.on('keypress', (str, key) => {
    if (key.name == '8') {
      console.log('up')
    } else if (key.name == '2') {
      console.log('down')
    } else if (key.name == '4') {
      console.log('left')
    } else if (key.name == '6') {
      console.log('right')
    } else if (key.name == '0') {
      process.exit()
    }
  })

  frameRateController()
}

module.exports = {
  initController
}
