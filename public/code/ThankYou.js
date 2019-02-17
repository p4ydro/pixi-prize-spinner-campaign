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

    // Check for overlap with paragraph
    var tcTop = tc.offset().top;
    var dft = $(".dont-forget-text");
    var dftBottom = dft.offset().top + dft.height();

    if (window.innerHeight < 500 && /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream) {
        console.log("Overlap");
        // Position between DFT and bottom
        var dftBottom = dft.offset().top + dft.height();
        var newTop = dftBottom + ((window.innerHeight - dftBottom) / 2);

        tc.offset({ top: newTop });

    }
}