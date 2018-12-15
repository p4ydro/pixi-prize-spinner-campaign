define([
    'Debug/Logger'
], function(Logger) {

    var PrizeManager = function() {};

    PrizeManager.PrizeTypes = {
        TenDollars: "510",
        FiftyPercent: "50% Off",
        ViaPass: "ViaPass",
        TwentyDollars: "$20",
        ThirtyDollars: "$30",
        TwoRides: "2 Free Rides"
    };
    
    PrizeManager.collectPrize = function(prizeType) {
        console.log(prizeType);
        Logger.log("PrizeManager", prizeType);
    };

    return PrizeManager;
})