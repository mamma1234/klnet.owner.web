const oracledb = require('oracledb');


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