define([
    'Constants',
    'Settings/GameSettings',
    'Debug/Logger',
    'Managers/StateManager',
    'Managers/GameManager'
], function (Constants, GameSettings, Logger, StateManager, GameManager) {
    "use strict"

    function GenericGame() {
    };

    GenericGame.prototype = {
        initGame: function() {
            // Create PixiJS Application
            this.Game = createStandardGame();
            this.Renderer = this.Game.renderer;
            this.Renderer.getHalfWidth = function() {
                return (this.width / 2);
            };
            this.Renderer.getHalfHeight = function() {
                return (this.height / 2);
            };

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
            requestAnimationFrame(this.update);
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
            GameManager.GAME.Game.Tink.update();

            // Next update
            requestAnimationFrame(GameManager.GAME.update);
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

    return GenericGame;

});