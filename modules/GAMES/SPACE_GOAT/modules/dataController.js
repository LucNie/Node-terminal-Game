'use-strict'
const fs = require('fs')
const path = require('path')

 const instance = {
  players: []
}

const instanceMap = {}
const pixelInstancedMap = {}
const maps = {} // raw map
const block = []
let plutar = JSON.parse(fs.readFileSync(path.join(__dirname, '../DATA/PLUTAR/PLUTAR.json'), 'utf8'))
const currentMap = '0-0'

function buildMap (aMap) { // string "0-0"
  // use maps object to get map
  let _rawMap = maps[aMap]

  _rawMap = _rawMap.replace(/\r\n/g, '')

  const _map = [] // map with blocks raw => to array

  for (let i = 0; i < _rawMap.split('_').length; i++) { // split by "_" line
    _map[i] = []
    for (let j = 0; j < _rawMap.split('_')[i].split(',').length; j++) { // split by "," column
      _map[i][j] = parseInt(_rawMap.split('_')[i].split(',')[j])
    }
  }

  //   console.log(_rawMap.split('_').length + 'x' + _rawMap.split('_')[0].split(',').length)

  const _mapBuilt = []

  for (let i = 0; i < _map.length; i++) { // ligne
    _mapBuilt[i] = []
    for (let j = 0; j < _map[i].length; j++) { // column
      _mapBuilt[i][j] = block[_map[i][j]]
    }
  }

  // build pixel map x and y 
  const _pixelMap = []
  let _pixelMapX = -1
  let _pixelMapY = -1
  for (let i = 0; i < 16; i++) { // ligne
    for ( let k =0; k < 4; k++) { // column
      _pixelMapX++
      _pixelMap[_pixelMapX] = []
      for (let j = 0; j < 32; j++) { // ligne
        for ( let l =0; l < 4; l++) { // column
          _pixelMapY++
          _pixelMap[_pixelMapX][_pixelMapY] = _mapBuilt[i][j][k][l]
        }
      }
      _pixelMapY = -1
    }
  }

  instanceMap[aMap] = _mapBuilt
  pixelInstancedMap[aMap] = _pixelMap
  return _mapBuilt
}

function initData () {
  // path of plutar object ../DATA/PLUTAR/PLUTAR.json
  // load maps from ../DATA/MAPS/*.map
  const _maps = fs.readdirSync(path.join(__dirname, '../DATA/MAPS/'))
  for (let i = 0; i < _maps.length; i++) {
    maps[_maps[i].replace('.map', '')] = fs.readFileSync(path.join(__dirname, '../DATA/MAPS/' + _maps[i]), 'utf8')
  }

  console.log('maps are loaded')
  // load blocks from ../DATA/BLOCKS/*.json
  fs.readdirSync(path.join(__dirname, '../DATA/BLOCKS/')).forEach(file => {
    block.push(JSON.parse(fs.readFileSync(path.join(__dirname, '../DATA/BLOCKS/' + file), 'utf8')))
  })
  console.log('blocks are loaded')

  return true
}

function playerInit () {
  const velocity = [0, 0] // x, y 
  const position = [50, 16] // postion in pixel (x,y) x = ligne y = column
  let rotation = 0 // "0" = right "1" = left

  instance.players.push({
    velocity,
    position,
    rotation
  })
}

module.exports = {
  initData,
  buildMap,
  playerInit,
  instanceMap,
  instance,
  plutar,
  maps,
  block,
  currentMap,
  pixelInstancedMap
}
