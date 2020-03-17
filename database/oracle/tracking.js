'use strict';

const oraclePool = require("../pool.js").oraclePool
// const oracledb = require('oracledb');


const getTrackingList = (request, response) => {
	
	console.log (">>SEARCH:");
	
	let sql = "select BL_BKG,'' AS HOT,IE_TYPE,CARRIER_CODE,VSL_NAME,VOYAGE,CURRENT_STATUS,POL,POL_ETD,POD,POD_ETA from CNEDI.OWN_TRACKING_HEADER"
            
    console.log ("query:" +sql);

    oraclePool.getConnection(function(err,conn,done) {
        if(err){
            console.log("err" + err);
            response.status(400).send(err);
        }

        conn.execute(sql,{},{outFormat:oraclePool.OBJECT},(error, results) => {
            if (error) {
                response.status(400).json({ "error": error.message });
                return;
            }

            // console.log(results.json);
            // console.log(results);
            // response.send(results.rows);
            response.status(200).json(results.rows);
            conn.close();
            
        });
        // conn.release();
    });
}


const getHotInfo = (request, response) => {
	  let sql = "";
	  //const portCode=request.body.portCode.substr(0,3);
	  //console.log("입력Keyword:"+portCode);

	    sql = "select SEQ,VESSEL_NAME,IE_TYPE,POL,POD from CNEDI.OWN_HOT_VESSEL_SET ";
	    
	    console.log("쿼리:"+sql);

  oraclePool.getConnection(function(err,conn,done) {
      if(err){
          console.log("err" + err);
          response.status(400).send(err);
      }

      conn.execute(sql,{},{outFormat:oraclePool.OBJECT},(error, results) => {
          if (error) {
              response.status(400).json({ "error": error.message });
              return;
          }

          // console.log(results.json);
          // console.log(results.rows);
          // response.send(results.rows);
  
          response.status(200).json(results.rows);
          conn.close();
          
      });
      // conn.release();
  });
}

const getCustomLineCode = (request, response) => {
    const sql = " SELECT B.CUSTOMS_CODE as LINE_CODE, '['||B.CUSTOMS_CODE||']'||A.CNAME_KR AS LINE_NAME "
        +" FROM MFEDI.TCS_COMP_HEADER_TBL A ,MFEDI.TCS_COMP_DETAIL_TBL B "
        +" WHERE A.KLNET_ID = B.KLNET_ID AND A.KLNET_ID <> 'KLTEST01' "
        +" GROUP BY CUSTOMS_CODE, A.CNAME_KR ";
    console.log(sql);
    console.log(request.body);
    oraclePool.getConnection(function(err,conn,done) {
        if(err){
            console.log("err" + err);
            response.status(400).send(err);
        }

        conn.execute(sql,{},{outFormat:oraclePool.OBJECT},(error, results) => {
            if (error) {
                response.status(400).json({ "error": error.message });
                return;
            }

            // console.log(results.json);
            // console.log(results);
            // response.send(results.rows);
            response.status(200).json(results.rows);
            conn.close();
            
        });
        // conn.release();
    });
}

module.exports = {
	    getHotInfo,
        getTrackingList,
        getCustomLineCode,
	}