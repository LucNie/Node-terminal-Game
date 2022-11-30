@REM detect if node_modules is installed
@IF EXIST node_modules (
    @REM if node_modules is installed, run the game
    @REM open a new terminal window
    @start cmd /k "mode con:cols=300 lines=100 & npm start"
) ELSE (
    @REM if node_modules is not installed, install it
    @npm install
    @REM run the game
    @start cmd /k "mode con:cols=300 lines=100 & npm start"
)