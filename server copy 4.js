const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = process.env.PORT || 5000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const pgsqlPool = require('./pool_postgresql.js');
const oraclePool = require('./pool_oracle.js');

const oracledb = require('oracledb');

const oracleConfig = require('./config_oracle.js');

console.log("oraclePool:" + oraclePool);
console.log("oracledb:" + oracledb);



async function test () {
  let conn;
  try {
    const sql = "SELECT to_char(sysdate, 'yyyymmdd') FROM dual"
    conn = await oracledb.getConnection(oracleConfig);
    const result = await conn.execute(sql);
    console.log("Result is:", result);
  } catch(err){
    console.error(err.message);
  } finally {
    if (conn) {
      await conn.close();
    }

  }
}
test ();


app.get("/api/customers3", (req, res) => {

  // let connection1 = oraclePool.getConnection(function(err,connection){

  // });

  // oraclePool.getConnection(function(err,connection){

  // });
  const sql = "SELECT to_char(sysdate, 'yyyymmdd') FROM dual"
  // let connection;
  try {
    // pool = oraclePool.createPool({
    //   user          : "nplism",
    //   password      : "wjrgkahrfhr_1",  // mypw contains the hr schema password
    //   // connectString : "MKLDB/ORAKLDB"
    //   // connectString : "jdbc:oracle:thisn:@172.21.1.202:7527/ORAKLDB"
    //   connectString : "172.21.1.202:7527/ORAKLDB"
    // });  
    const oraPool = oracledb.getPool('oracle1');
    console.log("oraPool:" + oraPool);


    oraPool.getConnection(function (err, connection) {

      connection.execute(sql, (error, results) => {
        if (error) {
          response.status(400).json({ "error": error.message });
          return;
        }
        res.send(results.rows);
        // response.send("ok");
      });

    });



    // connection = oraclePool.getConnection();
    // connection.execute(`SELECT to_char(sysdate, 'yyyymmdd') FROM dual`);
    //console.log("Result is:", result);



  } catch (err) {
    throw (err);
  } finally {
    // if (connection) {
    //   try {
    //     connection.close(); // Put the connection back in the pool
    //   } catch (err) {
    //     throw (err);
    //   }
    // }
  }

});


// app.get("/api/customers4", (request, response) => {

//     let connection;
//     try {

//       connection = oraclePool.getConnection('orapool');
//       // connection = oraclePool.getConnection();

//       result = connection.execute(`SELECT to_char(sysdate, 'yyyymmdd') FROM dual`);
//       console.log("Result is:", result);
//     } catch (err) {
//       throw (err);
//     } finally {
//       if (connection) {
//         try {
//           connection.close(); // Put the connection back in the pool
//         } catch (err) {
//           throw (err);
//         }
//       }
//     }

// //  console.log(oraclePool);

//   // const sql = "SELECT * FROM customer order by id asc limit 100";
//   // const binds = [1];
//   // const options = {outFormat:oraclePool.OUT_FORMAT_OBJECT};  
  
//   // const result = oraclePool.execute(sql, binds, options);
//   // console.log(result);

//   // oraclePool.execute(sql, (error, results) => {
//   //   if (error) {
//   //     response.status(400).json({ "error": error.message });
//   //     return;
//   //   }
//   //   response.send(results.rows);
//   //   // response.send("ok");
//   // });
// });




// const md5 = require("md5");

// const { Pool } = require('pg');
// const dotenv = require('dotenv');

// dotenv.config();

// const pool = new Pool({
//   connectionString: process.env.POSTGRESQL_URL
// })

// pool.on(`connect`, () => {
//   console.log(`connected to the db`);
// });



/*
const oracledb = require('oracledb');
const config = {
  user: "nplism",
  password: "wjrgkahrfhr_1",
  connectString: "(DESCRIPTION =(LOAD_BALANCE=OFF)(FAILOVER=ON)(ADDRESS_LIST = (ADDRESS = (PROTOCOL= TCP)(HOST= 172.21.1.202)(PORT=7527))(ADDRESS=(PROTOCOL=TCP)(HOST=172.21.1.201)(PORT= 7527)))(CONNECT_DATA =(SERVICE_NAME = ORAKLDB)(SERVER= DEDICATED)))",
  poolMax: 44,
  poolMin: 2,
  poolIncrement: 5,
  pollTimeout: 4
}

oracledb.getConnection(config, (err,conn) => {
  todoWork(err, conn);
});

function todoWork(err, conn) {
  if(err) {
    console.error(err.message);
    return;
  }
  connection.execute("select * from kmcs.kmcs_shipper_send where klnet_id ='ASUGC010'", [], function (err, result) {
    if(err) {
      console.error(err, message);
      doRelease(connection);
      return;
    }
    console.log(result.metaData);
    console.log(result.rows);
    doRelease(connection);
  });
}

function doRelease(connection){
  connection.release(function (err) {
    if (err) {
      console.error(err.message);
    }
  });
}
*/


app.get("/api/customers", (request, response) => {

  const sql = "SELECT * FROM customer order by id asc limit 100"
  pgsqlPool.query(sql, (error, results) => {
    if (error) {
      response.status(400).json({ "error": error.message });
      return;
    }
    response.send(results.rows);
    // response.send("ok");
  });
});




app.get("/api/customers1", (req, res) => {

  pgsqlPool.query("SELECT * FROM customer order by id asc limit 100", function(err,result){
    if(err){
      console.log(err);
      res.status(400).send(err);
    }
    res.status(200).send(result.rows);
  });


}); 



app.get("/api/customers2", (req, res) => {
  const sql = "SELECT * FROM customer order by id asc limit 100"
  pgsqlPool.connect(function(err,client,done) {
    if(err){
      console.log("err" + err);
      res.status(400).send(err);
    }
    client.query(sql, function(err,result){
      done();
      if(err){
        console.log(err);
        res.status(400).send(err);
      }
      res.status(200).send(result.rows);
    });

  });

});


app.listen(port, () => console.log(`Listening on port ${port}`));
// module.exports = db
