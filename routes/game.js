var express = require('express');
var requirejs = require('requirejs');
var router = express.Router();


requirejs.config({
  nodeRequire: require
});

/* GET game page. */
router.get('/', function(req, res, next) {
  // Send the rendered view to the client, passing the referral code
  res.render('game.ejs', {referralCode: req.app.referralCode});
});

module.exports = router;
