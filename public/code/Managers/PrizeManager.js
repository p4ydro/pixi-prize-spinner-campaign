define([
    'Debug/Logger'
], function(Logger) {

    var PrizeManager = function() {};

    PrizeManager.PrizeTypes = {
        TenDollars: "$10",
        FiftyPercent: "50% Off",
        ViaPass: "ViaPass",
        TwentyDollars: "$20",
        ThirtyDollars: "$30",
        TwoRides: "2 Free Rides"
    };

    PrizeManager.collectPrize = function(prizeType) {
        Logger.log("PrizeManager", prizeType);
        
        var prizeIndex = this.findRewardTypeByPrizeType(prizeType);
        var referrercode = getQueryStringParams()["referrer_code"];

        // Make post request for the reward code
        $.post("/game/rewardcode", { rewardtype: prizeIndex, referrercode: referrercode }, function(data) {
            // Check if we received a reward code back
            if (data) {
                // If we received a reward code, show it in the prompt
                $(".code-container .reward-code-text").html(data);

                // Show prompt
                this.openPrizePrompt(prizeType);
            } else {
                console.error("Reward code not found.", data);
            }
        }.bind(this));
    };

    PrizeManager.openPrizePrompt = function(prizeType) {
        // Fill prompt with information
        let prizeInfo = this.getPrizeInfo(prizeType);
        $('.prize-section h1').html(prizeInfo.name);
        $('.description-section .prize-text').html(prizeInfo.description);

        // Show darkener
        $('.darkener').addClass('shown');
        // Show prompt
        $('.prompt-container').addClass('active');
    };

    PrizeManager.getPrizeInfo = function(prizeType) {
        let prizeObj = {};
        let d = "";
        let n = "";

        // Find prize description based on prize type
        switch (prizeType) {
            case this.PrizeTypes.TenDollars:
                d = "$10 off!";
                n = "$10 Off";
            break;
            case this.PrizeTypes.FiftyPercent:
                d = "50% off five rides!";
                n = "50% Off";
            break;
            case this.PrizeTypes.ViaPass:
                d = "a ViaPass!";
                n = "ViaPass";
            break;
            case this.PrizeTypes.TwentyDollars:
                d = "$20 off!";
                n = "$20 Off";
            break;
            case this.PrizeTypes.ThirtyDollars:
                d = "$30 off!"
                n = "$30 Off";
            break;
            case this.PrizeTypes.TwoRides:
                d = "two rides free!"
                n = "Two Rides";
            break;
            default:
                d = "We hit default";
                n = "Default";
            break;
        }

        // Apply found description
        prizeObj.description = "You've won " + d;
        prizeObj.name = n;

        return prizeObj;
    };

    PrizeManager.findRewardTypeByPrizeType = function(prizeType) {
        var result = -1;

        // Find reward code based on table provided by Via
        switch (prizeType) {
            case this.PrizeTypes.TenDollars:
                result = 1;
            break;
            case this.PrizeTypes.TwentyDollars:
                result = 2;
            break;
            case this.PrizeTypes.ThirtyDollars:
                result = 3;
            break;
            case this.PrizeTypes.TwoRides:
                result = 4;
            break;
            case this.PrizeTypes.FiftyPercent:
                result = 5;
            break;
            case this.PrizeTypes.ViaPass:
                result = 6;
            break;
        }

        return result;
    };

    getQueryStringParams = query => {
        return (function(a) {
            if (a == "") return {};
            var b = {};
            for (var i = 0; i < a.length; ++i)
            {
                var p=a[i].split('=', 2);
                if (p.length == 1)
                    b[p[0]] = "";
                else
                    b[p[0]] = decodeURIComponent(p[1].replace(/\+/g, " "));
            }
            return b;
        })(window.location.search.substr(1).split('&'));
    };

    return PrizeManager;
})