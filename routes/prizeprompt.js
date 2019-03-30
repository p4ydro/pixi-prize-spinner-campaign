var express = require('express');
var requirejs = require('requirejs');
var router = express.Router();

requirejs.config({
    //Pass the top-level main.js/index.js require
    //function to requirejs so that node modules
    //are loaded relative to the top-level JS file.
    nodeRequire: require
});

router.get('/', function(req, res, next) {
    res.render('prizeprompt.ejs');
});

module.exports = router;