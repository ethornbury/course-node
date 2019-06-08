/*
*/
const express = require('express');
const bodyParser = require('body-parser');

const dishRouter = express.Router();
dishRouter.use(bodyParser.json());

dishRouter.route('/')
//this will be executed first and the params req, res will be passed next
.all((req, res, next)=>{
	res.statusCode = 200;
	res.setHeader('Content-Type', 'text/plain');
	next();
})
.get((req, res, next)=> {
	res.end("Will send all dishes to you");
})
.post((req, res, next)=> {
	res.end('will add info to the dish: ' +req.body.name+ 
		' with details: ' +req.body.description);
})
.put((req, res, next)=> {
	res.statusCode = 403;
	res.end('PUT operation not supported on dishes');	
})
.delete((req, res, next)=> {
	res.end('deleting all dishes');
});

module.exports = dishRouter;
/*
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
*/

