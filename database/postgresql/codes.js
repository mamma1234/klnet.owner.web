'use strict';

const pgsqlPool = require("../pool.js").pgsqlPool
const basicauth = require("basic-auth");

  const getPortCodeInfo = (request, response) => {
    const sql = {
        text: "select port_code,port_name from own_code_port order by port_code",
       // values: [request.session.sUser.userno],
        rowMode: 'array',
    }
console.log(sql);
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
            console.log(result);
            
            if(result != null) {
            	console.log(result.rows[0]);
                response.status(200).json(result.rows);
            } else {
                response.status(200).json([]);
            }

        });

        // conn.release();
    });
}



module.exports = {
		getPortCodeInfo,
}