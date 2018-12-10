define([
    'Debug/Logger',
    'UI/Background',
    'Managers/GameManager',
    'UI/Spinner',
    'UI/SpinnerSpinButton'
], 
function(Logger, Background, GameManager, Spinner, SpinnerSpinButton) {

    var GameState = {
        background: undefined,
        spinner: undefined,
        spinButton: undefined,

        onEnter: function() {
            // Create all components
            this.background = new Background();
            this.spinner = new Spinner();
            this.spinButton = new SpinnerSpinButton(this.spinner);
    
            // Add all components to stage
            GameManager.GAME.GameScene.addChild(this.background.Sprite);
            GameManager.GAME.GameScene.addChild(this.spinner.BackSprite);
            GameManager.GAME.GameScene.addChild(this.spinner.InnerSprite);
            GameManager.GAME.GameScene.addChild(this.spinner.TickSprite);
            GameManager.GAME.GameScene.addChild(this.spinButton.Sprite);
        },

        update: function() {
            this.background.update();
            this.spinner.update();
            this.spinButton.update();
        },

        resize: function() {
            this.background.resize();
            this.spinner.resize();
            this.spinButton.resize();
        },

        onExit: function() {

        }
    };

    return GameState;

});