##node-mongo

check out this [link](https://github.com/mongodb/node-mongodb-native) 

```
$ mkdir node-mongo
$ cd node-mongo
$ npm init
$ npm install mongodb --save
```

---mongoDB
default port 27017
https://www.mongodb.com/download-center/community
https://docs.mongodb.com/manual/tutorial/install-mongodb-on-windows/
https://docs.mongodb.com/manual/mongo/

Navigate to mongodb folder
```
$ cd C:\Program Files\MongoDB\Server\4.0\bin	
$   mongod --dbpath=data --bind_ip 127.0.0.1
```

To start server
```
$ cd C:\Program Files\MongoDB\Server\4.0\bin	
$ mongod
```

To get to the mongo REPL
```
$ C:\Program Files\MongoDB\Server\4.0\bin\
$ mongo
 
$ use conFusion 	//create DB if not there or use if there
$ db   //check db name
$ db.help();
$ db.dishes		create or use a collection called 
$ db.dishes.insert({"name": "pizza", "description": "Test"});
$ db.dishes.find();
$ db.dishes.find().pretty();
$ var id = new ObjectId();
$ id.getTimestamp();		//returns ISO date from _id
$ exit 	//to exit the REPL
```

Gitignore file: https://stackoverflow.com/questions/10744305/how-to-create-gitignore-file

To turn mongodb on, in a terminal navigate to 
```
C:\Program Files\MongoDB\Server\4.0\bin>
```


