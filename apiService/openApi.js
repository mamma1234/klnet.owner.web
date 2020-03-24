'use strict';

const pgsqlPool = require("../database/pool.js").pgsqlPool


const apiScheduleInfo = (request, response) => {
    let authorization = request.headers['authorization'];

    if (!authorization) {
        response.status(401).send('Unauthorization');
    } else if (authorization) {
        let tmp = authorization.split(' ');
        

        let buf = new Buffer(tmp[1], 'base64');

        let plain_auth = buf.toString();

        let creds = plain_auth.split(':');
        
        let username = creds[0];
        let password = creds[1];

        console.log(username);

        if((username =="dipark@seavantage.com") && (password =="klnet1234")) {
            console.log(request);

                if ((request.query.carrierCode == (null||undefined)) || (request.query.datafrom == (null || undefined)) || (request.query.datato == (null || undefined))) {
                    response.status(400).send('bad request');
                    return;
                }
            

            const carrierCode = request.query.carrierCode.toUpperCase();
            const datafrom = request.query.datafrom;
            const datato = request.query.datato;
            
             
            const sql = {
                text: " select line_code, vessel_name, voyage_no, " +
                      " call_sign, route_code, a.port_code as pol, a.etb, a.etd, b.port_code as calling_port, " +
                      " coalesce(b.eta, b.etb) as eta " +
                      " from mfedi_tcs_vsl_sch a, mfedi_tcs_vsl_sch_port b " +
                      " where a.voyage_sid = b.voyage_sid " +
                      " and line_code =$1 " +
                      " and a.etd between substr($2,1,8) and substr($3, 1, 8)" +
                      " order by a.voyage_sid, b.route_seq ",
                values: [carrierCode,datafrom,datato],
                rowMode: 'array',
            }
            console.log(sql.text);

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
                  console.log(result.rows);
                  response.status(200).send(result.rows);
                });
            
              });
            



        }else {
            response.status(401);
            response.send('authorizationError');
        }
    
    }

}

module.exports = {
	apiScheduleInfo
}
