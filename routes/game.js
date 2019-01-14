var express = require('express');
var requirejs = require('requirejs');
var router = express.Router();
var bodyParser = require('body-parser');

requirejs.config({
  nodeRequire: require
});

/* GET game page. */
router.get('/', function(req, res, next) {
  // Get the referrer code from the URL parameter
  if (req.query.referrer_code) {
    console.log("Playing game with referrer code: ", req.query.referrer_code);
  }

  // Send the rendered view to the client, passing the referral code
  res.render('game.ejs');
});

router.post('/rewardcode', function(req, res) {
  req.app.getRewardCode(req.body.referrercode, req.body.rewardtype, res);
});

module.exports = router;
