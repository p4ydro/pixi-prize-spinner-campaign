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
            this.InnerSprite = new PIXI.Sprite(PIXI.loader.resources[Images.SpinnerInner].texture);
            this.BackSprite = new PIXI.Sprite(PIXI.loader.resources[Images.SpinnerBack].texture);
            this.TickSprite = new PIXI.Sprite(PIXI.loader.resources[Images.SpinnerTick].texture);

            this.Sprites = [
                this.InnerSprite, this.BackSprite, this.TickSprite
            ];
            
            this.rotationSpeed = 0;
        },

        update: function() {
            if (this.rotationSpeed < 0.001) {
                this.rotationSpeed = 0;
            } else {
                this.rotationSpeed += (0 - this.rotationSpeed) / 50;
            }
            this.InnerSprite.rotation += this.rotationSpeed;
        },

        spin: function() {
            this.rotationSpeed = 0.5;
        },

        resize: function() {
            Utils.resizeSpriteByWidth(this.BackSprite, (GameManager.GAME.Renderer.width * 0.75));
            Utils.resizeSpriteByWidth(this.InnerSprite, (GameManager.GAME.Renderer.width * 0.58));
            Utils.resizeSpriteByWidth(this.TickSprite, (GameManager.GAME.Renderer.width * 0.12));
            // Set initial position
            let x = GameManager.GAME.Renderer.getHalfWidth(), y = (GameManager.GAME.Renderer.height * 0.4);

            for (var s in this.Sprites) {
                console.log(s);
                let sp = this.Sprites[s];
                sp.anchor.set(0.5, 0.5);
                sp.x = x;
                sp.y = y;
            }

        }
    }

    return Spinner;

});