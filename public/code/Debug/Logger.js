define([], function() {

    let objectCss = "color: black; border-left: 1px solid black; padding-left: 3px;";
    let logCss = "color: green;";
    let errorCss = "color: red; text-decoration: underline";

    var Logger = {
        log: function(objectName = "", message) {
            console.log("%c" + objectName + " %c" + message, objectCss, logCss);
        },
        error: function(objectName = "", message) {
            console.log("%c" + objectName + " %c" + message, objectCss, errorCss);
        }
    };

    return Logger;

})