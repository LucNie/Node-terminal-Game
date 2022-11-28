'use-strict'
const fs = require('fs')
const path = require('path')

// init 2d map array
let instance = []
// let currentMap = '0-0' // level - room
// 1 = collision , 0 = no collision
const devAir = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]] // 4x4 id = 0
const devBlock = [[1, 1, 1, 1], [1, 0, 0, 1], [1, 0, 0, 1], [1, 1, 1, 1]] // 4x4 id = 1
const devFullBlock = [[1, 1, 1, 1], [1, 1, 1, 1], [1, 1, 1, 1], [1, 1, 1, 1]] // 4x4 id = 2
const devTopPlatfrom = [[1, 1, 1, 1], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]] // 4x4 id = 3

// creat map
function buildMap (aMap) { // string "0-0"
  // read map file "../DATA/MAPS/0-0.json"
  let _rawMap = fs.readFileSync(path.join(__dirname, '../DATA/MAPS/' + aMap + '.map'), 'utf8') // text "," separated "_" at the end of the line
  // remove \r\n
  _rawMap = _rawMap.replace(/\r\n/g, '')

  const _map = []

  for (let i = 0; i < _rawMap.split('_').length; i++) { // split by "_" line
    _map[i] = []
    for (let j = 0; j < _rawMap.split('_')[i].split(',').length; j++) { // split by "," column
      _map[i][j] = parseInt(_rawMap.split('_')[i].split(',')[j])
    }
  }

  // build map
  // if 1 = devBlock , if 0 = devAir

  const _mapBuilt = []

  for (let i = 0; i < _map.length; i++) { // ligne
    _mapBuilt[i] = []
    for (let j = 0; j < _map[i].length; j++) { // column
      if (_map[i][j] === 1) {
        _mapBuilt[i][j] = devBlock
      } else if (_map[i][j] === 0) {
        _mapBuilt[i][j] = devAir
      } else if (_map[i][j] === 2) {
        _mapBuilt[i][j] = devFullBlock
      } else if (_map[i][j] === 3) {
        _mapBuilt[i][j] = devTopPlatfrom
      }
    }
  }

  instance = _mapBuilt
  return _mapBuilt
}

function mainRender (aMapName) { // aMultiplicater = 1 / 2 / 4
  // render map to terminal x2

  instance = buildMap(aMapName) // build map

  let _rendermap = ''

  for (let i = 0; i < 16; i++) { // ligne
    for (let k = 0; k < 4; k++) { // ligne
      for (let j = 0; j < 32; j++) { // column
        for (let l = 0; l < 4; l++) { // column
          if (instance[i][j][k][l] === 1) {
            _rendermap += '██'
          } else if (instance[i][j][k][l] === 0) {
            _rendermap += '  '
          }
        }
      }
      _rendermap += '\n'
    }
  }

  console.log(_rendermap)

  return _rendermap
}

module.exports = {
  mainRender
}
