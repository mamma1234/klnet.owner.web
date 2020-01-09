'use strict';

const oraclePool = require("../pool.js").oraclePool
// const oracledb = require('oracledb');

const getTestSimple = (request, response) => {
    response.send([    
        {
            'id': 1,
            'image': 'https://placeimg.com/64/64/1',
            'name': '홍길동',
            'birthday': '961222',
            'gender': '남자',
            'job': '대학생'
        },
        {
            'id': 2,
            'image': 'https://placeimg.com/64/64/2',
            'name': '나동빈',
            'birthday': '960508',
            'gender': '남자',
            'job': '프로그래머'
        },
        {
            'id': 3,
            'image': 'https://placeimg.com/64/64/3',
            'name': '이순신',
            'birthday': '961127',
            'gender': '남자',
            'job': '디자이너'
        }
    ]);
}



const getTestQuerySample = (request, response) => {
    const sql = "SELECT sysdate, sysdate FROM dual";
    oraclePool.getConnection(function (err, conn) {
        conn.execute(sql, (error, results) => {
            if (error) {
            response.status(400).json({ "error": error.message });
            return;
            }
            // response.send(results);
            response.send(results.rows);
        });  
    });

}


const getTestQueryParamSample = (request, response) => {
    const sql = "SELECT * FROM NCS_EXP_MRN where dpt_date = :1 and dpt_date = :2 "

    oraclePool.getConnection(function(err,conn,done) {
        if(err){
            console.log("err" + err);
            response.status(400).send(err);
        }

        conn.execute(sql, ['20111218', '20111218'], (error, results) => {
            if (error) {
                response.status(400).json({ "error": error.message });
                return;
            }

            // console.log(results.json);
            // console.log(results);
            // response.send(results.rows);
            response.status(200).json(results.rows);
        });  

        // conn.release();
    });
}

const getCarrierInfo = (request, response) => {
	const sql = "SELECT A.line_code ,'['||A.LINE_CODE||'] '||B.CNAME_KR AS line_name "
        +" FROM TCS_ESHIP_CONFIG A,TCS_COMP_HEADER_TBL B"
	      +" WHERE A.KLNET_ID = B.KLNET_ID(+)"
        +" ORDER BY A.LINE_CODE ASC";

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
            
        });
        // conn.release();
    });
}

const getScheduleList = (request, response) => {
	console.log(">>>>>>log");
	console.log (">>PARAM1:"+request.body.carrierCode);
	console.log (">>PARAM2:"+request.body.startPort);
	console.log (">>PARAM3:"+request.body.endPort);
	console.log (">>PARAM4:"+request.body.startDate);
	console.log (">>PARAM5:"+request.body.endDate);
	console.log (">>PARAM6:"+request.body.vesselName);
	
	let sql = "SELECT SCH.VESSEL_NAME,SCH.VOYAGE_SID,SCH.VOYAGE_NO,SCH.LINE_CODE,SCH.PORT_CODE as START_PORT,PORT.PORT_CODE as END_PORT "
            + ",TO_CHAR(TO_DATE(SCH.ETD||SCH.ETD_TIME,'YYYYMMDDHH24MI'),'YYYY-MM-DD')AS START_DAY"
            + ",TO_CHAR(TO_DATE(PORT.ETA,'YYYYMMDDHH24MI'),'YYYY-MM-DD') AS END_DAY "
            + "FROM MFEDI.TCS_VSL_SCH@mfedi_real SCH,MFEDI.TCS_VSL_SCH_PORT@mfedi_real PORT,MFEDI.CODE_PORT@mfedi_real PORT_NM"
            + " WHERE SCH.VOYAGE_SID = PORT.VOYAGE_SID ";
            if(request.body.carrierCode != "") {
            	sql= sql + "AND SCH.LINE_CODE ='"+request.body.carrierCode+"'";	
            }
            sql = sql+ "AND SCH.LINE_CODE NOT IN ('CKC','DIF') "
            + "AND SCH.ETD LIKE '"+request.body.startDate+"%' "
            + "AND SCH.PORT_CODE ='"+request.body.startPort+"' "
            + "AND PORT.PORT_CODE = '"+request.body.endPort+"' "
            + "AND PORT.ROUTE_SEQ = (SELECT MIN(X.ROUTE_SEQ) FROM MFEDI.TCS_VSL_SCH_PORT X WHERE X.VOYAGE_SID = SCH.VOYAGE_SID AND SCH.ETD <= X.ETA AND X.PORT_CODE=  '"+request.body.endPort+"') ";
            if(request.body.vesselName != "") {
            	sql = sql + "AND SCH.VESSEL_NAME LIKE '%"+request.body.vesselName+"%' ";	
            }
            sql = sql+ "AND SCH.IO_FLAG = 'O' "
            + "AND PORT.PORT_CODE = PORT_NM.PORT_CODE(+) "
            + "ORDER BY SCH.ETD";
            
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
            
        });
        // conn.release();
    });
}


