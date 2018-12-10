define([
    'Debug/Logger',
    'UI/Background',
    'Managers/GameManager',
    'UI/Spinner'
], 
function(Logger, Background, GameManager, Spinner) {

    var GameState = {
        onEnter: function() {
            // Create all components
            this.background = new Background();
            this.spinner = new Spinner();
    
            // Add all components to stage
            GameManager.GAME.GameScene.addChild(this.background.Sprite);
            GameManager.GAME.GameScene.addChild(this.spinner.Sprite);
        },

        update: function() {

        },

        resize: function() {
            this.background.resize();
            this.spinner.resize();
        },

        onExit: function() {

        }
    };

    return GameState;

});