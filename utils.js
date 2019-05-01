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
    where:  function(params) {
        var keys = Object.keys(params);
        var values = Object.values(params);
        var whereSqlQuery = "where ";
        for(var i =0 ; i < keys.length; i ++) {
            if( i+1 != keys.length){
                whereSqlQuery += keys[i]+"='"+values[i]+"' and ";
            }else {
                whereSqlQuery += keys[i]+"='"+values[i]+"'";
            }
        }
        return whereSqlQuery;
    },
    include: function(params) {
        if(params.length == 0){
            return  " * ";
        }
        var includeSqlQuery = " ";
        for(var i =0 ; i < params.length; i ++) {
            if( i+1 != params.length){
                includeSqlQuery += params[i] +", ";
            }else {
                includeSqlQuery += params[i] +" ";
            }
        }
        return includeSqlQuery;
    },
};