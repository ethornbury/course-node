const express = require('express')
const http = require('http');
//const fs = require('fs');
//const path = require('path');
const app = express(); //use express module

const hostname = 'localhost';
const port = 3000;
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

