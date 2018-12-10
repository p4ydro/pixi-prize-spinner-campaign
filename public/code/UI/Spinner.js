define([
    'Debug/Logger',
    'Images',
    'Managers/GameManager',
    'Utils'
], function(Logger, Images, GameManager, Utils) {
    
    var Spinner = function() {
        this.init();
    };

    Spinner.prototype = {
        init: function() {
            this.Sprite = new PIXI.Sprite(PIXI.loader.resources[Images.Spinner].texture);
        },
        
        update: function() {

        },

        resize: function() {
            Utils.resizeSpriteByWidth(this.Sprite, (GameManager.GAME.Renderer.width * 0.75));
            // Set initial position
            this.Sprite.x = (GameManager.GAME.Renderer.getHalfWidth() - (this.Sprite.width / 2));
            this.Sprite.y = (GameManager.GAME.Renderer.getHalfHeight() - (this.Sprite.height / 2));
        }
    }

    return Spinner;

});