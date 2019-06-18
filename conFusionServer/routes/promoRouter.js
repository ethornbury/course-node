const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Promotions = require('../models/promotions');
const promoRouter = express.Router();
promoRouter.use(bodyParser.json());

promoRouter.route('/')

.get((req, res, next)=> {
	Promotions.find({})
	.then((promotions) =>{
		res.statusCode = 200;
		res.setHeader('content-Type', 'application/json');
		res.json(promotions);
	}, (err) => next(err))
	.catch((err) => next(err));	
})
.post((req, res, next)=> {
	Promotions.create(req.body)
	.then((promotion)=> {
		console.log('will add info to the promo: ' +req.body.name);
		res.statusCode = 200;
		res.setHeader('content-Type', 'application/json');
		res.json(promotion);
	}, (err) => next(err))
	.catch((err) => next(err));
})
.put((req, res, next)=> {
	res.statusCode = 403;
	res.end('PUT operation not supported on promos');	
})
.delete((req, res, next)=> {
	Promotions.remove({})
	.then((resp) => {
		res.statusCode = 200;
		res.setHeader('content-Type', 'application/json');
		res.json(resp);
	}, (err) => next(err))
	.catch((err) => next(err));	
});

//----- with params holders
/*
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
*/
//----- with params /:dishId
promoRouter.route('/:promoId')
.get((req, res, next)=> {
	Promotions.findById(req.params.promoId)
	.then((promotion)=> {
		//console.log('promotion found: ', promotion);
		res.statusCode = 200;
		res.setHeader('content-Type', 'application/json');
		res.json(promotion);
	}, (err) => next(err))
	.catch((err) => next(err));
})
.post((req, res, next)=> {
	res.statusCode = 403;
	res.end('POST operation not supported on promotions: ' +req.params.promoId);
})
.put((req, res, next)=> {
	Promotions.findByIdAndUpdate(req.params.promoId, {
		$set: req.body
	}, {new: true})
	.then((promotion)=> {
		//console.log('promotion found: ', promotion);
		res.statusCode = 200;
		res.setHeader('content-Type', 'application/json');
		res.json(promotion);
	}, (err) => next(err))
	.catch((err) => next(err));
})
.delete((req, res, next)=> {
	Promotions.findByIdAndRemove(req.params.promoId)
	.then((promotion)=> {
		console.log('promotions deleted');
		res.statusCode = 200;
		res.setHeader('content-Type', 'application/json');
		res.json(promotion);
	}, (err) => next(err))
	.catch((err) => next(err));
});


module.exports = promoRouter;

