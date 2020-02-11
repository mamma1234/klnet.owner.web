'use strict';

const oraclePool = require("../pool.js").oraclePool
// const oracledb = require('oracledb');


const getTrackingList = (request, response) => {
	
	console.log (">>SEARCH:");
	
	let sql = "select 'LOC: '||b.port_code "
		    + ",TO_CHAR(TO_DATE(b.ETD),'YYYY-MM-DD')||' ['||TO_CHAR(TO_DATE(b.ETD,'YYYYMMDD'),'DY','NLS_DATE_LANGUAGE=KOREAN')||']' AS WEEKDAY "
		    + ",'T/T: '||NVL(to_date(b.etd) - to_Date((select max(eta) from TCS_VSL_SCH_PORT where  VOYAGE_SID = a.VOYAGE_SID and ROUTE_SEQ < b.ROUTE_SEQ)),0)||' Day' as LIST_TT "
		    + ",CASE WHEN TO_CHAR(SYSDATE,'YYYYMMDD') >= b.ETD  THEN 'Y' ELSE 'N' END AS PASS"
            + " from TCS_VSL_SCH@mfedi_real a, TCS_VSL_SCH_PORT@mfedi_real b "
            + "where a.VOYAGE_SID = b.VOYAGE_SID "
            + "and a.line_code='"+request.body.carrierCode+"' "
            + "AND a.VESSEL_NAME LIKE '%"+request.body.vesselName+"%' "
            + "and a.voyage_no='"+request.body.voyage+"' "
            + "AND a.port_code='"+request.body.startPort+"' "
            + "AND b.ROUTE_SEQ <= (SELECT MIN(X.ROUTE_SEQ) FROM MFEDI.TCS_VSL_SCH_PORT X WHERE X.VOYAGE_SID = a.VOYAGE_SID AND a.ETD <= X.ETA AND X.PORT_CODE= '"+request.body.endPort+"') "
            + "order by b.route_seq "
            
            console.log ("query:" +sql);

    oraclePool.getConnection(function(err,conn,done) {
        if(err){
            console.log("err" + err);
            response.status(400).send(err);
        }

        conn.execute(sql,{},(error, results) => {
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


module.exports = {
	    getHotInfo,
	}