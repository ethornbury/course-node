/*
*/
const express = require('express');
const bodyParser = require('body-parser');

const promoRouter = express.Router();
promoRouter.use(bodyParser.json());

promoRouter.route('/')
//this will be executed first and the params req, res will be passed next
.all((req, res, next)=>{
	res.statusCode = 200;
	res.setHeader('Content-Type', 'text/plain');
	next();
})
.get((req, res, next)=> {
	res.end("Will send all promos to you");
})
.post((req, res, next)=> {
	res.end('will add info to the promo: ' +req.body.name+ 
		' with details: ' +req.body.description);
})
.put((req, res, next)=> {
	res.statusCode = 403;
	res.end('PUT operation not supported on promos');	
})
.delete((req, res, next)=> {
	res.end('deleting all promos');
});

//----- with params
promoRouter.route('/:promoId')
.get((req, res, next)=> {
	res.end('Will send details of the promo: '+req.params.promoId); 
	//promoId needs to match with get on line above
})
.post((req, res, next)=> {
	res.statusCode = 403;
	res.end('POST operation not supported on promos: ' +req.params.promoId);
})
.put((req, res, next)=> {
	res.write('Updating the promo: '+req.params.promoId);
	res.end('\nWill update the promo: '+req.body.name+
	' with details: ' +req.body.description);	
})
.delete((req, res, next)=> {
	res.end('Deleting the promo: '+req.params.promoId);
});

module.exports = promoRouter;

