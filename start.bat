@REM detect if node_modules is installed
@IF EXIST node_modules (
    @REM if node_modules is installed, run the game
    @npm start
) ELSE (
    @REM if node_modules is not installed, install it
    @npm install
    @REM run the game
    @npm start
)