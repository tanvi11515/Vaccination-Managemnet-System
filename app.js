var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

//Import the mongoose module
var mongoose = require('mongoose');
//Set up default mongoose connection
var mongoDB = 'mongodb://127.0.0.1/sms';
mongoose.connect(mongoDB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
});

var db = mongoose.connection;

db.on("error", () => {
    console.log("MongoDB connection failed...");
});
db.once("open", () => {
    console.log("MongoDB connection successful...");
});



var index = require('./routes/index');
var peoples = require('./routes/peoples');
var newpeople = require('./routes/people_signup');
var people_login = require('./routes/people_login');
var people_vaccine = require('./routes/people_vaccine');
var addvaccine = require('./routes/addvaccine');
var vaccine_enroll = require('./routes/vaccine_enroll');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

//uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/peoples', peoples);
app.use('/people_signup', newpeople);
app.use('/people_login', people_login);
app.use('/people_vaccine', people_vaccine);
app.use('/addvaccine', addvaccine);
app.use('/vaccine_enroll', vaccine_enroll);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Cannot found the requested page!');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
app.listen(5000);
