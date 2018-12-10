define([
    'Debug/Logger',
    'UI/Background',
    'Managers/GameManager'
], 
function(Logger, Background, GameManager) {

    var GameState = {
        onEnter: function() {
            // Create all components
            this.background = new Background();
    
            // Add all components to stage
            GameManager.GAME.GameScene.addChild(this.background.Sprite);
        },

        update: function() {

        },

        resize: function() {
            this.background.resize();
        },

        onExit: function() {

        }
    };

    return GameState;

});