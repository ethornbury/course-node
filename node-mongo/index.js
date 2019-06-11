const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const url = 'mongodb://localhost:27017/';
const dbname = 'conFusion';

MongoClient.connect(url, (err, client) => {
	assert.equal(err, null); //use assert to check not null
	console.log('connected to server');
	const db = client.db(dbname);
	const collection = db.collection('dishes');
	collection.insertOne({"name": "pizza2", "description": "test2"}, (err, result) =>{
		assert.equal(err, null);
		console.log('after insert\n');
		console.log(result.ops);  //how many operations carried out successfully
		collection.find({}).toArray((err, docs) =>{  //filter or none in {}
			assert.equal(err, null);
			console.log('found: \n');
			console.log(docs); //return all docs
			
			db.dropCollection('dishes', (err, result) => {
				assert.equal(err, null);
				client.close(); //close db connection
			});
		});
	});
});