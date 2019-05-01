#### Install

```sh
$ npm install mongsql --save
```


#### Create Connection

   ```javascript
const mongsql = require('mongsql');
 var connection = new mongsql({
	host: "localhost",
	username: "username",
	password: "password",
	database: "databaseName"
});

connection.connect().then(result => {
	console.log(result);
}).catch(err => {
	console.log(err);
});
   ```
#### Define Model

   ```javascript
var model = {
	tableName: "TableName",
	defination : [{
		id : "INT",
		autoIncrement: true,
		primaryKey: true
	},{
		username: "VARCHAR(100)",
		unique: true
	},{
		email : "VARCHAR(100)",
		allowNull : true
	},{
		password: "VARCHAR(100)",
		allowNull: false
	}]
};
   ```
   ####Sync Tables with Database
   ```javascript
connection.sync(model).then(result =>{
	console.log(result);
}).catch(err => {
	console.log(err);
});
   
   ```
##### Foreign Key ( Only One)
	 
 ```javascript
{
	tableName: "books",
	defination : [{
		id : "INT",
		autoIncrement: true,
		primaryKey: true
	},{
		bookname: "VARCHAR(100)",
		unique: true
	},{
		person_id : "INT",
		allowNull : false
	},{
		description: "VARCHAR(100)",
		allowNull: false
	}],
	belongsToOne : {
		thisKey : "person_id",
		targetKey : "id", 
		targetTable : "person"
	}
}
 ```
	 
	 
#### Quering 
1. Insert into table
```sh
 insert(tableName , params)
```

```javascript
var params = {
	username: "nkkumawat",
	email: "nk0kumawat@gmail.com",
	password : "password"
};
var tableName = "TableName";

connection.insert(tableName , params).then(result => {
	console.log(result);
}).catch(err => {
	console.log(err);
});
```
2. find one result 
```sh
 findOne(tableName , params)
```

```javascript
var tableName = "TableName";
var params = {
	where :{
		id: "1"
	},
	include : ['id' , 'password']
};

connection.findOne(tableName,params).then(result => {
	console.log(result);
}).catch(err => {
	console.log(err);
});

```
2. find All result 
```sh
 findAll(tableName , params)
```

```javascript
var tableName = "TableName";
var params = {
	where :{
		id: "1"
	},
	include : ['id' , 'password']
};

connection.findAll(tableName,params).then(result => {
	console.log(result);
}).catch(err => {
	console.log(err);
});

```
2. Join (Full Join)
```sh
 add fullJoins in the query parameters.
 
 fullJoins : {
		tableNames : ['books'],
		include: ['books.id' , 'books.bookname']
 } 
  
```

```javascript
var tableName = "TableName";
var params = {
	where :{
		id: 'books.id'
	},
	include : ['id' , 'password'],
	fullJoins : {
		tableNames : ['books'],
		include: ['books.id' , 'books.bookname']
	}
};
connection.findAll(tableName,params).then(result => {
	console.log(result);
}).catch(err => {
	console.log(err);
});

```
#### Contribute
still under contruction......... 
