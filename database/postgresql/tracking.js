'use strict';

const pgsqlPool = require("../pool.js").pgsqlPool
const basicauth = require("basic-auth");

  const getTrackingList = (request, response) => {
    const sql = {
        text: 'select bl_bkg,ie_type,carrier_code,vsl_name,voyage,status,pol,pol_etd,pod,pod_eta from own_tracking_bl',
       // values: [request.body.param1, request.body.param2],
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

            //response.status(200).send({'record':result.rows, 'field':result.fields.map(f => f.name)});
            response.status(200).json(result.rows);
            // console.log(result.fields.map(f => f.name));

        });

        // conn.release();
    });
}
  
module.exports = {
	getTrackingList,
}