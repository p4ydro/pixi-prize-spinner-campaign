define([
    'Debug/Logger',
    'Images',
    'Managers/GameManager',
    'Utils'
], function(Logger, Images, GameManager, Utils) {
    
    var Background = function() {
        this.init();
    };

    Background.prototype = {
        init: function() {
            // Get sprite
            this.Sprite = new PIXI.Sprite(PIXI.loader.resources[Images.Background].texture);
        },
        
        update: function() {

        },

        resize: function() {
            Utils.resizeSpriteByWidth(this.Sprite, GameManager.GAME.Renderer.width);
        }
    }

    return Background;

});