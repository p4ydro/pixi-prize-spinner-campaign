var express = require('express');
var requirejs = require('requirejs');
// var fs = require('fs');
var router = express.Router();

requirejs.config({
  nodeRequire: require
});

/* GET index page. */
router.get('/', function(req, res, next) {
  // Send the rendered view to the client
  // var prizeHTML = fs.readFileSync(path.join(__dirname, 'prizeprompt.html'));
  // console.log(prizeHTML);
  // res.render('index.ejs', { prizePromptHTML: prizeHTML });
  res.render('index.ejs');
});

module.exports = router;
