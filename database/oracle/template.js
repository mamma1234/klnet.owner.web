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


const getTestQueryAttibuteSample = (request, response) => {
	console.log(">>>>>>>>>>>>");
    const sql = "SELECT * FROM NCS_EXP_MRN where dpt_date = :1 and dpt_date = :2 "
    console.log(request.body)

    oraclePool.getConnection(function(err,conn,done) {
        if(err){
            console.log("err" + err);
            response.status(400).send(err);
        }

        conn.execute(sql, {outFormat:oraclePool.OBJECT}, (error, results) => {
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

const getImpFlowSample = (request, response) => {

    const sql = "SELECT * FROM mfedi.tcs_flow_import_tracking where cntr_no='"+request.body.cntrNo+"'";

    oraclePool.getConnection(function(err,conn,done) {
        if(err){
            console.log("err" + err);
            response.status(400).send(err);
        }

        conn.execute(sql, (error, results) => {
            if (error) {
                response.status(400).json({ "error": error.message });
                return;
            }

            response.status(200).json(results.rows);

        }); 
    });
}

const getExpFlowSample = (request, response) => {
	
	const sql = "SELECT * FROM mfedi.tcs_flow_export_tracking where cntr_no='"+request.body.cntrNo+"'";
	console.log(sql);
    oraclePool.getConnection(function(err,conn,done) {
        if(err){
            console.log("err" + err);
            response.status(400).send(err);
        }

        conn.execute(sql, (error, results) => {
            if (error) {
                response.status(400).json({ "error": error.message });
                return;
            }

            response.status(200).json(results.rows);
        });  

    });
}


module.exports = {
	    getTestSimple,
	    getTestQuerySample,
	    getTestQueryParamSample,
	    getTestQueryAttibuteSample,
	    getImpFlowSample,
	    getExpFlowSample
	}