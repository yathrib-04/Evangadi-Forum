const mysql2 = require('mysql2');
require('dotenv').config();

const dbconnection = mysql2.createPool({
  host: 'localhost',
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
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