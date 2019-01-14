var express = require('express');
var requirejs = require('requirejs');
var router = express.Router();


requirejs.config({
  //Pass the top-level main.js/index.js require
  //function to requirejs so that node modules
  //are loaded relative to the top-level JS file.
  nodeRequire: require
});

/* GET home page. */
router.get('/', function(req, res, next) {
  // send the rendered view to the client
  res.render('spinintro.ejs', { referrer_code: req.query.referrer_code });
});

module.exports = router;
