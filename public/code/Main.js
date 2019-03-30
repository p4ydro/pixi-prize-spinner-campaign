require([
    'Managers/GameManager',
    'Game',
    'Debug/Logger',
    'Images',
    'Managers/PrizeManager'
], function(GameManager, Game, Logger, Images, PrizeManager) {
    // Start game
    function StartGame() {
        // Preload the game
        PIXI.loader
            .add(Object.values(Images))
            .on("progress", function(e) {
                Logger.log("Main", "Loading: " + e.progress);
            })
            .load(function() {
                GameManager.GAME = new Game();
                GameManager.GAME.initGame();
            });

        // Prize prompt centering for iOS WebKit based browsers
        var ua = window.navigator.userAgent;
        var iOS = !!ua.match(/iPad/i) || !!ua.match(/iPhone/i);
        var webkit = !!ua.match(/WebKit/i);
        var iOSWebKit = iOS && webkit;
        if (iOSWebKit) {
            var clientHeight = document.documentElement.clientHeight;
            var clientWidth = document.documentElement.clientWidth;
            // $('.prize-iframe-container').css({
                // "top": (clientHeight / 2),
                // "left": (clientWidth / 2),
                // "transform": "translate(-50%, -50%)"
            // });
            // $('.prize-iframe').css({
            //     "margin-top": "12%"
            // })
        }


        // Check for previous completion
        if (localStorage.getItem('po')) {
            PrizeManager.collectPrize(true);
        }

        // Resize prize frame on window resize
        $(window).on('resize', function() {
            resizePrizeFrameWithContent($('iframe'));
        });

        $(window).on('textFormOpened', function() {
            setTimeout(function() {
                console.log("Text form opent");
                resizePrizeFrameWithContent($('iframe'));
            }, 300)
        });
    };

    function getMobileOperatingSystem() {
        var userAgent = navigator.userAgent || navigator.vendor || window.opera;
      
        if (/windows phone/i.test(userAgent)) {
            return "Windows Phone";
        }
    
        if (/android/i.test(userAgent)) {
            return "Android";
        }
    
        if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
            return "iOS";
        }
      
        return "unknown";
    }

    // Start game
    StartGame();

});