const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const dboper = require('./operations');

const url = 'mongodb://localhost:27017/';
const dbname = 'conFusion';

MongoClient.connect(url).then((client) => {
	// assert.equal(err, null); //use assert to check not null
	console.log('connected to server');
	const db = client.db(dbname);
	/* old code part 1
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
	
	dboper.insertDocument(db, {name: "Vadonut", description: "test"}, 'dishes')
	.then((result) => {		
		console.log('insert doc:\n', result.ops);
		return dboper.findDocuments(db, 'dishes')
	})
	.then((docs) => {
		console.log('found docs:\n ', docs);
		return dboper.updateDocument(db, {name: "Vadonut"}, {description: 'Updated test'}, 'dishes');
	})
	.then((result)=> {
		console.log('updated docs:\n ', result.result);
		return dboper.findDocuments(db, 'dishes');
	})
	.then((docs) => {
		console.log('updated docs:\n ', docs);
		return db.dropCollection('dishes')
	})
	.then((result)=>{
		console.log('dropped collection: ', result);
		return client.close();
	})
	.catch((err)=> console.log(err));	
})
.catch((err)=> console.log(err));


