// const { Pool } = require('oracledb');

// const pool = new Pool({  
//   user          : "nplism",
//   password      : "wjrgkahrfhr_1",  // mypw contains the hr schema password
// // connectString : "MKLDB/ORAKLDB"
// // connectString : "jdbc:oracle:thisn:@172.21.1.202:7527/ORAKLDB"
//   connectString : "172.21.1.202:7527/ORAKLDB",
//   poolAlias: 'orapool'
// });

const oracledb = require('oracledb');
// let pool;
// async function init() {
//   try {
//     pool = await oracledb.createPool({
//       user          : "nplism",
//       password      : "wjrgkahrfhr_1",  // mypw contains the hr schema password
//       // connectString : "MKLDB/ORAKLDB"
//       // connectString : "jdbc:oracle:thisn:@172.21.1.202:7527/ORAKLDB"
//       connectString : "172.21.1.202:7527/ORAKLDB",
//       poolAlias:'orapool'
//     });
//   } catch (err) {
//     console.error(err.message);
//   } finally {
//     await pool.close();
//   }
// }

// init();


// const pool2 =  oracledb.getPool('orapool');
// const connection = pool2.getConnection();
// const pool = "";
// try {

const pool = oracledb.createPool({
  user          : "nplism",
  password      : "wjrgkahrfhr_1",  // mypw contains the hr schema password
  // connectString : "MKLDB/ORAKLDB"
  // connectString : "jdbc:oracle:thisn:@172.21.1.202:7527/ORAKLDB"
  connectString : "172.21.1.202:7527/ORAKLDB",
  poolAlias:'oracle1'
});
   
// }catch(err){
//   console.error('init error: ' + err.message);
// }




/*
async function run() {
  let pool;

  try {
    pool = await oracledb.createPool({
      user          : "nplism",
      password      : "wjrgkahrfhr_1",  // mypw contains the hr schema password
      // connectString : "MKLDB/ORAKLDB"
      // connectString : "jdbc:oracle:thisn:@172.21.1.202:7527/ORAKLDB"
      connectString : "172.21.1.202:7527/ORAKLDB"
    });

   //  const uri = `postgresql://dev:dev@172.19.1.22:5432/dev`

    let connection;
    try {
      connection = await pool.getConnection();
      result = await connection.execute(`SELECT to_char(sysdate, 'yyyymmdd') FROM dual`);
      console.log("Result is:", result);
    } catch (err) {
      throw (err);
    } finally {
      if (connection) {
        try {
          await connection.close(); // Put the connection back in the pool
        } catch (err) {
          throw (err);
        }
      }
    }
  } catch (err) {
    console.error(err.message);
  } finally {
    await pool.close();
  }
}

run();
*/

module.exports = pool;