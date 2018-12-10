require([
    'Managers/GameManager',
    'Game',
    'Config',
    'Debug/Logger',
    'Images'
], function(GameManager, Game, Config, Logger, Images) {
    // Initialize config
    Config.initialize();

    // Start game
    function StartGame() {
        // FIXME Temporary Preload
        PIXI.loader
            .add(Object.values(Images))
            .on("progress", function(e) {
                Logger.log("Main", "Loading: " + e.progress);
            })
            .load(function() {
                GameManager.GAME = new Game();
                GameManager.GAME.initGame();
            });
    };
    
    // Start game
    StartGame();

});