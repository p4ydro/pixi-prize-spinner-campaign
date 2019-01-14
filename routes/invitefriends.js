var express = require('express');
var requirejs = require('requirejs');
var router = express.Router();

var referralcode = "nocode";

requirejs.config({
  nodeRequire: require
});

/* GET invite friends page. */
router.get('/', function(req, res, next) {
  // Get the referral code from the URL parameter
  if (req.query.referral_code) {
    referralcode = req.query.referral_code;
  }

  console.log("User accessed with a referral code of:", referralcode);
  // Send the rendered view to the client
  res.render('invitefriends.ejs', { inviteLink: "https://via.flizzet.com/game?referrer_code=" + referralcode });
});

module.exports = router;