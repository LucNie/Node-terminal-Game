const instance = require("./modules/instanceController.js");

module.exports = {
    init() {
        devShowMap()
    }
}

// Path: main\hidden\Node-terminal-Game\modules\GAMES\ELITE\game.js

function devShowMap(){

    console.clear()
    instance.mainRender(2,"0-0")

}