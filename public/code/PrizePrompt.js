var textLinkClicked = false;
var smsSent = false;

$(document).ready(function() {
    $('.text-code-link').click(function(e) {
        if (!textLinkClicked) {
            textLinkClicked = true;
            $('.text-code-link').addClass('disabled');
            $('.text-phone-form').addClass('active');

            postJQueryEventToWindow("textFormOpened");
        }
    });

    // Force phone number format
    $("#phone-number-input").on('input', function() {
        $(this).val($(this).val().replace(/^(\d{3})(\d{3})(\d)+$/, "($1)$2-$3"));
    });

    // Confirm validity for SMS form input
    $('#send-code-sms-form').change(function(e) {
        e.target.setCustomValidity("");
    });

    // Set up download button
    $('.download-button').click(function(e) {
        console.log("DL");
        console.log("Download button clicked");
        // Open download link based on respective OS
        switch (getMobileOperatingSystem()) {
            case "iOS":
                window.top.location.href = "https://itunes.apple.com/us/app/via-low-cost-ride-sharing/id657777015?mt=8";
            break;
            case "Android": // Fall through intended
            default:
                window.top.location.href = "https://play.google.com/store/apps/details?id=via.rider&hl=en_US";
            break;
        }
    });

    // Send SMS on click
    $('.text-phone-form .submit-button').click(function(e) {
        // Get clean phone number by replacing parentheses and dashes            
        var cleanNumber = $("#phone-number-input").val().replace(/[^+\d]+/g, "");

        if ($.isNumeric(cleanNumber) && cleanNumber.length === 10) {
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
});

function postJQueryEventToWindow(event) {
    var w = window;
    // Send message to parent window if we're in an iFrame and the parent document has JQuery
    if (w.frameElement != null
    && w.frameElement.nodeName === "IFRAME"
    && w.parent.jQuery) {
        w.parent.jQuery(w.parent.document).trigger(event);
    }
}

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