/*
app from coursera
*/
const express = require('express')
const http = require('http');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const dishRouter = require('./routes/dishRouter');
const promoRouter = require('./routes/promoRouter');
const leaderRouter = require('./routes/leaderRouter');

const hostname = 'localhost';
const port = 3000;
const app = express(); //use express module

app.use(morgan('dev'));
app.use(bodyParser.json());

app.use('/dishes', dishRouter); //request will be handled by dishrouter
app.use('/dishes/:dishId', dishRouter); //request will be handled by dishrouter

app.use('/promos', promoRouter); //request will be handled by router
app.use('/promos/:promoId', promoRouter); //request will be handled by router

app.use('/leaders', leaderRouter); //request will be handled by router
app.use('/leaders/:leaderId', leaderRouter); //request will be handled by router

app.use(express.static(__dirname+'/public')); //server static files from public file

app.use((req, res, next) => {
	console.log(req.hearders);
	res.statusCode = 200;
	res.setHeader('Content-Type', 'text/html');
	res.end('<html><body><p>This is an express server</p></body></html>');
});

const server = http.createServer(app);
server.listen(port, hostname, ()=> {
	console.log(`Server running at http:${hostname}:${port}`);
});

