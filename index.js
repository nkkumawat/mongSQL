var mysql = require('mysql');
var utils = require('./utils');
class mongsql {
    constructor(params) {
        this.connection = mysql.createConnection({
            host     : params.host,
            user     : params.username,
            password : params.password,
            database : params.database
        });
    }
    connect(){
        return new Promise((resolve , reject) => {
            if(this.connection){            
                this.connection.connect( err => {
                    if(err){
                        reject(err);
                    }else {
                        resolve(true);
                    }
                })  
            }else {
                reject("err");
            }  
        })  
    }
    log(params){
        console.log(params);
    }
    sync(model) {
        return new Promise( (resolve , reject) => {
            var sqlQuery = "CREATE Table IF NOT EXISTS " + model.tableName + " ( " ;
            for(var i = 0 ;i < model.defination.length; i ++) {
                var keys = Object.keys(model.defination[i]);
                for(var j = 0 ; j < keys.length ; j ++){
                    if(j == 0){ 
                        sqlQuery += " "+ keys[0] + " " + model.defination[i][keys[0]];
                    } else{
                        sqlQuery += utils[keys[j]](model.defination[i][keys[i]] , keys[0]);
                    }
                } 
                if(i + 1 != model.defination.length) {
                    sqlQuery += " , ";          
                }
            }
            if(model.belongsToOne) {
                sqlQuery +=  utils.belongsToOne(model.belongsToOne);
            }
            sqlQuery += " ) ;"
            this.log("Executing : ---- " +sqlQuery);
            this.connection.query(sqlQuery, function (err, results, fields) {
                if (err){
                    reject(err.sqlMessage);
                }else{
                    resolve(results)
                }
            });
        })
    }
    insert(tableName , params ){
        return new Promise((resolve , reject) => {
            var keys = Object.keys(params);
            var values = Object.values(params);
            var sqlQuery = "INSERT into " + tableName ;
            var columnsSqlQuery = " ( ";
            for(var i = 0 ; i < keys.length; i ++) {
                if(i+1 != keys.length){
                    columnsSqlQuery += keys[i] +", "
                }else {
                    columnsSqlQuery += keys[i];
                }
            }
            columnsSqlQuery += ") ";
            var valuesSqlQuery = " VALUES( ";
            for(var i = 0 ; i < values.length; i ++) {
                if(i+1 != values.length){
                    valuesSqlQuery += " '"+values[i] +"' ,"
                }else {
                    valuesSqlQuery += " '"+values[i] +"'";
                }
            }
            valuesSqlQuery += " );"
            sqlQuery += columnsSqlQuery + valuesSqlQuery;
            this.log("Executing ----- " +sqlQuery);
            this.connection.query(sqlQuery, function (err, results, fields) {
                if (err){
                    reject(err.sqlMessage);
                }else{
                    resolve(results)
                }
            });
        });
    }

    findOne(tableName, params) {
        return new Promise((resolve , reject) => {
            var keys = Object.keys(params);
            var values = Object.values(params);
            var sqlQuery = "Select" ;
            var includeString = " * ";
            var whereString = " ";
            var joinsString = " "
            if("where" in params){
                whereString = utils['where'](params.where, tableName);
            }
            if('include' in params) {
                includeString  = utils['include'](params.include, tableName);
            }
            if('fullJoins' in params) {
                var fullJoinString = utils['fullJoins'](params.fullJoins);
                joinsString = " " + fullJoinString.fullJoinSqlQuery;
                includeString += ", " + fullJoinString.includeSqlQuery;
            }
            
            sqlQuery += includeString + " from " + tableName + " "+ joinsString + " " + whereString +" LIMIT 1;";
            console.log(sqlQuery);
            this.log("Executing ----- " +sqlQuery);
            this.connection.query(sqlQuery, function (err, results, fields) {
                if (err){
                    reject(err.sqlMessage);
                }else{
                    resolve(results)
                }
            });
        });
    }

    findAll(tableName, params) {
        return new Promise((resolve , reject) => {
            var keys = Object.keys(params);
            var values = Object.values(params);
            var sqlQuery = "Select" ;
            var includeString = " * ";
            var whereString = " ";
            var joinsString = " "
            if("where" in params){
                whereString = utils['where'](params.where, tableName);
            }
            if('include' in params) {
                includeString  = utils['include'](params.include, tableName);
            }
            if('fullJoins' in params) {
                var fullJoinString = utils['fullJoins'](params.fullJoins);
                joinsString = " " + fullJoinString.fullJoinSqlQuery;
                includeString += ", " + fullJoinString.includeSqlQuery;
            }
            
            sqlQuery += includeString + " from " + tableName + " "+ joinsString + " " + whereString +";";
            console.log(sqlQuery);
            this.log("Executing ----- " +sqlQuery);
            this.connection.query(sqlQuery, function (err, results, fields) {
                if (err){
                    reject(err.sqlMessage);
                }else{
                    resolve(results)
                }
            });
        });
    }
    
}

module.exports = mongsql;