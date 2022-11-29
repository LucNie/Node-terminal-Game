'use-strict'
const fs = require('fs')
const path = require('path')

const instance = {}
const maps = {} // raw map
const block = []
let plutar = {} // main character !!
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

  instance[aMap] = _mapBuilt
  return _mapBuilt
}

function initData () {
  // path of plutar object ../DATA/PLUTAR/PLUTAR.json
  plutar = JSON.parse(fs.readFileSync(path.join(__dirname, '../DATA/PLUTAR/PLUTAR.json'), 'utf8'))
  console.log('plutar is loaded')
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

module.exports = {
  initData,
  buildMap,
  instance,
  maps,
  block,
  currentMap,
  plutar
}
