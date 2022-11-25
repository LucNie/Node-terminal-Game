const fs = require('fs');
const path = require('path');

// init 2d map array
var instance = [[]]
var currentMap = "0-0" // level - room
// 1 = collision , 0 = no collision
var devBlock = [[1,1,1,1],[1,0,0,1],[1,0,0,1],[1,1,1,1]] // 4x4 id = 1
const devAir = [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]] // 4x4 id = 0



// creat map
function buildMap(aMap){ //string "0-0"
    // read map file "../DATA/MAPS/0-0.json"
    var _rawMap = fs.readFileSync(path.join(__dirname, "../DATA/MAPS/" + aMap + ".map"), 'utf8'); //text "," separated "_" at the end of the line
    // remove \r\n 
    _rawMap = _rawMap.replace(/\r\n/g, "");

    var _map = [[]]

    for (var i = 0 ; i < _rawMap.split("_").length ; i++){ // split by "_" line
        _map[i] = []
        for (var j = 0 ; j < _rawMap.split("_")[i].split(",").length ; j++){ // split by "," column
            _map[i][j] = _rawMap.split("_")[i].split(",")[j]
        }
    }

    // build map 
    // if 1 = devBlock , if 0 = devAir
    var _mapBuilt = [[]]

    for (var i = 0 ; i < _map.length ; i++){ // ligne   
        _mapBuilt[i] = []
        for (var j = 0 ; j < _map[i].length ; j++){ // column
            if (_map[i][j] == 1){
                _mapBuilt[i][j] = devBlock
            }else if (_map[i][j] == 0){
                _mapBuilt[i][j] = devAir
            }
        }
    }
    instance = _mapBuilt
    return _mapBuilt


}

function mainRender(aMultiplicater,aMapName){ // aMultiplicater = 1 / 2 / 4 
    // render map to terminal x2

    instance = buildMap(aMapName); // build map

    _rendermap = ""

    for (var i = 0; i < 32 ; i++){ //render by ligne

        for (var j = 0; j < 4 ; j++){ // render by tile

            for (var k = 0; k < 32 ; k++){ // render by column

                for (var l = 0; l < 4 ; l++){ // render by pixel

                    if (instance[i][k][j][l] === 1){
                        _rendermap += "█" + " ".repeat(aMultiplicater - 1);
                    }else{
                        _rendermap += " " + " ".repeat(aMultiplicater - 1);
                    }

                }

            }

            _rendermap += "\n"
        }
    }



           
    console.log(_rendermap)

    return _rendermap
            
              


}

module.exports = {
    mainRender
}


