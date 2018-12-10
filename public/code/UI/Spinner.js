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
            this.Sprite.anchor.set(0.5, 0.5);
            this.rotationSpeed = 0.5;
        },

        update: function() {
            if (this.rotationSpeed < 0.001) {
                this.rotationSpeed = 0;
            } else {
                this.rotationSpeed += (0 - this.rotationSpeed) / 50;
            }
            this.Sprite.rotation += this.rotationSpeed;
        },

        resize: function() {
            Utils.resizeSpriteByWidth(this.Sprite, (GameManager.GAME.Renderer.width * 0.75));
            // Set initial position
            this.Sprite.x = (GameManager.GAME.Renderer.getHalfWidth());
            this.Sprite.y = (GameManager.GAME.Renderer.height * 0.4);
        }
    }

    return Spinner;

});