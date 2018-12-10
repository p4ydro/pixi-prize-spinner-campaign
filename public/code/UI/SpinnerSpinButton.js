define([
    'Debug/Logger',
    'Images',
    'Managers/GameManager',
    'Utils'
], function(Logger, Images, GameManager, Utils) {

    var SpinnerSpinButton = function(spinner) {
        this.init(spinner);
    };

    SpinnerSpinButton.prototype = {
        maximumSpinSpeed: 0.5,
        minimumSpinSpeed: 0.01,
        clicked: false,
        spinner: undefined,
        spun: false,
        spinTime: 0.5,

        init: function(spinner) {
            this.spinner = spinner;
            
            // Get sprite
            this.Sprite = new PIXI.Sprite(PIXI.loader.resources[Images.SpinButton].texture);
        },
        
        update: function() {
            // Checking for mouse hover & click
            if (!this.spun) {
                let pointer = GameManager.GAME.Game.pointer;
                if (pointer.hitTestSprite(this.Sprite)) {
                    pointer.cursor = "pointer";
                    this.Sprite.tint = 0x999999;
                    if (pointer.isDown) {
                        this.clicked = true;
                        this.Sprite.tint = 0x777777;
                    } else {
                        if (this.clicked && !this.spun) {
                            this.spin();
                            this.clicked = false;
                            pointer.cursor = "auto";
                        }
                    }
                } else {
                    pointer.cursor = "auto";
                    this.Sprite.tint = 0xFFFFFF;
                }
            }

            // Spinning functionality
            if (this.spun) {
                // Button fading out
                if (this.Sprite.alpha <= 0.001) {
                    this.Sprite.alpha = 0;
                } else {
                    this.Sprite.alpha += (0 - this.Sprite.alpha) / 5;
                }
            }
        },

        spin: function() {
            this.spinner.spin();
            this.spun = true;
        },

        resize: function() {
            Utils.resizeSpriteByWidth(this.Sprite, GameManager.GAME.Renderer.getHalfWidth());

            this.Sprite.anchor.set(0.5, 0.5);
            this.Sprite.x = GameManager.GAME.Renderer.getHalfWidth();
            this.Sprite.y = GameManager.GAME.Renderer.height * 0.8;
        }
    }

    return SpinnerSpinButton;

});