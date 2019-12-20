'use strict';

const pgsqlPool = require("../pool.js").pgsqlPool

const getTestSimple = (request, response) => {
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
}

const getTestQuerySample = (request, response) => {
    const sql = "SELECT * FROM customer order by id asc limit 100";
    pgsqlPool.connect(function(err,conn,done) {
        if(err){
            console.log("err" + err);
            response.status(400).send(err);
        }

        conn.query(sql, function(err,result){
            done();
            if(err){
                console.log(err);
                response.status(400).send(err);
            }
            // response.status(200).send(result.rows);
            response.status(200).json(result.rows);
        });

        // conn.release();
    });
}


const getTestQueryParamSample = (request, response) => {
    const sql = "SELECT * FROM own_vsl_sch_route_list where line_code= $1 and ts_yn = $2 limit 100"

    pgsqlPool.connect(function(err,conn,done) {
        if(err){
            console.log("err" + err);
            response.status(400).send(err);
        }

        conn.query(sql, ['APL', 'N'], function(err,result){
            done();
            if(err){
                console.log(err);
                response.status(400).send(err);
            }
            response.status(200).json(result.rows);
        });

        // conn.release();
    });
}


  
module.exports = {
    getTestSimple,
    getTestQuerySample,
    getTestQueryParamSample,
}