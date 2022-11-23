var instance = []


module.exports = {
    initInstanceArray() {

        // fill array with 0 2d array (x,y)
        for (var i = 0; i < 1000; i++) {
            instance[i] = []
            for (var j = 0; j < 1000; j++) {
                instance[i][j] = 0
            }
        }
    },
    getInstanceArray() {
        return instance;
    }
}