const getScheduleDetailList = (request, response) => {
	
	console.log (">>PARAM1:"+request.body.carrierCode);
	
	let sql = "select 'LOC: '||b.port_code "
		    + ",TO_CHAR(TO_DATE(b.ETD),'YYYY-MM-DD')||' ['||TO_CHAR(TO_DATE(b.ETD,'YYYYMMDD'),'DY','NLS_DATE_LANGUAGE=KOREAN')||']' AS WEEKDAY "
		    + ",'T/T: '||NVL(to_date(b.etd) - to_Date((select max(eta) from TCS_VSL_SCH_PORT where  VOYAGE_SID = a.VOYAGE_SID and ROUTE_SEQ < b.ROUTE_SEQ)),0)||' Day' as LIST_TT "
            + "from TCS_VSL_SCH@mfedi_real a, TCS_VSL_SCH_PORT@mfedi_real b "
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
            
        });
        // conn.release();
    });
}

const getPortCodeInfo = (request, response) => {
	  let sql = "";
	  const portCode=request.body.portCode.substr(0,3);
	console.log("입력Keyword:"+portCode);

	    sql = "SELECT P.PORT_CODE,P.PORT_NAME FROM MFEDI.CODE_PORT P"
		      +",MFEDI. TCS_CODE_PORT A "
		      +" WHERE P.PORT_CODE = A.ISO_PORT"
		      +" AND (P.PORT_CODE LIKE '%"+portCode+"%' or P.PORT_NAME LIKE '%"+portCode+"%')"
		      +" AND NVL(P.PORT_TYPE,' ') LIKE (CASE WHEN P.NATION_CODE = 'KR' THEN 'P' ELSE '%%' END)"
		      +" AND P.PORT_NAME IS NOT NULL"
		      +" AND A.LINE_CODE IN ( SELECT LINE_CODE FROM MFEDI.TCS_ESHIP_CONFIG)"
		      +" GROUP BY P.PORT_CODE,P.PORT_NAME";
	    
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
            
        });
        // conn.release();
    });
}


const getTestQueryAttibuteSample = (request, response) => {
    const sql = "SELECT * FROM NCS_EXP_MRN where dpt_date = :1 and dpt_date = :2 "
    console.log(request.body)

    oraclePool.getConnection(function(err,conn,done) {
        if(err){
            console.log("err" + err);
            response.status(400).send(err);
        }

        conn.execute(sql, [request.body.param1, request.body.param2], (error, results) => {
            if (error) {
                response.status(400).json({ "error": error.message });
                return;
            }

            // console.log(results.json);
            // console.log(results);
            // response.send(results.rows);
            
            response.status(200).json(results.rows);
            // console.log(results.fields);

            // console.log(results.rows.length);
        });  

        // conn.release();
    });
}


module.exports = {
	    getTestSimple,
	    getTestQuerySample,
	    getTestQueryParamSample,
	    getTestQueryAttibuteSample,
	    getCarrierInfo,
	    getScheduleList,
	    getPortCodeInfo,
	    getScheduleDetailList,
	}