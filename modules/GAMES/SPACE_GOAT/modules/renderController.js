'use-strict'
const dataController = require('./dataController.js')
// dotenv
require('dotenv').config()
// 0.vide , 1.white, 2.grey , 3.red, 4.green, 5.blue, 6.yellow, 7.orange, 8.purple, 9.pink, 10.brown, 11.black
const asciiRendu = [' ', '█', '▒', '\x1b[31m█\x1b[0m', '\x1b[32m█\x1b[0m', '\x1b[34m█\x1b[0m', '\x1b[33m█\x1b[0m', '\x1b[33m█\x1b[0m', '\x1b[35m█\x1b[0m', '\x1b[35m█\x1b[0m', '\x1b[33m█\x1b[0m', '\x1b[30m█\x1b[0m']

/**
 * @param {} aaMultiplicater 
 * @returns 
 */
function mainRender() { // aMultiplicater = 1 / 2 / 4

  if (process.env.SPACE_NO_RENDER === 'true') {
    return
  }

  let _rendermap = ''



  //   console.log(dataController.instanceMap['0-0'][0][0])
  //   process.exit(0)
  let _debug = false

  for (let i = 0; i < 16; i++) { // ligne
    for (let k = 0; k < 4; k++) { // ligne
      for (let j = 0; j < 32; j++) { // column
        for (let l = 0; l < 4; l++) { // column
          if (renderPlayer([i * 4 + k, j * 4 + l]) != undefined) {
            _rendermap += asciiRendu[renderPlayer([i * 4 + k, j * 4 + l])].repeat(parseInt(process.env.SPACE_MULTIPLICATEUR))
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

function renderPlayer(aCoordonate) { // [x,y]

  // for test Plutar is standing pose 
  //plutar = 8px x 8px

  // console.log(dataController.instance.players[0].position[0])
  // process.exit(0) 



  if (dataController.instance.players[0].position[0] <= aCoordonate[0] + 8 && dataController.instance.players[0].position[0] > aCoordonate[0] && dataController.instance.players[0].position[1] <= aCoordonate[1] + 8 && dataController.instance.players[0].position[1] > aCoordonate[1]) { // if player is in the render zone

    // debug mod
    if (process.env.DEV === 'true') {

      // write top left corner with red color
      if (dataController.instance.players[0].position[0] === aCoordonate[0] + 8 && dataController.instance.players[0].position[1] === aCoordonate[1] + 8) {
        return 4
      }
      // write top right corner with green color
      if (dataController.instance.players[0].position[0] === aCoordonate[0] + 8 && dataController.instance.players[0].position[1] === aCoordonate[1]+1) {
        return 4
      }

      // write bottom left corner with blue color
      if (dataController.instance.players[0].position[0] === aCoordonate[0] + 1 && dataController.instance.players[0].position[1] === aCoordonate[1] + 8) {
        return 4
      }

      // write bottom right corner with yellow color
      if (dataController.instance.players[0].position[0] === aCoordonate[0] + 1 && dataController.instance.players[0].position[1] === aCoordonate[1] + 1) {
        return 4
      }

      return 9
    }



    //FULL OPTIMIZED CODE #HAPPY 
    function drawfront(aSpriteArray) {
      const left = dataController.instance.players[0].rotation === 0 ? false : true
      if (!left) {
        return aSpriteArray[aCoordonate[0] - dataController.instance.players[0].position[0] + 8][aCoordonate[1] - dataController.instance.players[0].position[1] + 8] === 0 ? undefined : aSpriteArray[aCoordonate[0] - dataController.instance.players[0].position[0] + 8][aCoordonate[1] - dataController.instance.players[0].position[1] + 8]
      }
      else {
        const _sprite = [...aSpriteArray[aCoordonate[0] - dataController.instance.players[0].position[0] + 8]].reverse()
        return _sprite[aCoordonate[1] - dataController.instance.players[0].position[1] + 8] === 0 ? undefined : _sprite[aCoordonate[1] - dataController.instance.players[0].position[1] + 8]
      }
    }

    // TODO need to moov to the local player object
    let fall = false
    let run = false


    if (dataController.instance.players[0].velocity[1] !== 0) { // fall
      fall = true
    }
    if (dataController.instance.players[0].velocity[0] !== 0) { // run
      run = true
    }

    if (!fall && !run) { // stand
      return drawfront(dataController.plutar.stand)
    }

    if (!fall && run) { // jump
      return drawfront(dataController.plutar.jump)
    }

    if (fall && !run) {
      return drawfront(dataController.plutar.run)
    }

    if (fall && run) { // fall and run
      return drawfront(dataController.plutar.fall_run)
    }

  }
}



module.exports = {
  mainRender
}