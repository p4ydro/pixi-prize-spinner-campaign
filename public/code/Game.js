define([
    // 'pixi',
    'Constants',
    'Settings/GameSettings',
    'Debug/Logger',
    'Managers/StateManager',
], function (Constants, GameSettings, Logger, StateManager) {
    "use strict"

    function Game() {
    };

    Game.prototype = {
        initGame: function() {
            Logger.log("Game", "Game intialized");

            // Create PixiJS Application
            this.Game = createStandardGame();
            this.Renderer = this.Game.renderer;
            this.Renderer.getHalfWidth = function() {
                return (this.width / 2);
            };
            this.Renderer.getHalfHeight = function() {
                return (this.height / 2);
            };

            Logger.log("Game", "Load complete");

            // Create GameScene
            this.GameScene = new PIXI.Container();

            // Add new application to webpage
            document.body.appendChild(this.Game.view);

            // Initialize resize listener
            window.addEventListener("resize", this.resizeGame.bind(this));

            // Enter initial state
            StateManager.enterState(StateManager.StateType.Game);

            // Add GameScene
            this.Game.stage.addChild(this.GameScene);

            // Perform initial resize
            this.resizeGame();

            // Perform initial update
            // this.update();
        },

        resizeGame: function() {
            let height = window.innerHeight;
            let width = height / Constants.MAXIMUM_GAME_RATIO;
    
            this.Game.renderer.resize(width, height);
    
            StateManager.resize();
        },
        
        update: function() {
            // Update all components
            StateManager.update();
    
            // Update Game components
            this.Game.Tink.update();
    
            // Next update
            requestAnimationFrame(this.update());
        }
    }

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

    return Game;

});