var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var FileStore = require('session-file-store')(session); //will save json files in the session folder

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
//app.use(cookieParser('12345-67890-09876-54321')); //added a secret key, set by me
app.use(session({
	name: 'session-id',
	secret: '12345-67890-09876-54321',
	saveUnitialized: false,
	resave: false,
	store: new FileStore()
}));

//these routes below can be accessed before authentication
app.use('/', indexRouter);
app.use('/users', usersRouter);

//app accesses middleware in the order it is placed here, I think?
function auth(req, res, next){
	console.log('signed cookies: ')
	console.log(req.signedCookies); //see the authorisation headers
	console.log('req. session: ')
	console.log(req.session);
	
	if(!req.session.user){	
		var err = new Error("You are not authenticated");
		err.status = 403;
		return next(err);		
	}else{
		if(req.session.user ==='authenticated'){
			next(); //pass on
		}else{
			var err = new Error("You are not authenticated");
			err.status = 403;
			return next(err);
		}
	}
/*	
		var auth = new Buffer.from(authHeader.split(' ')[1], 'base64').toString().split(':');
		//creates an array with 2 items, pword and username
		var username = auth[0];
		var password = auth[1];
		console.log(username, "\n", password)
		if(username === 'admin' && password ==='password'){ //hardcode for now
			//res.cookie('user', 'admin', {signed: true})
			req.session.user = 'admin';
			next(); //pass to next set of middleware
		}else{
			var err = new Error("You are not authenticated");
			res.setHeader('WWW-Authenticate', 'Basic');
			err.status = 401;
			return next(err);	
		}
	}else{
		//user already exists
		if(req.session.user ==='admin'){
			next(); //pass on
		}else{
			var err = new Error("You are not authenticated");
			err.status = 401;
			return next(err);
		}
	}
*/		
	
}
app.use(auth); //before can access below resources, they must be authorised

app.use(express.static(path.join(__dirname, 'public')));

//the lines below need to go above the authentication step
//app.use('/', indexRouter);
//app.use('/users', usersRouter);
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
