module.exports = {
    allowNull: function(params , key) {
        if(params){ return " ";}
        else{ return " NOT NULL";}
    },
    unique:  function(params, key) {
        if(params){ return " UNIQUE";}
        else{ return " ";}
    },
    primaryKey: function(params, key) {
        if(params){ return ", PRIMARY KEY ("+ key +")";}
        else{ return " ";}
    },
    autoIncrement: function(params, key) {
        if(params){ return " AUTO_INCREMENT";}
        else{ return " ";}
    },
    where:  function(params, tableName) {
        var keys = Object.keys(params);
        var values = Object.values(params);
        var whereSqlQuery = "where ";
        for(var i =0 ; i < keys.length; i ++) {
            if( i+1 != keys.length){
                whereSqlQuery += tableName + "."+keys[i]+"='"+values[i]+"' and ";
            }else {
                whereSqlQuery += tableName + "."+keys[i]+"='"+values[i]+"'";
            }
        }
        return whereSqlQuery;
    },
    include: function(params,tableName) {
        if(params.length == 0){
            return  " * ";
        }
        var includeSqlQuery = " ";
        for(var i =0 ; i < params.length; i ++) {
            if( i+1 != params.length){
                includeSqlQuery += tableName + "."+params[i] +", ";
            }else {
                includeSqlQuery += tableName + "."+params[i] +" ";
            }
        }
        return includeSqlQuery;
    },
    belongsToOne : function (belongsToOne) {
       return ", FOREIGN KEY(" + belongsToOne.thisKey + ")"
                        + " REFERENCES  " + belongsToOne.targetTable +"("+belongsToOne.targetKey+") ";
    },
    fullJoins: function(params) {
        console.log(params.tableNames.length);
        if(params.tableNames.length == 0){
            return  "";
        }
        var fullJoinqlQuery = ", ";
        var includeSqlQuery = " ";
        for(var i =0 ; i < params.tableNames.length; i ++) {
            if( i+1 != params.tableNames.length){
                fullJoinSqlQuery += params.tableNames[i] +",";
            }else {
                fullJoinSqlQuery += params.tableNames[i] +" ";
            }
        }
        if(params.include) {
            for(var i = 0 ; i < params.include.length ; i ++) {
                if(i+1!= params.include.length){
                    includeSqlQuery += params.include[i] + ",";
                }else {
                    includeSqlQuery += params.include[i];
                }
            }
        }else {
            for(var i =0 ; i < params.tableNames.length; i ++) {
                if( i+1 != params.tableNames.length){
                    includeSqlQuery += params.tableNames[i] +".*,";
                }else {
                    includeSqlQuery += params.tableNames[i] +".* ";
                }
            } 
        }
        return {
            fullJoinSqlQuery : fullJoinSqlQuery,
            includeSqlQuery : includeSqlQuery
        };
    }
};