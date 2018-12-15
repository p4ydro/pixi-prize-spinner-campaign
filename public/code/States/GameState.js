define([
    'Debug/Logger',
    'UI/Background',
    'Managers/GameManager',
    'UI/Spinner',
], 
function(Logger, Background, GameManager, Spinner) {

    var background;
    var spinner;

    var GameState = {
        onEnter: function() {
            // Create all components
            background = new Background();
            spinner = new Spinner();
    
            // Add all components to stage
            GameManager.GAME.GameScene.addChild(background.Sprite);
            GameManager.GAME.GameScene.addChild(spinner.BackSprite);
            GameManager.GAME.GameScene.addChild(spinner.InnerSprite);
            GameManager.GAME.GameScene.addChild(spinner.TickSprite);

            // Attach spinner button click
            $('.spin-button').on('click', function() {
                spinner.spin();
                $(this).addClass("removed");
            });
        },

        update: function() {
            background.update();
            spinner.update();
        },

        resize: function() {
            background.resize();
            spinner.resize();
        },

        onExit: function() {

        }
    };

    return GameState;

});