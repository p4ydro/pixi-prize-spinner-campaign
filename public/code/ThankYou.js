$(document).ready(function() {
    positionTermsContainer();
});

$(window).resize(function() {
    positionTermsContainer();
});

function positionTermsContainer() {
    var tc = $('.tc-link-container');
    tc.offset({ top: (window.innerHeight - tc.height() - 40) });
    tc.css('opacity', '1');
}