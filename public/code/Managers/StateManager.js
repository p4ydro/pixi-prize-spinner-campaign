define([
    'Game',
    'Debug/Logger',
    'States/GameState'
], function(Game, Logger, GameState) {

    var StateManager = function() {
        this.initStateManager();
    }

    StateManager.Current = undefined;
    StateManager.StateType = {
        InviteFriends: 1,
        ThankYou: 2,
        Referred: 3,
        Game: 4,
        Prize: 5
    };

    // StateManager Type
    StateManager.prototype.initStateManager = function() {

    };

    StateManager.enterState = function(stateType) {

        if (this.Current != null) {
            this.Current.onExit();
        }

        switch (stateType) {
            case this.StateType.InviteFriends:
            break;
            case this.StateType.ThankYou:
            break;
            case this.StateType.Referred:
            break;
            case this.StateType.Game:
                Logger.log("StateManager.js", "Entered GameState");
                this.Current = GameState;
            break;
            case this.StateType.Prize:
            break;
        }
        
        // Call all functions
        this.Current.onEnter();
    };

    StateManager.update = function() {
        // Update current state
        if (this.Current !== undefined) {
            this.Current.update();
        }
    };

    StateManager.resize = function() {
        // Resize current state
        if (this.Current !== undefined) {
            this.Current.resize();
        }
    }

    return StateManager;

});