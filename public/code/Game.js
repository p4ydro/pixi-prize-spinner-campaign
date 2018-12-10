define([
    'pixi',
    'Constants',
    'Settings/GameSettings',
    'Debug/Logger',
    'Managers/StateManager',
    // 'tink'
], function (PIXI, Constants, GameSettings, Logger, StateManager) {
    
    var GenericGame = function() {
        this.initGame();
    };

    GenericGame.prototype.initGame = function() {
        Logger.log("Game.js", "Game intialized");

        // Create PixiJS Application
        this.Game = createStandardGame();

        // Add new application to webpage
        document.body.appendChild(this.Game.view);

        // Initialize resize listener
        window.addEventListener("resize", this.resizeGame.bind(this));

        // Enter initial state
        StateManager.enterState(StateManager.StateType.Game);

        // Perform initial resize
        this.resizeGame();

        // Perform initial update
        this.update();
    };

    GenericGame.prototype.resizeGame = function() {
        Logger.log("Game.js", "Window resized");
        
        let height = window.innerHeight;
        let width = height / Constants.MAXIMUM_GAME_RATIO;

        this.Game.renderer.resize(width, height);

        StateManager.resize();
    };

    GenericGame.prototype.update = function() {
        // Update all components
        StateManager.update();

        // Update Game components
        this.Game.Tink.update();

        // Next update
        requestAnimationFrame(this.update());
    };

    function createStandardGame() {
        var a = new PIXI.Application({
            width: Constants.GAME_WIDTH,
            height: Constants.GAME_HEIGHT,
            roundPixels: GameSettings.ROUND_PIXELS,
        });

        a.Tink = new Tink(PIXI, a.renderer.view);
        a.pointer = a.Tink.makePointer();

        return a;
    };

    return GenericGame;

});