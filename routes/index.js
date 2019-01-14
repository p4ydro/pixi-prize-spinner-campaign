var express = require('express');
var requirejs = require('requirejs');
var router = express.Router();

requirejs.config({
  nodeRequire: require
});

/* GET index page. */
router.get('/', function(req, res, next) {
  // Send the rendered view to the client
  res.render('index.ejs');
});

module.exports = router;
