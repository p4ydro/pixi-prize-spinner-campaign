define([
    'Debug/Logger',
    'Managers/GameManager',
    'UI/Spinner',
], 
function(Logger, GameManager, Spinner) {

    var spinner;

    var GameState = {
        onEnter: function() {
            spinner = new Spinner();
    
            // Add all components to stage
            GameManager.GAME.GameScene.addChild(spinner.BackSprite);
            GameManager.GAME.GameScene.addChild(spinner.InnerSprite);
            GameManager.GAME.GameScene.addChild(spinner.TickSprite);

            // Attach spinner button click
            if (!localStorage.getItem('po')) {
                $('.spin-button').on('click', function() {
                    if (!spinner.spun && !$(this).hasClass("removed")) {
                        spinner.spin();
                        $(this).addClass("removed");
                        $('.game-overlay .spin-text .seconds-text').css('opacity', '0');
                        $('.game-overlay .spin-text .spinning-text').css('opacity', '1');
                    }
                });
            } else {
                $('.spin-button').remove();
                $('.game-overlay .spin-text .seconds-text').css('opacity', '0');
            }
        },

        update: function() {
            spinner.update();
        },

        resize: function() {
            spinner.resize();
        },

        onExit: function() {

        }
    };

    return GameState;

});