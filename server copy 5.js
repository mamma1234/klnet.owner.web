const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = process.env.PORT || 5000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const database = require('./database');

// const pgsqlPool = require('./pool_postgresql.js');
// const oraclePool = require('./pool_oracle.js');

// const oracledb = require('oracledb');
// const pgsqldb = require('pg');

// const oracleConfig = require('./config_oracle.js');
// const pgsqlConfig = require('./config_postgresql.js');

// console.log("oraclePool:" + oraclePool);
// console.log("oracledb:" + oracledb);


async function test () {
  let conn;
  try {
    const sql = "SELECT to_char(sysdate, 'yyyymmdd') as yyyymmdd, 'test' as title FROM dual"
    //const sql = "SELECT * FROM cms_imp_mrn where rownum < 3"
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


async function test1 () {
  let client;
  try {
    const sql = "SELECT * FROM customer order by id asc limit 100"
    client = new pgsqldb.Client(pgsqlConfig);
    client.connect();
    client.query(sql).then(res => {
      console.log("Result is:", res.rows);
      // console.log("Result is:", res);
    });
    //console.log("Result is:", result);
  } catch(err){
    console.error(err.message);
  } finally {
    //client.close();
    // client.end();
  }
}
test1 ();



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

app.get("/api/customers", (req, res) => {

  pgsqlPool.query("SELECT * FROM customer order by id asc limit 100", function(err,result){
    if(err){
      console.log(err);
      res.status(400).send(err);
    }
    res.status(200).send(result.rows);
  });


}); 

app.get("/api/schedule", (request, response) => {

  const sql = "SELECT line_code, vessel_name, voyage_no, line_portcd, route_code FROM tcs_vsl_sch order by voyage_sid asc limit 100";

  pgsqlPool.query(sql, (error, results) => {
    if (error) {
      response.status(400).json({ "error": error.message });
      return;
    }
    response.send(results.rows);
    // response.send("ok");
  });
});


app.get("/api/carrier", (request, response) => {
  const sql = "SELECT * FROM TCS_CARRIER_SERVICE_ETRANS"
  pgsqlPool.query(sql, (error, results) => {
    if (error) {
      response.status(400).json({ "error": error.message });
      return;
    }
    response.send(results.rows);
    // response.send("ok");
  });
});

app.get("/api/port", (request, response) => {
  let sql = "";
  const portCode=request.query.portCode;
console.log("<<<:"+portCode);
  if (portCode != "undefined") {
    sql = "SELECT * FROM CODE_PORT where port_code like '"+portCode+"%' ORDER BY PORT_CODE";
  }

  console.log ("SQL:"+sql);
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



app.get("/api/vesselroute", (req, res) => {
  const sql = "SELECT route_date,route_code, '0' as tt FROM own_vsl_sch_route_list where line_code='PIL' and vsl_name='HYUNDAI COURAGE' and voyage='903W' order by route_date limit 5 "
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

app.use(express.static(__dirname+'/klnet.owner.web/material-react-mobx/src'));



app.get("/api/exportDemDetBkg", (request, response) => {
  const bkgNo = request.query.bkgNo
  const sql = "SELECT shipper_id, bkg_no, ship_req_date FROM MFEDI.CJ_BKG_LST WHERE BKG_NO = '"+bkgNo+"' and ship_req_date_flag = 'E'"

  try {
    const oraPool = oracledb.getPool('oracle1');
    
    oraPool.getConnection(function (err, connection) {

      connection.execute(sql, (error, results) => {
        if (error) {
          response.status(400).json({ "error": error.message });
          return;
        }
        // response.send(results);
        response.send(results.rows);
      });

    });
  } catch (err) {
    throw (err);
  } finally {

  }

});


app.get("/api/exportDemDet", (request, response) => {
  response.send([
    {
      "rownum": 1,
      "shipper_code": 'LGE',
      "ca_code": 'COSU',
      "bkg_no": '6224557860',
      "actual_gubun": 'ACTUAL',
      "ship_req_date": '2019-12-02'
    },
    {
      "rownum": 2,
      "shipper_code": 'LGE',
      "ca_code": 'MAEU',
      "bkg_no": 'D71090511',
      "actual_gubun": 'DUMMY',
      "ship_req_date": '2020-11-14'
    },
    {
      "rownum": 3,
      "shipper_code": 'LGE',
      "ca_code": 'ONEY',
      "bkg_no": 'SELV53286300',
      "actual_gubun": 'DUMMY',
      "ship_req_date": '2020-11-19'
    }
  ]);
});



app.get("/api/exportDemDetCntr", (request, response) => {
  response.send([
    {
      "rownum": 1,
      "shipper_code": 'LGE',
      "line_code": 'HLCU',
      "bkg_no": '45862728',
      "cntr_no": 'TEMU1863737',
      "de_mt_yn": 'Y',
      "de_mt_in_out_time": '2019-11-21 오후 8:03:00',
      "de_mt_terminal": 'PNCOC',
      "de_yn": 'N',
      "de_in_out_time": '',
      "de_terminal": '',
      "ar_yn": 'N',
      "ar_in_out_time": '',
      "ar_terminal": ''
    },
    {
      "rownum": 2,
      "shipper_code": 'LGE',
      "line_code": 'HLCU',
      "bkg_no": '45862728',
      "cntr_no": 'HAMU1255891',
      "de_mt_yn": 'Y',
      "de_mt_in_out_time": '2019-11-26 오후 5:49:00',
      "de_mt_terminal": 'PNCOC',
      "de_yn": 'N',
      "de_in_out_time": '',
      "de_terminal": '',
      "ar_yn": 'N',
      "ar_in_out_time": '',
      "ar_terminal": ''
    },
    {
      "rownum": 3,
      "shipper_code": 'LGE',
      "line_code": 'HLCU',
      "bkg_no": '45862728',
      "cntr_no": 'HLXU1140837',
      "de_mt_yn": 'Y',
      "de_mt_in_out_time": '2019-11-22 오후 8:49:00',
      "de_mt_terminal": 'PNCOC',
      "de_yn": 'N',
      "de_in_out_time": '',
      "de_terminal": '',
      "ar_yn": 'N',
      "ar_in_out_time": '',
      "ar_terminal": ''
    },
    {
      "rownum": 4,
      "shipper_code": 'LGE',
      "line_code": 'HLCU',
      "bkg_no": '45862728',
      "cntr_no": 'BEAU4196769',
      "de_mt_yn": 'Y',
      "de_mt_in_out_time": '2019-11-26 오후 4:06:00',
      "de_mt_terminal": 'PNCOC',
      "de_yn": 'N',
      "de_in_out_time": '',
      "de_terminal": '',
      "ar_yn": 'N',
      "ar_in_out_time": '',
      "ar_terminal": ''
    },
    {
      "rownum": 5,
      "shipper_code": 'LGE',
      "line_code": 'HLCU',
      "bkg_no": '45862728',
      "cntr_no": 'HAMU1255891',
      "de_mt_yn": 'N',
      "de_mt_in_out_time": '',
      "de_mt_terminal": '',
      "de_yn": 'Y',
      "de_in_out_time": '2019-11-27 오후 5:23:00',
      "de_terminal": 'PNITC',
      "ar_yn": 'Y',
      "ar_in_out_time": '2019-12-02 오후 12:55:00',
      "ar_terminal": 'PNITC'
    },
    {
      "rownum": 6,
      "shipper_code": 'LGE',
      "line_code": 'HLCU',
      "bkg_no": '45862728',
      "cntr_no": 'BEAU4196769',
      "de_mt_yn": 'N',
      "de_mt_in_out_time": '',
      "de_mt_terminal": '',
      "de_yn": 'Y',
      "de_in_out_time": '2019-11-27 오후 5:03:00',
      "de_terminal": 'PNITC',
      "ar_yn": 'Y',
      "ar_in_out_time": '2019-12-02 오후 12:56:00',
      "ar_terminal": 'PNITC'
    }
  ]);
});

app.get("/api/carrier2", (request, response) => {
  const carrierName=request.query.carrierName;
  const sql = "SELECT * FROM TCS_CARRIER_SERVICE_ETRANS WHERE carrier_hname LIKE UPPER('%"+carrierName+"%')"
  pgsqlPool.query(sql, (error, results) => {
    if (error) {
      response.status(400).json({ "error": error.message });
      return;
    }
    // console.log("��ȸ:" + carrierName);
    response.send(results.rows);
    // response.send("ok");
  });
});



app.listen(port, () => console.log(`Listening on port ${port}`));
