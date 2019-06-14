const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const dboper = require('./operations');

const url = 'mongodb://localhost:27017/';
const dbname = 'conFusion';

MongoClient.connect(url, (err, client) => {
	assert.equal(err, null); //use assert to check not null
	console.log('connected to server');
	const db = client.db(dbname);
	/*
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
	*/
	dboper.insertDocument(db, {name: "Vadonut", description: "test"}, 'dishes', (result) => {		
		console.log('insert doc:\n', result.ops);
		dboper.findDocuments(db, 'dishes', (docs) => {
			console.log('found docs:\n ', docs);
			dboper.updateDocument(db, {name: "Vadonut"}, {description: 'Updated test'}, 'dishes', (result)=> {
				console.log('updated docs:\n ', result.result);
				dboper.findDocuments(db, 'dishes', (docs) => {
					console.log('updated docs:\n ', result.result);
					db.dropCollection('dishes', (result)=>{
						console.log('dropped collection docs: ', result);
						client.close();
					});
				});
			});
		});
	});
});


