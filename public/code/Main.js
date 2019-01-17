require([
    'Managers/GameManager',
    'Game',
    'Debug/Logger',
    'Images',
], function(GameManager, Game, Logger, Images) {

    var smsSent = false;

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

        // Set up text code button
        $('.text-code-link').click(function(e) {
            $('.prompt-container .text-phone-form').fadeIn(300);
            $('.prompt-container .text-phone-form').css('display','block');
        });

        $('#send-code-sms-form').change(function(e) {
            e.target.setCustomValidity("");
        });

        // Send SMS on click
        $('.text-phone-form .submit-button').click(function(e) {
            var numberValidator = $('#send-code-sms-form')
            numberValidator.validate({
                rules: {
                    required: true,
                    phoneUS: true
                }
            });
            if (numberValidator.valid()
            && $.isNumeric($('#phone-number-input').val())
            && $('#phone-number-input').val().length === 10) {
                sendSMS();
            } else {
                if ($('#phone-number-input').val()) {
                    $('#phone-number-input').val('');
                    $('#phone-number-input').attr('placeholder', 'Wrong Format');
                } else {
                    $('#phone-number-input').attr('placeholder', 'Required');
                }
            }
        });
    };

    function sendSMS() {
        // Check if SMS has already been sent
        if (smsSent) return;
        smsSent = true;
        
        // Retrieve phone number and reward code values for SMS
        let phoneNum = $('#phone-number-input').val();
        let rewardCode = $('.code-container .reward-code-text').html();
        
        // Send SMS
        let fullPostString = '/sms?phone_number=' + phoneNum + '&reward_code=' + rewardCode;
        $.post(fullPostString, function(data) {
            console.log("SMS Completed");
        });

        // Remove text code link & input
        $('.text-code-link').fadeOut(300);
        $('.prompt-container .text-phone-form').fadeOut(300);
    }
 
    // Start game
    StartGame();

});