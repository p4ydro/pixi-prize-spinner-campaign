$(document).ready(function() {
    document.body.addEventListener('touchmove', function(e) {
        e.preventDefault();
    }, { passive: false });

    var firstMove;

    window.addEventListener('touchstart', function (e) {
        firstMove = true;
    });

    window.addEventListener('touchmove', function (e) {
        if (firstMove) {
            e.preventDefault();

            firstMove = false;
        }
    }, { passive: false });
});