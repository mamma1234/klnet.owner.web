const { Pool } = require('pg');
// const dotenv = require('dotenv');

// dotenv.config();

// const pool = new Pool({connectionString: process.env.POSTGRESQL_URL});
// let pool = "";
// pool.on(`connect`, () => {
//    console.log(`connected to the db`);
// });

//try {
const pool = new Pool({
    connectionString:  "postgresql://dev:dev@172.19.1.22:5432/dev",
    max: 30,
    min: 10
});


console.log("postgresql pool creating...");
//}catch(err){
//    console.error('init error: ' + err.message);
//}
  


module.exports = pool;