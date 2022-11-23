const readline = require('readline');
const save = require('./dataController');



// module that show the menu
// max render ( 1000x1000 ) 

cursorCoord = [0];

menuPath = "MENU"
menuFunction = [];
menuSelect =[];



module.exports = {

    renderMenu() {

        

        menuSelect = [
            "1. start game",
            "2. options",
            "3. profile",
            "4. exit",
        ]

        menuFunction = [
            startGame,
            options,
            profile,
            exit,
        ] 

        // first render
        console.clear();
        console.log( profileBar() + titleRender() + cursorSelector(menuSelect) );
       

        moovInMenu();

    }
}

function renderMenu() {

        

    menuSelect = [
        "1. start game",
        "2. options",
        "3. profile",
        "4. exit",
    ]

    menuFunction = [
        startGame,
        options,
        profile,
        exit,
    ] 

    // first render
    console.clear();
    console.log( profileBar() + titleRender() + cursorSelector(menuSelect) );
   

    moovInMenu();

}

    // show the menu

    function profileBar() {
        return (`profile :  \x1b[33m${save.getCurrentProfile().name}\x1b[0m | level : \x1b[33m${save.getCurrentProfile().level}\x1b[0m  | money : \x1b[32m${save.getCurrentProfile().money} units \x1b[0m \n`);
    }

    function cursorSelector(aStringArray)  { 
        const _cursor = `\x1b[32m>\x1b[0m`;
        
        var _render = "";

        for (let i = 0; i < aStringArray.length; i++) {
            if (i == cursorCoord[0]) {
                _render += `${_cursor} ${aStringArray[i]}\n`;   
            } else {
                _render += `  ${aStringArray[i]}\n`;
            }
        }
        return _render;

    }


    function titleRender() {

        return (`\x1b[33m
                ╔═╗╔═╗╔═╗╔═╗╔═╗  ╔═╗╔═╗╔═╗╔╦╗ 
                ╚═╗╠═╝╠═╣║  ║╣───║ ╦║ ║╠═╣ ║  
                ╚═╝╩  ╩ ╩╚═╝╚═╝  ╚═╝╚═╝╩ ╩ ╩  
            \x1b[0m \n
            `);
    }

    function moovInMenu(){  
        

        // waiting input from user 8 or 4 to moov in menu
        readline.emitKeypressEvents(process.stdin);
        process.stdin.setRawMode(true);
        process.stdin.on('keypress', (str, key) => {
            if (key.name == '8') {
                if (cursorCoord[0] > 0) {
                    cursorCoord[0]--;
                }
                // rereder menu
                console.clear();
                console.log(  profileBar() + titleRender() + cursorSelector(menuSelect) );
            } else if (key.name == '2') {
                if (cursorCoord[0] < menuFunction.length-1) {
                    cursorCoord[0]++;
                }
                console.clear();
                console.log( profileBar() + titleRender() + cursorSelector(menuSelect) );
            } else if (key.name == '5') {
                menuFunction[cursorCoord[0]]();
            }
        });

    }





    function startGame() {

        menuSelect = [
            "1. minning and destroy (solo)",
            "2. minning and destroy (multi)",
            "3. Elit Goat (solo)",
            "4. Elit Goat (multi)",
            "5. back",
        ]

        menuFunction = [
            missingFunction,
            missingFunction,
            missingFunction,
            missingFunction,
            renderMenu,
        ]

        console.clear();
        // console.log( profileBar() + titleRender() + cursorSelector(menuSelect) );
        // moovInMenu();

    }

    function options() {
        console.log("options");
    }

    function profile() {
        console.log("profile");
    }

    function exit(){
        // exit the game
        process.exit();
    }

    function missingFunction(){
        console.log("missing function");
    }