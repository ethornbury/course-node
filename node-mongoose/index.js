const mongoose = require('mongoose');
const Dishes = require('./models/dishes');

const url = 'mongodb://localhost:27017/conFusion';
const connect = mongoose.connect(url);
connect.then((db) => {
	console.log("connected to mongodb server");
	Dishes.create({ 
		//creates and adds to db collection
		name: 'pizza3', 
		description: 'test3'
	})
	/*
	.then((dish) =>{
		console.log(dish);
		return Dishes.find({}).exec(); //exec will ensure it is executed
	})
	*/
	.then((dish)=>{
		console.log(dish);
		return Dishes.findByIdAndUpdate(dish._id, {
			$set: {description: 'updated test'}
		},{
			new: true
		}).exec();
	})
	.then((dish) =>{
		console.log(dish);
		dish.comments.push({
			rating: 5,
			comment: 'I\'m getting a bad feeling',
			author: 'J Doe'
		});
		return dish.save();
	}).
	then((dish)=>{
		console.log(dish);
		return Dishes.deleteMany({});
	})
	/*
	.then((dishes)=>{
		console.log(dishes);
		return Dishes.deleteMany({}); //deleteOne, deleteMany, bulkWrite
	})
	*/
	.then(()=>{
		return mongoose.connection.close();
	})
	.catch((err)=>{
		console.log(err);
	})	
});