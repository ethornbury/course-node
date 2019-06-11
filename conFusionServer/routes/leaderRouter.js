/*
*/
const express = require('express');
const bodyParser = require('body-parser');

const leaderRouter = express.Router();
leaderRouter.use(bodyParser.json());

leaderRouter.route('/')
//this will be executed first and the params req, res will be passed next
.all((req, res, next)=>{
	res.statusCode = 200;
	res.setHeader('Content-Type', 'text/plain');
	next();
})
.get((req, res, next)=> {
	res.end("Will send all leaders to you");
})
.post((req, res, next)=> {
	res.end('will add info to the leader: ' +req.body.name+ 
		' with details: ' +req.body.description);
})
.put((req, res, next)=> {
	res.statusCode = 403;
	res.end('PUT operation not supported on leaders');	
})
.delete((req, res, next)=> {
	res.end('deleting all leaders');
});

//----- with params
leaderRouter.route('/:leaderId')
.get((req, res, next)=> {
	res.end('Will send details of the leader: '+req.params.leaderId); 
	//dishId needs to match with get on line above
})
.post((req, res, next)=> {
	res.statusCode = 403;
	res.end('POST operation not supported on leaders: ' +req.params.leaderId);
})
.put((req, res, next)=> {
	res.write('Updating the leader: '+req.params.leaderId);
	res.end('\nWill update the leader: '+req.body.name+
	' with details: ' +req.body.description);	
})
.delete((req, res, next)=> {
	res.end('Deleting the leader: '+req.params.leaderId);
});

module.exports = leaderRouter;

