const { read } = require('fs')
const readline = require('readline')
const save = require('./dataController')
const gameLuncher = require('./GAMES/luncher.js')

// module that show the menu
// max render ( 1000x1000 )

let cursorCoord = 0

// const menuPath = 'MENU'
let menuFunction = []
let menuSelect = []

module.exports = {

  renderMenu () {
    menuSelect = [
      '1. start game',
      '2. options',
      '3. profile',
      '4. exit'
    ]

    menuFunction = [
      startGame,
      options,
      profile,
      exit
    ]

    // first render
    console.clear()
    console.log(profileBar() + titleRender() + cursorSelector(menuSelect))

    moovInMenu()
  }
}

function rerenderMenu () {
  menuSelect = [
    '1. start game',
    '2. options',
    '3. profile',
    '4. exit'
  ]

  menuFunction = [
    startGame,
    options,
    profile,
    exit
  ]

  // first render
  console.clear()
  console.log(profileBar() + titleRender() + cursorSelector(menuSelect))

  // moovInMenu();
}

// show the menu

function profileBar () {
  return (`profile :  \x1b[33m${save.getCurrentProfile().name}\x1b[0m | level : \x1b[33m${save.getCurrentProfile().level}\x1b[0m  | money : \x1b[32m${save.getCurrentProfile().money} units \x1b[0m \n`)
}

function cursorSelector (aStringArray) {
  const _cursor = '\x1b[32m>\x1b[0m'

  let _render = ''

  for (let i = 0; i < aStringArray.length; i++) {
    if (i == cursorCoord) {
      _render += `${_cursor} ${aStringArray[i]}\n`
    } else {
      _render += `  ${aStringArray[i]}\n`
    }
  }
  return _render
}

function titleRender () {
  return (`\x1b[33m
                ╔═╗╔═╗╔═╗╔═╗╔═╗  ╔═╗╔═╗╔═╗╔╦╗ 
                ╚═╗╠═╝╠═╣║  ║╣───║ ╦║ ║╠═╣ ║  
                ╚═╝╩  ╩ ╩╚═╝╚═╝  ╚═╝╚═╝╩ ╩ ╩  
            \x1b[0m \n
            `)
}

function moovInMenu () {
  // waiting input from user 8 or 4 to moov in menu
  readline.emitKeypressEvents(process.stdin)
  process.stdin.setRawMode(true)

  process.stdin.on('keypress', (str, key) => {
    if (key.name == '8') {
      if (cursorCoord > 0) {
        cursorCoord--
      }
      // rereder menu
      renderCurrentMenu()
    } else if (key.name == '2') {
      if (cursorCoord < menuFunction.length - 1) {
        cursorCoord++
      }
      // rereder menu
      renderCurrentMenu()
    } else if (key.name == '5') {
      menuFunction[cursorCoord]()
      cursorCoord = 0
    } else if (key.name == '0') {
      process.exit()
    }
  })
}

function renderCurrentMenu () {
  console.clear()
  console.log(profileBar() + titleRender() + cursorSelector(menuSelect))
}

function startGame () {
  menuSelect = [
    '1. Space Goat (solo)',
    '2. Space Goat (multi)',
    '3. Elit Goat (solo)',
    '4. Elit Goat (multi)',
    '5. back'
  ]

  menuFunction = [
    gameLuncher.initSpaceGoat,
    missingFunction,
    missingFunction,
    missingFunction,
    rerenderMenu
  ]

  console.clear()
  // console.log( profileBar() + titleRender() + cursorSelector(menuSelect) );
  // moovInMenu();
}

function options () {
  console.log('options')
}

function profile () {
  console.log('profile')
}

function exit () {
  // exit the game
  process.exit()
}

function missingFunction () {
  console.log('missing function')
}
