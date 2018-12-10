define(function() {
    var Utils = {
        resizeSpriteByWidth: function(sprite, newWidth) {
            let newScale = newWidth / sprite.width;
            sprite.width = newWidth;
            sprite.height = sprite.height * newScale;
        },
        resizeSpriteByHeight: function(sprite, newHeight) {
            let newScale = newHeight / sprite.height;
            sprite.width = sprite.width * newScale;
            sprite.height = newHeight;
        }
    }

    return Utils;
});