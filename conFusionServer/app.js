var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var dishRouter = require('./routes/dishRouter');
var promoRouter = require('./routes/promoRouter');
var leaderRouter = require('./routes/leaderRouter');


const mongoose = require('mongoose');
const Dishes = require('./models/dishes');
const Leaders = require('./models/leaders');
const Promotions = require('./models/promotions');

const url = 'mongodb://localhost:27017/conFusion'
const connect = mongoose.connect(url);
connect.then((db) => {
	console.log('Connected to mongodb server');
}, (err) => {console.log(err);});

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
//app accesses middleware in the order it is placed here, I think?
function auth(req, res, next){
	console.log(req.headers); //see the authorisation headers
	var authHeader = req.headers.authorization;
	if(!authHeader){
		var err = new Error("You are not authenticated");
		res.setHeader('WWW-Authenticate', 'Basic');
		err.status = 401;
		return next(err);		
	}
	var auth = new Buffer(authHeader.split(' ')[1], 'base64').toString().split(':');
	//creates an array with 2 items, pword and username
	var username = auth[0];
	var password = auth[1];
	console.log(username, "\n", password)
	if(username === 'admin' && password ==='password'){ //hardcode for now
		next(); //pass to next set of middleware
	}else{
		var err = new Error("You are not authenticated");
		res.setHeader('WWW-Authenticate', 'Basic');
		err.status = 401;
		return next(err);	
	}
}
app.use(auth); //before can access below resources, they must be authorised

app.use(express.static(path.join(__dirname, 'public')));



app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/dishes', dishRouter);
app.use('/promotions', promoRouter);
app.use('/leaders', leaderRouter);

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
  res.render('error');
});

module.exports = app;
