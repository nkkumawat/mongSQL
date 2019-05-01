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
		password: "password"
	},
	include : ['id' , 'password']
};

connection.findOne(tableName,params).then(result => {
	console.log(result);
}).catch(err => {
	console.log(err);
})

```
2. find one result 
```sh
 findAll(tableName , params)
```

```javascript
var tableName = "TableName";
var params = {
	where :{
		password: "password"
	},
	include : ['id' , 'password']
};

connection.findAll(tableName,params).then(result => {
	console.log(result);
}).catch(err => {
	console.log(err);
})

```
#### Contribute
still under contruction......... 
