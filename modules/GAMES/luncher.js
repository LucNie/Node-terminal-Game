const SPACE_GOAT = require('./SPACE_GOAT/game.js')

module.exports = {
  initELITE () {
    console.log('init ELITE')
    // resise terminal
  },
  initSpaceGoat () {
    SPACE_GOAT.start()
  },
  initSpaceGoatMultiplayer () {
    SPACE_GOAT.connect()
  }
}
