'use-strict'
const dataController = require('./dataController.js')
// dotenv
require('dotenv').config()
// vide , white, grey , red, green, blue, yellow, orange, purple, pink, brown, black
const asciiRendu = [' ', '█', '▒', '\x1b[31m█\x1b[0m', '\x1b[32m█\x1b[0m', '\x1b[34m█\x1b[0m', '\x1b[33m█\x1b[0m', '\x1b[33m█\x1b[0m', '\x1b[35m█\x1b[0m', '\x1b[35m█\x1b[0m', '\x1b[33m█\x1b[0m', '\x1b[30m█\x1b[0m']

/**
 * @param {} aaMultiplicater 
 * @returns 
 */
function mainRender () { // aMultiplicater = 1 / 2 / 4
  let _rendermap = ''

  //   console.log(dataController.instanceMap['0-0'][0][0])
  //   process.exit(0)

  for (let i = 0; i < 16; i++) { // ligne
    for (let k = 0; k < 4; k++) { // ligne
      for (let j = 0; j < 32; j++) { // column
        for (let l = 0; l < 4; l++) { // column
          if (renderPlayer([i*4+k,j*4+l]) != undefined) {
            _rendermap += asciiRendu[renderPlayer([i*4+k,j*4+l])].repeat(parseInt(process.env.SPACE_MULTIPLICATEUR))
          } else {
          _rendermap += asciiRendu[dataController.instanceMap[dataController.currentMap][i][j][k][l]].repeat(parseInt(process.env.SPACE_MULTIPLICATEUR))
          }
        }
      }
      _rendermap += '\n'
    }
  }

  console.clear()
  console.log(_rendermap)
  // process.exit(0)

  return _rendermap
}

function renderPlayer (aCoordonate) { // [x,y]

  // for test Plutar is standing pose 
  //plutar = 8px x 8px

  // console.log(dataController.instance.players[0].position[0])
  // process.exit(0) 



  if (dataController.instance.players[0].position[0] <= aCoordonate[0] + 8 && dataController.instance.players[0].position[0] > aCoordonate[0]  && dataController.instance.players[0].position[1] <= aCoordonate[1] + 8 && dataController.instance.players[0].position[1] > aCoordonate[1]) {
    
    // console.log(dataController.instance.players[0].position[0] - aCoordonate[0])
    // return 5
    return dataController.plutar.stand[aCoordonate[0] - dataController.instance.players[0].position[0] + 8][aCoordonate[1] - dataController.instance.players[0].position[1] + 8] === 0 ? undefined : dataController.plutar.stand[aCoordonate[0] - dataController.instance.players[0].position[0] + 8][aCoordonate[1] - dataController.instance.players[0].position[1] + 8]

    // process.exit(0)
  }


}

module.exports = {
  mainRender
}