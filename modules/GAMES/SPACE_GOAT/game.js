'use-strict'
// const instance = require('./modules/instanceController.js')
const dataController = require('./modules/dataController.js')
const renderController = require('./modules/renderController.js')

module.exports = {
  start
}

// Path: main\hidden\Node-terminal-Game\modules\GAMES\ELITE\game.js

function start () {
  dataController.initData()
  dataController.buildMap('0-0')
  renderController.mainRender()

  return true
}
