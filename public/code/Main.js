require([
    'Managers/GameManager',
    'Game',
    'Debug/Logger',
    'Images',
], function(GameManager, Game, Logger, Images) {

    // Start game
    function StartGame() {

        // Test Requesting

        // Preload the game
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