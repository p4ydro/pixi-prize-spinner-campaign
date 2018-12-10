require([
    'Game',
    'Config',
    'Debug/Logger'
], function(Game, Config, Logger) {
    Logger.log("Main.js", "Main intialized");

    // Initialize config
    Config.initialize();

    // Start game
    function StartGame() {
        var game = new Game();
        Logger.log("Main.js", "Game started");
    };
    
    // Start game
    StartGame();

});