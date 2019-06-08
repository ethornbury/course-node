/*
app from coursera
*/
const express = require('express')
const http = require('http');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const hostname = 'localhost';
const port = 3000;
const app = express(); //use express module

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(express.static(__dirname+'/public')); //server static files from public file


//this will be executed first and the params req, res will be passed next
app.all('/dishes', (req, res, next)=>{
	res.statusCode = 200;
	res.setHeader('Content-Type', 'text/plain');
	next();
});

app.get('/dishes', (req, res, next)=> {
	res.end("Will send all dishes to you");
});

app.post('/dishes', (req, res, next)=> {
	res.end('will add info to the dish: ' +req.body.name+ 
		' with details: ' +req.body.description);
});

app.put('/dishes', (req, res, next)=> {
	res.statusCode = 403;
	res.end('PUT operation not supported on dishes');
	
});

app.delete('/dishes', (req, res, next)=> {
	res.end('deleting all dishes');
});

app.get('/dishes/:dishId', (req, res, next)=> {
	res.end('Will send details of the dish: '+req.params.dishId); 
	//dishId needs to match with get on line above
});

app.post('/dishes/:dishId', (req, res, next)=> {
	res.statusCode = 403;
	res.end('POST operation not supported on dishes: ' +red.params.dishId);
});

app.put('/dishes/:dishID', (req, res, next)=> {
	res.write('Updating the dish: '+req.params.dishID);
	res.end('\nWill update the dish: '+req.body.name+
	' with details: ' +req.body.description);	
});

app.delete('/dishes/:dishId', (req, res, next)=> {
	res.end('Deleting the dish: '+req.params.dishId);
});


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




