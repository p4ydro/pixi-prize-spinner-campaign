define([
    'Debug/Logger'
], function(Logger) {

    var PrizeManager = function() {};

    PrizeManager.foundPrizeIndex;
    PrizeManager.foundPrizeType;
    PrizeManager.foundPrizeObject;

    PrizeManager.PrizeTypes = {
        TwentyfiveDollars: "$25",
        FiftyPercent: "50% Off",
        ViaPass: "ViaPass",
        TwentyDollars: "$20",
        ThirtyDollars: "$30",
        TwoRides: "2 Free Rides"
    };

    PrizeManager.collectPrize = function(previousPlay) {
        Logger.log("PrizeManager", this.foundPrizeType);
        
        var referrercode = getQueryStringParams()["referrer_code"];

        // Check for previous play
        if (!previousPlay) {
            if (localStorage.getItem('po')) {
                Logger.log("Player played before.");
                previousPlay = true;
            } else {
                Logger.log("Player hasn't played before.");
            }
        }

        // Assign any previous play
        if (previousPlay) {
            // Show old object
            var previousPlayResults = JSON.parse(localStorage.getItem('po'));
            // Code
            if (previousPlayResults.cd) {
                $(".code-container .reward-code-text").html(previousPlayResults.cd);
            } else {
                $(".code-container .reward-code-text").html("Error");
            }
            // Prompt style
            if (previousPlayResults.pt) {
                this.openPrizePrompt(PrizeManager.PrizeTypes[previousPlayResults.pt]);
            }

            return;
        }


        // If it requests a legacy $10 rewardID, apply the new $25 rewardID
        if (this.foundPrizeIndex == 1) {
            this.foundPrizeIndex = 7;
        }
        // Make post request for the reward code
        $.post("/game/rewardcode", { rewardtype: this.foundPrizeIndex, referrercode: referrercode }, function(data) {
            // Check if we received a reward code back
            if (data) {
                // If we received a reward code, show it in the prompt
                $(".code-container .reward-code-text").html(data);
                // Apply reward code to download link
                downloadLink = $('.links-container .button-container a');
                let newLink = downloadLink.attr("href") + data;
                downloadLink.attr("href", newLink);

                // Save this data to localStorage
                var pobj = {
                    pb: true,
                    cd: data,
                    pt: this.foundPrizeType
                }

                // localStorage.setItem('po', JSON.stringify(pobj));

                // Show prompt
                this.openPrizePrompt(PrizeManager.PrizeTypes[this.foundPrizeType]);
            } else {
                console.error("Reward code not found.", data);
            }
        }.bind(this));
    };

    PrizeManager.openPrizePrompt = function(prizeType) {
        // Fill prompt with information
        var prizeInfo = this.getPrizeInfo(prizeType);
        var prizeColor = this.findColorByPrizeType(prizeType);
        $('.prize-section').css("background-color", prizeColor);
        $('.prize-section h1').html(prizeInfo.name);
        $('.description-section .prize-text').html(prizeInfo.description);

        // Hide secondary text if unecessary
        if (prizeType !== this.PrizeTypes.TwoRides
        && prizeType !== this.PrizeTypes.FiftyPercent) {
            // Hide text
            $('.prompt-container .description-section .secondary-prize-text').remove();
            // Decrease padding on text box as it's now empty space
            $('.prompt-container .description-section .prize-text-content').css('padding-bottom', '20px');
        }

        // Show darkener
        $('.darkener').addClass('shown');
        // Show prompt
        $('.prompt-container').addClass('active');
    };

    PrizeManager.getPrizeInfo = function(prizeType) {
        var prizeObj = {};
        var d = "";
        var n = "";

        // Find prize description based on prize type
        switch (prizeType) {
            case this.PrizeTypes.TwentyfiveDollars:
                d = "$25 off!";
                n = "$25 Off";
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
            case this.PrizeTypes.TwentyfiveDollars:
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

    PrizeManager.findColorByPrizeType = function(prizeType) {
        var result = "#F28F32";

        // Find reward code based on table provided by Via
        switch (prizeType) {
            case this.PrizeTypes.TwentyfiveDollars:
                result = "#25B5EE";
            break;
            case this.PrizeTypes.TwentyDollars:
                result = "#D7461F";
            break;
            case this.PrizeTypes.ThirtyDollars:
                result = "#FCD838";
            break;
            case this.PrizeTypes.TwoRides:
                result = "#7A89E5";
            break;
            case this.PrizeTypes.FiftyPercent:
                result = "#F28F32";
            break;
            case this.PrizeTypes.ViaPass:
                result = "#005583";
            break;
            default:
                result = "#F28F32";
            break;
        }

        return result;
    };

    PrizeManager.getRandomPrizeValue = function() {
        var randomPrizePercent = Math.floor(Math.random() * 100) + 1;
        var prizeInts = Object.keys(PrizeManager.PrizeTypes);
        var intPrizeValue = 0;

        if (randomPrizePercent < 40) {
            // $20
            intPrizeValue = 3;
        } else if (randomPrizePercent < 54) {
            // $30
            intPrizeValue = 4;
        } else if (randomPrizePercent < 69) {
            // 2FREE
            intPrizeValue = 5;
        } else if (randomPrizePercent < 79) {
            // 5RIDES
            intPrizeValue = 1;
        } else if (randomPrizePercent < 80) {
            // VIAPASS
            intPrizeValue = 2;
        } else if (randomPrizePercent < 100) {
            // $25
            intPrizeValue = 0;
        }

        this.foundPrizeType = prizeInts[intPrizeValue];
        this.foundPrizeObject = PrizeManager.PrizeTypes[this.foundPrizeType];
        this.foundPrizeIndex = this.findRewardTypeByPrizeType(this.foundPrizeObject);

        return intPrizeValue;
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