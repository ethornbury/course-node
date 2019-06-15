/*
*/
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Dishes = require('../models/dishes');
const dishRouter = express.Router();
dishRouter.use(bodyParser.json());

dishRouter.route('/')

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

//----- with params /:dishId
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

//---- with params and comments  /:dishId/comments

dishRouter.route('/:dishId/comments')

.get((req, res, next)=> {
	Dishes.findById(req.params.dishId)
	.then((dish) =>{
		if(dish != null){
			res.statusCode = 200;
			res.setHeader('content-Type', 'application/json');
			res.json(dish.comments);
		}else{
			err = new Error('Dish '+req.params.dishId+' not found')
			err.status = 404;
			return next(err); //goes to error handler in app.js
		}
		
		//put the dishes into the body of the reply message and send to server
	}, (err) => next(err))
	.catch((err) => next(err));
})
.post((req, res, next)=> {
	Dishes.findById(req.params.dishId)
	.then((dish)=> {
		if(dish != null){
			dish.comments.push(req.body);
			dish.save()
			.then((dish) => {
				res.statusCode = 200;
				res.setHeader('content-Type', 'application/json');
				res.json(dish);
			}, (err) => next(err));			
		}else{
			err = new Error('Dish '+req.params.dishId+' not found')
			err.status = 404;
			return next(err); //goes to error handler in app.js
		}
	}, (err) => next(err))
	.catch((err) => next(err));
})
.put((req, res, next)=> {
	res.statusCode = 403;
	res.end('PUT operation not supported on dishes/'+req.params.dishId+'/comments');	
})
.delete((req, res, next)=> {
	Dishes.findById(req.params.dishId)
	.then((dish) => {
		if(dish != null){
			for (var i=(dish.comments.length-1); i>=0; i--){
				dish.comments.id(dish.comments[i]._id).remove();
			}
			dish.save()
			.then((dish) => {
				res.statusCode = 200;
				res.setHeader('content-Type', 'application/json');
				res.json(dish);
			}, (err) => next(err));			
		}else{
			err = new Error('Dish '+req.params.dishId+' not found')
			err.status = 404;
			return next(err); //goes to error handler in app.js
		}
	}, (err) => next(err))
	.catch((err) => next(err));
});

//----- with params and comments and Id   /:dishId/comments/:commentId
dishRouter.route('/:dishId/comments/:commentId')
.get((req, res, next)=> {
	Dishes.findById(req.params.dishId)
	.then((dish) =>{
		if(dish != null && dish.comments.id(req.params.commentId) != null){
			res.statusCode = 200;
			res.setHeader('content-Type', 'application/json');
			res.json(dish.comments.id(req.params.commentId));
		}else if(dish == null){
			err = new Error('Dish '+req.params.dishId+' not found')
			err.status = 404;
			return next(err); //goes to error handler in app.js
		}else{
			err = new Error('Comment '+req.params.comementId+' not found')
			err.status = 404;
			return next(err); //goes to error handler in app.js
		}
	}, (err) => next(err))
	.catch((err) => next(err));
})
.post((req, res, next)=> {
	res.statusCode = 403;
	res.end('POST operation not supported on dishes: ' +req.params.dishId
	+'/comments/'+req.params.commentId);
})

.put((req, res, next)=> {
	Dishes.findById(req.params.dishId)
	.then((dish) =>{
		if(dish != null && dish.comments.id(req.params.id) != null){
			if(req.body.rating){
				dish.comments.id(req.params.id).rating = req.body.rating;
			}
			if(req.body.comment){
				dish.comments.id(req.params.id).comment = req.body.comment;
			}
			dish.save()
			.then((dish) => {
				res.statusCode = 200;
				res.setHeader('content-Type', 'application/json');
				res.json(dish);
			}, (err) => next(err));

		}else if(dish == null){
			err = new Error('Dish '+req.params.dishId+' not found')
			err.status = 404;
			return next(err); //goes to error handler in app.js
		}else{
			err = new Error('Comment '+req.params.commentId+' not found')
			err.status = 404;
			return next(err); //goes to error handler in app.js
		}
	}, (err) => next(err))
	.catch((err) => next(err));
})
.delete((req, res, next)=> {
	Dishes.findById(req.params.dishId)
	.then((dish)=>{
		if(dish != null && dish.comments.id(req.params.commentId) != null){
			dish.comments.id(req.params.commentId).remove();
			dish.save()
			.then((dish) => {
				res.statusCode = 200;
				res.setHeader('content-Type', 'application/json');
				res.json(dish);
			}, (err) => next(err));			
		}else if(dish == null){
			err = new Error('Dish '+req.params.dishId+' not found')
			err.status = 404;
			return next(err); //goes to error handler in app.js
		}else{
			err = new Error('Comment '+req.params.commentId+' not found')
			err.status = 404;
			return next(err); //goes to error handler in app.js
		}
	}, (err) => next(err))
	.catch((err) => next(err));
});


module.exports = dishRouter;