var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');
var RequestClient = require("reqclient").RequestClient;

var indexRouter = require('./routes/index');
var gameRouter = require('./routes/game');
var inviteFriendsRouter = require('./routes/invitefriends');
var spinIntroRouter = require('./routes/spinintro');
var thankYouRouter = require('./routes/thankyou');

app = express();

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');

// Cookie setup
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// All routes setup
app.use('/', indexRouter);
app.use('/game', gameRouter);
app.use('/invitefriends', inviteFriendsRouter);
app.use('/spinintro', spinIntroRouter);
app.use('/thankyou', thankYouRouter);

// Application usage setup
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'node_modules')));

// POST listener setup
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/invitefriends', function(req, res) {
  console.log("POST from /invitefriends");
  
  res.sendStatus(200);
  res.end("yes");
});

// Using referral code for receiving reward code
var client = new RequestClient({
  baseUrl: "https://referralgame.ridewithvia.com/",
  debugRequest: true, debugResponse: true
});

app.getRewardCode = function(referrercode, rewardtype, res) {
  console.log("Called reward code in app from router");

  // Create post client
  var p = client.post(
  "", 
  {
    "referrer_code": referrercode,
    "reward_type": rewardtype
  }, 
  {
    headers: {
      "Content-Type": "application/json",
      "x-api-key": "he8UKuofcja59p2lfQx5t1KdOJ4OMuhC3tJG3ayJ",
  }
  });

  // Promise responses
  p.then(apiSuccess, apiReject);

  // Success
  function apiSuccess(httpResponse) {
    console.log("API Successfully returned a response: " + JSON.stringify(httpResponse));
    console.log("Supplied reward code: " + httpResponse.reward_code);
    
    app.rewardcode = httpResponse.reward_code;

    res.send(app.rewardcode);
  }
  // Failure
  function apiReject(httpResponse) {
    try {
      console.log("Api rejected: " + httpResponse["message"]);
    } catch(e) {
      console.error(e);
    }
  }
}

// RequireJS setup
var requirejs = require('requirejs');
requirejs.config({
    //Pass the top-level main.js/index.js require
    //function to requirejs so that node modules
    //are loaded relative to the top-level JS file.
    nodeRequire: require,
    waitSeconds: 0
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error.ejs');
});

module.exports = app;
