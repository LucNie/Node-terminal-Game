const path = require('path')

let save = {} // instanced save
const SAVE_PATH = process.env.SAVE_PATH || path.resolve(__dirname, '../SAVES/save.json')
// save file
const fs = require('fs')

module.exports = {

  initSave () {
    // test if save file exist
    if (fs.existsSync(path.resolve(__dirname, SAVE_PATH))) {
      console.log('save file exist')
    } else {
      console.log('save file not exist')

      const _defaultSave = {
        profile: 0,
        profiles: [
          {
            name: 'default',
            username: 'player',
            level: 1,
            money: 0,
            spaceship: {
              fuel: 100, // %
              name: 'hull',
              hull: {
                type: 'light',
                life: 100 // %
              },
              armor: {
                type: 'none',
                life: 100 // %
              },
              engine: 'light',
              shield: 'light',
              weapons: {
                front: [
                  'laser beam',
                  'laser beam'
                ]
              },
              ftl: 'light'
            },
            systems: {
              origin: 'sol',
              actual: 'sol'
            }
          }
        ]
      }

      fs.writeFileSync(path.resolve(__dirname, SAVE_PATH), JSON.stringify(_defaultSave))
    }
    // load save file
    save = JSON.parse(fs.readFileSync(path.resolve(__dirname, SAVE_PATH)))
  },

  getSave () {
    return save
  },

  getCurrentProfile () {
    return save.profiles[save.profile]
  }

}
