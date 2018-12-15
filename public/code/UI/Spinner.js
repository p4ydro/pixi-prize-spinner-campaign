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
            this.spun = false;
            this.rotationSpeed = 0;
            this.maximumRotationSpeed = 0.5;
            this.finalTargetDegrees = 0;
            this.stopTime = 2;
            this.stopped = false;
            this.prizeLocked = false;
            this.InnerSprite = new PIXI.Sprite(PIXI.loader.resources[Images.SpinnerInner].texture);
            this.BackSprite = new PIXI.Sprite(PIXI.loader.resources[Images.SpinnerBack].texture);
            this.TickSprite = new PIXI.Sprite(PIXI.loader.resources[Images.SpinnerTick].texture);
            let p = PrizeManager.PrizeTypes;
            this.spinResults = Object.keys(PrizeManager.PrizeTypes);

            this.Sprites = [
                this.InnerSprite, this.BackSprite, this.TickSprite
            ];
        },

        update: function() {
            // Spinning functionality
            if (this.spun) {
                // Easing into full speed
                if (this.stopTime > 0) {
                    this.rotationSpeed += (this.maximumRotationSpeed - this.rotationSpeed) / 20;
                    this.stopTime -= 0.05;
                } else if (this.rotationSpeed < 0.001) {
                    this.rotationSpeed = 0;
                    if (!this.stopped) {
                        this.stop();
                    }
                } else {
                    this.rotationSpeed += (0 - this.rotationSpeed) / 50;
                }

                // Applying rotation
                this.InnerSprite.rotation += this.rotationSpeed;

                // Stopped easing into target rotation
                if (this.stopped && !this.prizeLocked) {
                    // Get current degrees
                    let currentRotation = radiansToDegrees(this.InnerSprite.rotation);

                    // Ease
                    let diff = this.finalTargetDegrees - currentRotation;
                    let newRotation = (diff) / 5;

                    if (Math.abs(diff) < 0.05) {
                        this.prizeFound();
                    }

                    // Apply new rotation
                    this.InnerSprite.rotation += degreesToRadians(newRotation);
                }
            }
        },

        spin: function() {
            this.spun = true;
            this.rotationSpeed = -0.2;
            this.maximumRotationSpeed = 0.5 + (Math.random());
        },

        stop: function() {
            this.stopped = true;

            // Find target degrees
            let currentDegrees = radiansToDegrees(this.InnerSprite.rotation);
            let newDeg = currentDegrees - (currentDegrees % 60);
            // Check for left or right lock
            let difference = currentDegrees - newDeg;
            if (difference > 30) {
                newDeg = currentDegrees + (60 - difference);
            }
            // Apply new target degrees
            this.finalTargetDegrees = newDeg;
        },

        prizeFound: function() {
            this.prizeLocked = true;

            // Find prize based on rotation]
            let currentFloorDegrees = this.finalTargetDegrees % 360;
            let index = (currentFloorDegrees / 60);
            let prize = (this.spinResults[index]);
            let prizeVal = PrizeManager.PrizeTypes[prize];

            // Collect prize with PrizeManager
            PrizeManager.collectPrize(prizeVal);
        },

        resize: function() {
            Utils.resizeSpriteByWidth(this.BackSprite, (GameManager.GAME.Renderer.width * 0.75));
            Utils.resizeSpriteByWidth(this.InnerSprite, (GameManager.GAME.Renderer.width * 0.58));
            Utils.resizeSpriteByWidth(this.TickSprite, (GameManager.GAME.Renderer.width * 0.12));
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