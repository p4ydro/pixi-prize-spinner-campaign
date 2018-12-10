define([
    'Debug/Logger',
    'Images',
    'Managers/GameManager',
    'Utils'
], function(Logger, Images, GameManager, Utils) {
    
    var Background = function() {
        this.initBackground();
    };

    Background.prototype.initBackground = function() {
    };

    Background.prototype = {
        initBackground: function() {
            this.Sprite = new PIXI.Sprite(PIXI.loader.resources["images/Game/Background.png"].texture);
        },
        
        update: function() {

        },

        resize: function() {
            Utils.resizeSpriteByWidth(this.Sprite, GameManager.GAME.renderer.width);
        }
    }

    return Background;

});