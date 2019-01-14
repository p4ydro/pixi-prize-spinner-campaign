var express = require('express');
var requirejs = require('requirejs');
var router = express.Router();

requirejs.config({
  nodeRequire: require
});

/* GET index page. */
router.get('/', function(req, res, next) {
  // send the rendered view to the client
  res.render('index.ejs');
  // Get the referral code from the URL parameter
  req.app.referrercode = req.query.referrercode;
  console.log("User accessed with referral code of:", req.app.getReferrerCode());
});

module.exports = router;
