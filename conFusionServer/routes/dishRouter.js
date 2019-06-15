/*
*/
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Dishes = require('../models/dishes');
const dishRouter = express.Router();
dishRouter.use(bodyParser.json());

dishRouter.route('/')
/*original before mongodb implemented
this will be executed first and the params req, res will be passed next
.all((req, res, next)=>{
	res.statusCode = 200;
	res.setHeader('Content-Type', 'text/plain');
	next();
})
*/
.get((req, res, next)=> {
	Dishes.find({})
	.then((dishes) =>{
		res.statusCode = 200;
		res.setHeader('content-Type', 'application/json');
		res.json(dishes);
		//put the dishes into the body of the reply message and send to server
	}, (err) => next(err))
	.catch((err) => next(err));
})
.post((req, res, next)=> {
	Dishes.create(req.body)
	.then((dish)=> {
		console.log('Dish created', dish);
		res.statusCode = 200;
		res.setHeader('content-Type', 'application/json');
		res.json(dish);
	}, (err) => next(err))
	.catch((err) => next(err));
})
.put((req, res, next)=> {
	res.statusCode = 403;
	res.end('PUT operation not supported on dishes');	
})
.delete((req, res, next)=> {
	Dishes.remove({})
	.then((resp) => {
		res.statusCode = 200;
		res.setHeader('content-Type', 'application/json');
		res.json(resp);
	}, (err) => next(err))
	.catch((err) => next(err));	
});

//----- with params
dishRouter.route('/:dishId')
.get((req, res, next)=> {
	Dishes.findById(req.params.dishId)
	.then((dish)=> {
		//console.log('Dish found: ', dish);
		res.statusCode = 200;
		res.setHeader('content-Type', 'application/json');
		res.json(dish);
	}, (err) => next(err))
	.catch((err) => next(err));
})
.post((req, res, next)=> {
	res.statusCode = 403;
	res.end('POST operation not supported on dishes: ' +req.params.dishId);
})
.put((req, res, next)=> {
	Dishes.findByIdAndUpdate(req.params.dishId, {
		$set: req.body
	}, {new: true})
	.then((dish)=> {
		//console.log('Dish found: ', dish);
		res.statusCode = 200;
		res.setHeader('content-Type', 'application/json');
		res.json(dish);
	}, (err) => next(err))
	.catch((err) => next(err));
})
.delete((req, res, next)=> {
	Dishes.findByIdAndRemove(req.params.dishId)
	.then((dish)=> {
		//console.log('Dish found: ', dish);
		res.statusCode = 200;
		res.setHeader('content-Type', 'application/json');
		res.json(dish);
	}, (err) => next(err))
	.catch((err) => next(err));
});

module.exports = dishRouter;