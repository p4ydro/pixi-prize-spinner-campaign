define([
    'Debug/Logger',
    'Images',
    'Managers/GameManager',
    'Utils',
    'Managers/PrizeManager'
], function(Logger, Images, GameManager, Utils, PrizeManager) {
    
    var Spinner = function() {
        this.init();
    };

    Spinner.prototype = {
        init: function() {
            this.State = {
                Start: 0,
                Spinning: 1,
                Stopped: 2
            }

            this.currentState = this.State.Start;
            this.rotationSpeed = 0;
            this.finalTargetDegrees = 0;
            this.totalSpins = 5;
            this.InnerSprite = new PIXI.Sprite(PIXI.loader.resources[Images.SpinnerInner].texture);
            this.BackSprite = new PIXI.Sprite(PIXI.loader.resources[Images.SpinnerBack].texture);
            this.TickSprite = new PIXI.Sprite(PIXI.loader.resources[Images.SpinnerTick].texture);
            this.spinResults = Object.keys(PrizeManager.PrizeTypes);

            this.Sprites = [
                this.InnerSprite, this.BackSprite, this.TickSprite
            ];
        },

        update: function() {
            switch (this.currentState) {
                case this.State.Start:
                break;
                case this.State.Spinning:
                    var innerDeg = radiansToDegrees(this.InnerSprite.rotation);
                    // Spin to target
                    if (innerDeg < this.finalTargetDegrees) {
                        // Ease rotation speed
                        if (innerDeg < 180) {
                            if (this.rotationSpeed < 15) {
                                this.rotationSpeed += 1;
                            }
                        } else if (innerDeg > (this.finalTargetDegrees - 720)) {
                            if (this.rotationSpeed > 0.5) {
                                this.rotationSpeed -= 0.155;
                            }
                        }
                        // Add rotation speed
                        this.InnerSprite.rotation += degreesToRadians(this.rotationSpeed);
                    } else {
                        // Stop
                        this.stop();
                    }
                break;
                case this.State.Stopped:
                break;
            }
        },

        spin: function() {
            var foundPrizeInt = PrizeManager.getRandomPrizeValue() + 1;
            var targetDeg = 60 * (foundPrizeInt - 1);
            this.finalTargetDegrees = (360 * this.totalSpins) + targetDeg;
            
            this.currentState = this.State.Spinning;
        },

        stop: function() {
            this.currentState = this.State.Stopped;

            // Collect prize with PrizeManager
            PrizeManager.collectPrize();

            // Hide spinning text
            $('.game-overlay .spin-text .spinning-text').css('opacity', '0');
        },

        resize: function() {
            let r = GameManager.GAME.Renderer;
            let rec = new PIXI.Rectangle(0, 0, r.width, r.height);

            Utils.resizeSpriteByWidth(this.BackSprite, (rec.width * 0.75));
            Utils.resizeSpriteByWidth(this.InnerSprite, (rec.width * 0.58));
            Utils.resizeSpriteByWidth(this.TickSprite, (rec.width * 0.12));
            // Set initial position
            let x = GameManager.GAME.Renderer.getHalfWidth(), y = (GameManager.GAME.Renderer.height * 0.4);

            for (var s in this.Sprites) {
                let sp = this.Sprites[s];
                sp.anchor.set(0.5, 0.5);
                sp.x = x;
                sp.y = y;
            }

        }
    }

    // Converts from radians to degrees.
    radiansToDegrees = function(radians) {
        return radians * 180 / Math.PI;
    };
    // Converts from degrees to radians.
    degreesToRadians = function(degrees) {
        return degrees * Math.PI / 180;
    };

    return Spinner;

});