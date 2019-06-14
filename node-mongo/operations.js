//db operations all here

//file based and use in application

const assert = require('assert');
exports.insertDocument = (db, document, collection, callback) => {
	//insert 
	//db, doc to insert, to collection, callback
	const coll = db.collection(collection);
	coll.insert(document, (err, result) => {
		assert.equal(err, null);
		console.log("inserted "+ result.result.n + " docs into collection " + collection);
		//tells how many docs inserted
		callback(result); //result is incoming param
	});
};

exports.findDocuments = (db, collection, callback) => {
	const coll = db.collection(collection);
	coll.find({}).toArray((err, docs) =>{
		assert.equal(err, null);
		callback(docs);
	});
};

exports.removeDocument = (db, document, collection, callback) => {
	//delete function
	const coll = db.collection(collection);
	collection.deleteOne(document, (err, result) => {
		assert.equal(err, null);
		console.log("removed ", document);
		callback(result);
	});
};

exports.updateDocument = (db, document, update, collection, callback) => {
	//update doc
	const coll = db.collection(collection);
	coll.updateOne(document, {$set: update}, null, (err, result) => {
		assert.equal(err, null);
		console.log("updated ", update);
		callback(result);
	});
};
