const menu = require('./modules/menuController');
const save = require('./modules/dataController');

// init save
save.initSave();

menu.renderMenu();