'use-strict'
// const instance = require('./modules/instanceController.js')
const dataController = require('./modules/dataController.js')
const renderController = require('./modules/renderController.js')
const instanceController = require('./modules/instanceController.js')

module.exports = {
  start
}

// Path: main\hidden\Node-terminal-Game\modules\GAMES\ELITE\game.js

function start() {
  dataController.initData()
  dataController.playerInit()
  dataController.buildMap('0-0')
  renderController.mainRender()
  instanceController.initController()

  return true
}

function connect() {
  dataController.initData()
  dataController.playerInit()
  dataController.buildMap('0-0')
  renderController.mainRender()
  instanceController.initController()

  return true
}
