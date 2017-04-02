var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport')
var mongoose = require('mongoose');
var mongo= require('mongodb');

var index = require('./routes/index');
var users = require('./routes/users');

var applicant = require('./models/applicant');

var acceptedlist = require('./routes/acceptedlist');

// apis for calling database
// API to get whole list of applicants
var applicantlist = require('./routes/api/applicantlist');
// API to get whole list of influencers
var influencerlist = require('./routes/api/influencerlist');


var app = express();
mongoose.connect('mongodb://localhost:27017/applicant');
// view engine setup

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon inpublic
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// app.use('/users', users);


require('./config/passport');

app.use(passport.initialize());
app.use('/', index);
app.use('/acceptedlist', acceptedlist);
app.use('/api/applicantlist', applicantlist);
app.use('/api/influencerlist', influencerlist);

// app.use('/api', routesApi);
// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   var err = new Error('Not Found');
//   err.status = 404;
//   next(err);
// });
// app.use(function(req, res) {
//   res.sendFile(path.join(__dirname, 'app_client', 'index'));
// });

// // error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

module.exports = app;  
