'use-strict'
const dataController = require('./dataController.js')
// vide , white, grey , red, green, blue, yellow, orange, purple, pink, brown, black
const asciiRendu = ['  ', '██', '▒▒', '\x1b[31m██\x1b[0m', '\x1b[32m██\x1b[0m', '\x1b[34m██\x1b[0m', '\x1b[33m██\x1b[0m', '\x1b[33m██\x1b[0m', '\x1b[35m██\x1b[0m', '\x1b[35m██\x1b[0m', '\x1b[33m██\x1b[0m', '\x1b[30m██\x1b[0m']

function mainRender () { // aMultiplicater = 1 / 2 / 4
  let _rendermap = ''

  //   console.log(dataController.instanceMap['0-0'][0][0])
  //   process.exit(0)

  for (let i = 0; i < 16; i++) { // ligne
    for (let k = 0; k < 4; k++) { // ligne
      for (let j = 0; j < 32; j++) { // column
        for (let l = 0; l < 4; l++) { // column
          _rendermap += asciiRendu[dataController.instanceMap[dataController.currentMap][i][j][k][l]]
        }
      }

      _rendermap += '\n'
    }
    console.log(i)
  }

  console.clear()
  console.log(_rendermap)

  return _rendermap
}

module.exports = {
  mainRender
}
