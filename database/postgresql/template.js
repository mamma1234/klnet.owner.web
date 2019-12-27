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

const getSnkMasterList = (request, response) => {
    const bl_no = request.body.bl_no
    const search_date = request.body.search_date
    // console.log(req)
    console.log( bl_no, search_date)
    bl_no == "" ? console.log("o") : console.log(" x" );
    let sql = "SELECT web_seq, line_code, bl_no, cntr_no, sz_tp, coc_soc, recipient, departure, etd, arrival, eta, delivery, vessel, voyage_no FROM own_web_master_snk "
        sql += " where 1=1 "
        sql += " and web_seq like '"+ search_date+"%'"
        bl_no == "" ? sql += "" : sql += " and bl_no= '"+bl_no +"'";
                
    console.log( sql )
    pgsqlPool.connect(function(err,client,done) {
      if(err){
        console.log("err" + err);
        response.status(400).send(err);
      }
      client.query(sql, function(err,result){
        done();
        if(err){
          console.log(err);
          response.status(400).send(err);
        }
        response.status(200).send(result.rows);
      });
  
    });
  
  };

  const getKmdMasterList = (request, response) => {
    const bl_no = request.body.bl_no
    const search_date = request.body.search_date
    // console.log(req)
    console.log( bl_no, search_date)
    let sql = "SELECT web_seq, line_code, bl_no, booking_no, cntr_no, cntr_trace FROM own_web_master_kmd "
        sql += " where 1=1 "
        sql += " and web_seq like '"+ search_date+"%'"
        bl_no == "" ? sql += "" : sql += " and bl_no= '"+bl_no +"'";
    pgsqlPool.connect(function(err,client,done) {
      if(err){
        console.log("err" + err);
        response.status(400).send(err);
      }
      client.query(sql, function(err,result){
        done();
        if(err){
          console.log(err);
          response.status(400).send(err);
        }
        response.status(200).send(result.rows);
      });
  
    });
  
  };

  const getYmlMasterList = (request, response) => {
    const bl_no = request.body.bl_no
    const search_date = request.body.search_date
    // console.log(req)
    console.log( bl_no, search_date)
    let sql = "SELECT web_seq, line_code, bl_no, cntr_no, recipient, loading, discharge, delivery, vessel, voyage_no, no_of_packages, on_board_date, gross_cargo_weight, no_of_containsers, measurement, service_requirement, cntr_size, cntr_type, seal_no, move_type, date_time, latest_event, place, vgm FROM own_web_master_yml "
          sql += " where 1=1 "
          sql += " and web_seq like '"+ search_date+"%'"
          bl_no == "" ? sql += "" : sql += " and bl_no= '"+bl_no +"'";
    pgsqlPool.connect(function(err,client,done) {
      if(err){
        console.log("err" + err);
        response.status(400).send(err);
      }
      client.query(sql, function(err,result){
        done();
        if(err){
          console.log(err);
          response.status(400).send(err);
        }
        response.status(200).send(result.rows);
      });
  
    });
  
  };
  

  const getTestQueryAttibuteSample = (request, response) => {
    const sql = {
        text: 'SELECT * FROM own_vsl_sch_route_list where line_code= $1 and ts_yn = $2 limit 100',
        values: [request.body.param1, request.body.param2],
        rowMode: 'array',
    }

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
            response.status(200).send({'record':result.rows, 'field':result.fields.map(f => f.name)});
            // console.log(result.fields.map(f => f.name));

        });

        // conn.release();
    });
}

module.exports = {
    getTestSimple,
    getTestQuerySample,
    getTestQueryParamSample,
    getTestQueryAttibuteSample,
    getSnkMasterList,
    getKmdMasterList,
    getYmlMasterList,
}