var express = require('express');
var requirejs = require('requirejs');
var router = express.Router();

requirejs.config({
  nodeRequire: require
});

/* GET invite friends page. */
router.get('/', function(req, res, next) {
  // Get the referral code from the URL parameter
  console.log("User accessed with a referral code of:", req.query.referral_code);
  // Send the rendered view to the client
  res.render('invitefriends.ejs', { inviteLink: "https://via.flizzet.com/spinintro?referrer_code=" + req.query.referral_code });
});

module.exports = router;