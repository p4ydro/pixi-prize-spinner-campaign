define(['Debug/Logger'], 
function(Logger) {

    var GameState = function() {
    };

    GameState.prototype.onEnter = function() {
        Logger.log("GameState", "OnEnter called");

        this.background = new this.background()
    };

    GameState.prototype.update = function() {

    };

    GameState.prototype.resize = function() {

    };

    GameState.prototype.onExit = function() {

    };

    return GameState;

});