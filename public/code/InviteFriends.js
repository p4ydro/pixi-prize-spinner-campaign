$('.share-button').on('click', function() {
    // Per share-type share behavior
    switch (this.dataset.type) {
        case "text":
        break;
        case "email":
        break;
        case "facebook":
        break;
    }

    // Enter next page
    enterThankYouPage();
});

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