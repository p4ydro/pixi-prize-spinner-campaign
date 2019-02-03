$(document).ready(function() {
    positionHowItWorksContainer();
});

$(window).resize(function() {
    positionHowItWorksContainer();
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
    hiwc.offset({ top: (window.innerHeight - hiwc.height() - 20) });
}