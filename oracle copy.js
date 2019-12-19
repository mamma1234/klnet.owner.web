const oracledb = require('oracledb');
// const { Pool } =  require('oracledb');

// const dotenv = require('dotenv');

// dotenv.config();

// const uri = `(DESCRIPTION=(ADDRESS=(PROTOCOL=TCP)(HOST=172.21.1.202)(PORT=7527))(CONNECT_DATA=(SERVICE_NAME=ORAKLDB)))`
//const uri = `(DESCRIPTION =(LOAD_BALANCE=OFF)(FAILOVER=ON)(ADDRESS_LIST = (ADDRESS = (PROTOCOL= TCP)(HOST= 172.21.1.202)(PORT=7527))(ADDRESS=(PROTOCOL=TCP)(HOST=172.21.1.201)(PORT= 7527)))(CONNECT_DATA =(SERVICE_NAME = ORAKLDB)(SERVER= DEDICATED)))`
const uri = `MKLDB/ORAKLDB`
/*
const pool = new Pool({
   user: "nplism",
   password: "wjrgkahrfhr_1",
   connectString: uri,
   poolAlias: 'orapool'
   //poolMax: 44,
   //poolMin: 2,
   //poolIncrement: 5,
   //pollTimeout: 4
});
*/
/*
oracledb.createPool({
   user: "nplism",
   password: "wjrgkahrfhr_1",
   connectString: uri,
   poolAlias: 'orapool'
   //poolMax: 44,
   //poolMin: 2,
   //poolIncrement: 5,
   //pollTimeout: 4
});
*/
//console.log(`Connection oracle pool started`);


async function init(){
   try{
      await oracledb.createPool({
         user: "nplism",
         password: "wjrgkahrfhr_1",
         connectString: uri,
         poolAlias: 'orapool'
         //poolMax: 44,
         //poolMin: 2,
         //poolIncrement: 5,
         //pollTimeout: 4
      });
      console.log(`Connection oracle pool started`);
     // await dostuff();
   
   //   const orapool = oracledb.getPool('orapool');

   //   const sql = "select sysdate form dual"
   //   orapool.query(sql, (error, results) => {
   //    console.log(results);

   //    //  if (error) {
   //    //    response.status(400).json({ "error": error.message });
   //    //    return;
   //    //  }
   //    //  response.send(results.rows);
   //     // response.send("ok");
   //   });

   }catch(err){
      console.error('init() error' + err.message);
   }finally{
     // await closePoolAndExit();
   }
// oracledb.createPool({
//       user: "nplism",
//       password: "wjrgkahrfhr_1",
//       connectString: uri,
//       poolMax: 44,
//       poolMin: 2,
//       poolIncrement: 5,
//       pollTimeout: 4
// });
}

/*

async function dostuff(){
   let connection;
   try{
      connection = await oracledb.getConnection();
      const sql = `SELECT sysdate FROM dual WHERE :b = 1`;
      const binds = [1];
      const options = {outFormat:oracledb.OUT_FORMAT_OBJECT};
      const result = await connection.execute(sql, binds, options);
      console.log(result);
   } catch(err) {
      console.error(err);
   } finally {
      if(connection) {
         try{
            await connection.close();
         } catch (err) {
            console.error(err);
         }
      }
   }
}


async function closePoolAndExit() {
   console.log(`\nTermination`);
   try{
      await oracledb.getPool().close(10);
      console.log(`Pool closed`);
      process.exit(0);
   } catch(err) {
      console.error(err.message);
      process.exit(1);
   }
}


process
   .once(`SIGTERM`, closePoolAndExit)
   .once(`SIGINT`, closePoolAndExit);

init();
*/

init();

//const orapool = pool.getPool('orapool');
// const pool = new Pool({connectionString: process.env.POSTGRESQL_URL});
// const pool = new Pool({connectionString: uri});
// pool.on(`connect`, () => {
//    console.log(`connected to the db`);
// });

//module.exports = oracledb;

//module.exports = orapool;