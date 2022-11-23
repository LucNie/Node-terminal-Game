var data = require('./dataController');

function tic(){
    // render the game att 30 fps
    setTimeout(tic, 1000/30);

}

function renderInstance(){
    // if array 0 = ■ else = " "
    var instance = data.getInstanceArray();
    var render = "";
    for (var i = 0; i < 1000; i++) {
        for (var j = 0; j < 1000; j++) {
            if(instance[i][j] == 0){
                render += "■";
            }else{
                render += " ";
            }
        }
        render += " ";

        return render;
}

function rotationInstance(aStatiqueInstance,rotation){
    // take a 2d array and rotate it by a number of degree (1° to 360°) and smooth the render
    // return a 2d array



}