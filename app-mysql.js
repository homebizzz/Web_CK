var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  port: 3306,
  user     : 'root',
  password : 'thuyan123',
  database : 'dataWeb'
});
 

connection.connect();

/*connection.query('SELECT 1 + 1 AS solution', (error, results, fields) => {
    if (error) throw error;
    console.log('The solution is: ', results[0].solution);
    connection.end();
});*/
 

// connection.query('SELECT * from Test', (error, results, fields) => {
//     if (error) throw error;
//     console.log(results);
//     connection.end();
// });

var test = {id: 7, ten:'G'};

connection.query('insert into Test set ?', test, (error, results, fields) => {
    if (error) throw error;
    console.log(results);
    connection.end();
});

console.log('after');
