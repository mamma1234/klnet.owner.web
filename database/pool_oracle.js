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

async function init() {
  try {
      await oracledb.createPool({
          user          : "nplism",
          password      : "wjrgkahrfhr_1",
          // connectString : "172.21.1.202:7527/ORAKLDB",
          connectString : "172.19.1.103:7527/ORAKLDB",
          poolMax: 30,
          poolMin: 10,
          poolIncrement: 5,
          poolTimeout: 4
      });
      console.log('connection pool started');
      await dostuff();
      // pool = oracledb.getPool();
  } catch (err) {
      console.error(err.message);
  } finally {
      // await closePoolAndExit();
  }
}

async function dostuff(){
  let connection;
  try{
      connection = await oracledb.getConnection();
      // console.log(connection);
      const sql = 'SELECT sysdate FROM dual WHERE :1 = 1';
      const binds = [1];
      const options = {outFormat:oracledb.OUT_FORMAT_OBJECT};
      const result = await connection.execute(sql, binds, options);
      // console.log(connection);
      // pool = await oracledb.getConnection();
      console.log(result);
  } catch(err) {
      console.error(err);
  } finally {
      console.log(connection)
      if (connection) {
          try {
              await connection.close();
          } catch(err) {
              console.error(err);
          }
      }
  }
}

async function closePoolAndExit() {
  console.log('termination');
  try {
      await oracledb.getPool().close(10);
      console.log('Pool closed');
      process.exit(0);

      
  } catch (err) {
      console.error(err);
      process.exit(1);
  }
}

// process.once('SIGTERM', closePoolAndExit).once('SIGINT', closePoolAndExit);

init();

/*
let pool;
async function init() {
  try {
    pool = await oracledb.createPool({
      user          : "nplism",
      password      : "wjrgkahrfhr_1",
      // connectString : "172.21.1.202:7527/ORAKLDB",
      connectString : "172.19.1.103:7527/ORAKLDB",
      poolAlias:'oracle1',
      poolMax: 30,
      poolMin: 10,
      poolIncrement: 5,
      poolTimeout: 4
    });
  } catch (err) {
    console.error(err.message);
  } finally {
    await pool.close();
  }
}
init();
*/


// const pool2 =  oracledb.getPool('orapool');
// const connection = pool2.getConnection();
// const pool = "";
// try {
/*
const pool = oracledb.createPool({
  user          : "nplism",
  password      : "wjrgkahrfhr_1",  // mypw contains the hr schema password
  // connectString : "172.21.1.202:7527/ORAKLDB",
  connectString : "172.19.1.103:7527/ORAKLDB",
  poolAlias:'oracle1',
  poolMax: 30,
  poolMin: 10,
  poolIncrement: 5,
  poolTimeout: 4
});
*/
// }catch(err){
//   console.error('init error: ' + err.message);
// }

// const oraPool = oracledb.getPool();

console.log("oracle pool creating...");

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

// module.exports = pool;