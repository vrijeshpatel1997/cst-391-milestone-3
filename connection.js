const mysql = require('mysql2');

var mysqlConnection = mysql.createConnection({

    host: 'localhost',
    user:'root',
    password:'root',
    database: 'employeedb'
})

var connection  = mysqlConnection.connect((err)=> {
    if(err){
        console.log('error in connecting with Database' + JSON.stringify(err, undefined,2));
    }else{
        console.log('Database Connected succesfully ' );
    }
})

module.exports=mysqlConnection