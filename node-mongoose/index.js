const mongoose = require('mongoose');
const Dishes = require('./models/dishes');

const url = 'mongodb://localhost:27017/conFusion';
const connect = mongoose.connect(url);
connect.then((db) => {
	console.log("connected to mongodb server");
	var newDish = Dishes({
		name: 'pizza', 
		description: 'test'
	});
	newDish.save()
	.then((dish) =>{
		console.log(dish);
		return Dishes.find({}).exec(); //exec will ensure it is executed
	})
	.then((dishes)=>{
		console.log(dishes);
		return Dishes.deleteMany({}); //deleteOne, deleteMany, bulkWrite
	})
	.then(()=>{
		return mongoose.connection.close();
	})
	.catch((err)=>{
		console.log(err);
	})	
});