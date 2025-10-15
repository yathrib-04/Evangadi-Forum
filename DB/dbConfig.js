const mysql2 = require('mysql2');

const dbconnection = mysql2.createPool({
  host: 'localhost',
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  connectionLimit: 10,
});

console.log(process.env.JWT_SECRET);

// dbconnection.execute("select 'test'", (err, results) => {
//   if (err) {
//     console.error(err.message);
//     return;
//   }
//   console.log( results);
// });



module.exports=dbconnection.promise();