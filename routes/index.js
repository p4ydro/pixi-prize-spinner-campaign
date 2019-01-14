var express = require('express');
var requirejs = require('requirejs');
var router = express.Router();

requirejs.config({
  nodeRequire: require
});

/* GET index page. */
router.get('/', function(req, res, next) {
  // Get referrer code from URL parameters
  let referrercode = "nocode";
  if (req.query.referrer_code) {
    referrercode = req.query.referrer_code;
  }
  
  console.log("User accessed with referrer code of:", referrercode);
  // Send the rendered view to the client
  res.render('index.ejs');
});

module.exports = router;
