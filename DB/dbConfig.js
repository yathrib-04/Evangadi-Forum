const mysql2 = require('mysql2');

const dbconnection = mysql2.createPool({
  host: 'localhost',
  user: 'evangadi-admin',
  password: '12345678',
  database: 'evangadi-db',
  connectionLimit: 10,
});

// dbconnection.execute("select 'test'", (err, results) => {
//   if (err) {
//     console.error(err.message);
//     return;
//   }
//   console.log( results);
// });



module.exports=dbconnection.promise();