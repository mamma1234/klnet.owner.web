'use strict';

const pgsqlPool = require("../pool.js").pgsqlPool
const basicauth = require("basic-auth");
const getTestSimple = (request, response) => {

    response.send(
      [
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
    ]
  );
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

    bl_no == "" ? console.log("o") : console.log(" x" );
    let sql = "SELECT web_seq, line_code, bl_no, cntr_no, sz_tp, coc_soc, recipient, departure, etd, arrival, eta, delivery, vessel, voyage_no FROM own_web_master_snk "
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

  const getKmdMasterList = (request, response) => {
    const bl_no = request.body.bl_no
    const search_date = request.body.search_date
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
  
  const getUserInfoSample = (request, response) => {
	  console.log ("value:"+request.body.id);
	    const sql = {
	        text: 'SELECT 1 FROM own_user_test where  user_id= $1 and user_pw = $2 limit 1',
	        values: [request.body.id, request.body.pw],
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
	            
	            response.status(200).send(result.rows);
	            console.log("ok"+result.rows);
	            // console.log(result.fields.map(f => f.name));

	        });

	        // conn.release();
	    });
  }
  


  const getPortLocation = (request, response) => {
    const port = request.body.portCode;

    if (port == undefined) {
      response.set('parameter','error');
      response.status(400).send();
      return;
    }
    let idx = 0;
    let sql = "SELECT terminal, terminal_kname, terminal_ename, wgs84_x, wgs84_y FROM own_terminal_info "
        sql += " where 1=1 ";
    port == "" ? sql +="" : 
    
    port.forEach(element => {
      console.log(idx);
      const nationCode = element.substr(0,2);
      const portCode = element.substr(2,3);
      if (idx == 0) {
        sql+= " and (nation_code = '" + nationCode +"' and location_code = '" + portCode + "') ";
      }else{
        sql+= " or (nation_code = '" + nationCode +"' and location_code = '" + portCode + "') ";
      }
      idx++;
    });
    
        
    console.log("query == ",sql);    
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
  
  }

  const getAllPort = (request, response) => {
    console.log(request.body);
    const port = request.body.portCode;
    

    let sql = "SELECT port_code, port_name, port_kname, float8(wgs84_x) as wgs84_x, float8(wgs84_y) as wgs84_y FROM own_code_port "
        sql += " where 1=1 ";
        sql += " and use_yn = 'Y'"
        sql += " and port_id is not null"
    port == "" ? sql +="" : sql += " and port_code = '" + port + "'" 

    console.log("query == ",sql);    
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
  
  }


  const getPort = (request, response) => {
    console.log(request);
    const port = request.body.portCode;
    

    let sql = "SELECT port_code, port_name, port_kname, float8(wgs84_x) as wgs84_x, float8(wgs84_y) as wgs84_y FROM own_code_port "
        sql += " where 1=1 ";
        sql += " and use_yn = 'Y'"
        sql += " and nation_code = 'KR'"
        sql += " and port_code in('KRPUS', 'KRKAN', 'KRINC', 'KRUSN', 'KRPTK', 'KRKPO')"
    port == "" ? sql +="" : sql += " and port_code = '" + port + "'" 

    console.log("query == ",sql);    
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
  
  }  
//   const getPortwgx84 = (request, response) => {
//     const DataSet = request.body ;
//     pgsqlPool.connect(function(err,client,done) {
//       if(err){
//         console.log("err" + err);
//       }
//     DataSet.forEach(element => {
      
//       console.log('element',element);
      
//       if (element.unlocode !== undefined){ 
//         console.log( element.unlocode );
//         let sql1 = " update own_code_port set "
//         sql1 += " wgs84_x = '" + element.longitude + "', "
//         sql1 += " wgs84_y = '" + element.latitude + "', "
//         element.portAlias == null ? sql1 +="" : sql1 += " port_alias = '" + element.portAlias + "', "
//         element.timezone == null ? sql1 +="" : sql1 += " timezone = '" + element.timezone + "', " 
//         element.geoData == null ? sql1 +="" : sql1 += " geo_data = '" + element.geoData + "', " 
//         element.portShipType == null ? sql1 +="" : sql1 += " port_ship_type = '" + element.portShipType + "', " 
//         element.portId == null ? sql1 +="" : sql1 += " port_id = '" + element.portId + "' "
//         sql1 += " where port_code = '"+ element.unlocode +"'"

//         console.log(sql1);
        
        
//         client.query(sql1, function(err,result){
//           done();
//           if(err){
//             console.log(err);
//             response.status(400).send(err);
//           }
//           console.log('success');
//           result.
//           response.status(200).send("SUCCESS");

//         });
        
      
//       } else{
//         console.log('success1');
//         response.status(200).send("SUCCESS");
//       }
//     });
//     response.status(200).send("SUCCESS");
//   });
// }



const getPortwgx84 = (request, response) => {
  const DataSet = request.body ;
  pgsqlPool.connect(function(err,client) {
    if(err){
      console.log("err" + err);
    }
  DataSet.forEach(element => {
    
    console.log('element',element);
    
    if (element.unlocode !== undefined){ 
      console.log( element.unlocode );
      let sql1 = " update own_code_port set "
      sql1 += " wgs84_x = '" + element.longitude + "', "
      sql1 += " wgs84_y = '" + element.latitude + "', "
      element.portAlias == null ? sql1 +="" : sql1 += " port_alias = '" + element.portAlias + "', "
      element.timezone == null ? sql1 +="" : sql1 += " timezone = '" + element.timezone + "', " 
      element.geoData == null ? sql1 +="" : sql1 += " geo_data = '" + element.geoData + "', " 
      element.portShipType == null ? sql1 +="" : sql1 += " port_ship_type = '" + element.portShipType + "', " 
      element.portId == null ? sql1 +="" : sql1 += " port_id = '" + element.portId + "' "
      sql1 += " where port_code = '"+ element.unlocode +"'"

      console.log(sql1);
      
      
      client.query(sql1, function(err,result){
        if(err){
          console.log(err);
          //response.status(400).send(err);
        }
        console.log('success');
        client.query('COMMIT');

      });
      
    
    } else{
      console.log('err');
    }
  });
  response.status(200).send("SUCCESS");
});
}

    // let sql = "select count(*) from own_code_port where port_code = unlocode";
    // port == "" ? sql +="" : sql += " and port_code = '" + port + "'" 

    // console.log("query == ",sql);    
    // pgsqlPool.connect(function(err,client,done) {
    //   if(err){
    //     console.log("err" + err);
    //     response.status(400).send(err);
    //   }
    //   client.query(sql, function(err,result){
    //     done();
    //     if(err){
    //       console.log(err);
    //       response.status(400).send(err);
    //     }
    //     console.log(result.rows);
    //     response.status(200).send(result.rows);
    //   });
  
    // });
  
module.exports = {
    getTestSimple,
    getTestQuerySample,
    getTestQueryParamSample,
    getTestQueryAttibuteSample,
    getSnkMasterList,
    getKmdMasterList,
    getYmlMasterList,
    getUserInfoSample,
    getPortLocation,
    getPort,
    getAllPort,
    getPortwgx84,
}