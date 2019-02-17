$(document).ready(function() {
    positionHowItWorksContainer();
    positionBottomHalf();

    // How-It-Works prompt centering for iOS WebKit based browsers
    // Get users UserAgent for OS & Browser identification
    var ua = window.navigator.userAgent;
    // Using the acquired UserAgent, check if the user is on an iOS device (iPhone, iPad)
    var iOS = !!ua.match(/iPad/i) || !!ua.match(/iPhone/i);
    // Check if WebKit is being used (the rendering engine for Safari or Chrome)
    var webkit = !!ua.match(/WebKit/i);
    // Check if on iOS with webkit (Chrome or Safari)
    var iOSWebKit = iOS && webkit;

    // If we're in an iOS WebKit browser, position the prompt container
    if (iOSWebKit) {
        // Get the "client height" of the document's inner documentElement ("client height" is height without toolbars/actionbars)
        var clientHeight = document.documentElement.clientHeight;

        // Use JQuery to set CSS for prompt container
        $('.prompt-container').css({
            // Set top value of prompt container to half of the acquired "client height"
            //// Note that in CSS, '.prompt-container' has a "transform: translate(-50%, -50%"), making its origin in the center
            "top": (clientHeight / 2)
        });
    }

    $('.how-it-works-container .how-it-works-link').css('opacity', '1');
});

$(window).resize(function() {
    positionHowItWorksContainer();
    positionBottomHalf();
});

function shareButtonClick(intent, inviteLink) {
    var smsLink = "sms:?&body=I%20ride%20with%20Via%2C%20you%20should%20too!%20Spin%20the%20wheel%20to%20score%20a%20special%20prize.%20" + inviteLink + "";
    var emailLink = "mailto:?to=&body=%20I%20ride%20with%20Via%2C%20you%20should%20too!%20Rides%20are%20fast%2C%20comfy%2C%20and%20always%20a%20low%20fare.%20Follow%20this%20link%20to%20spin%20the%20prize%20wheel%20and%20score%20a%20special%20sign%20up%20bonus.%20" + inviteLink + "&subject=Spin%20the%20Via%20prize%20wheel";
    var facebookLink = "https://www.facebook.com/sharer/sharer.php?u=https://ridewithvia.com/&quote=I%20ride%20with%20Via%2C%20you%20should%20too!%20Rides%20are%20fast%2C%20comfy%2C%20and%20always%20a%20low%20fare.%20Follow%20this%20link%20to%20spin%20the%20prize%20wheel%20and%20score%20a%20special%20sign%20up%20bonus.%20" + inviteLink + "";

    switch (intent) {
        case 'SMS':
            window.open(smsLink);
        break;
        case 'Email':
            window.open(emailLink);
        break;
        case 'Facebook':
            window.open(facebookLink);
        break;
    }

    enterThankYouPage();
}

function showHowItWorksPrompt() {
    $('.darkener').addClass('shown');
    $('.prompt-container').addClass('active');
}

function hideHowItWorksPrompt() {
    $('.darkener').removeClass('shown');
    $('.prompt-container').removeClass('active');
}

function enterThankYouPage() {
    window.location.href = "thankyou";
}

function positionHowItWorksContainer() {
    var hiwc = $('.how-it-works-container');

    // Get fb button
    var fbButton = $('#fb-button');
    var fbBottomY = fbButton.offset().top;
    fbBottomY += fbButton.height();
    // Position fb button centered between button and bottom
    var centeredY = fbBottomY + ((window.innerHeight - fbBottomY) / 2);
    hiwc.offset({ top: centeredY - (hiwc.height() / 2) });
}

function positionBottomHalf() {
    var bc = $('#bottom-half-content');
    var hiwc = $('.how-it-works-container');
    
    var bcBottom = bc.offset().top + bc.height();
    var hiwcTop = hiwc.offset().top;
    var spacing = window.innerHeight * 0.02;
    if (bcBottom > hiwcTop) {
        var newHiwcTop = window.innerHeight - hiwc.height() - spacing;
        hiwc.offset({ top: newHiwcTop });
        bc.css({ 
            "position": "fixed",
            "top": "57vh",
            "left": "50%",
            "width": "100%",
            "transform": "translate(-50%, -50%)"
         })
    }
}