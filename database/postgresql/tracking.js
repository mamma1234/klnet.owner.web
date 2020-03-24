'use strict';

const pgsqlPool = require("../pool.js").pgsqlPool
const basicauth = require("basic-auth");

  const getTrackingList = (request, response) => {
	
	  
	  console.log(">>>>>>"+request.body.blno);
	 let sqlText ="";
	 
	 sqlText += "select bl_bkg,ord,ie_type,carrier_code,vsl_name,voyage,status,pol,pol_etd,";
	 sqlText += " pol_dday,pod,pod_etd,pod_dday from ( ";
	 sqlText += " select floor(((row_number() over()) -1) /10 +1) as curpage, bl_bkg,ord,";
	 sqlText += " ie_type,carrier_code,vsl_name,voyage,status,pol,";
	 sqlText += " to_char(to_date(substring(case when (pol_etd = '' or pol_etd is null) then null else pol_etd end,1,8),'yyyymmdd'),'YYYY/MM/DD') as pol_etd,";
	 sqlText += " case when (pol_etd='' or pol_etd is null) then null else to_char(to_date(pol_etd,'yyyymmdd')-now(),'dd') end as pol_dday,";
	 sqlText += " pod, to_char(to_date(substring(case when pod_eta = '' or pod_eta is null then null else pod_eta end,1,8),'yyyymmdd'),'YYYY/MM/DD') as pod_etd,";
	 sqlText += " case when pod_eta='' or pod_eta is null then null else to_char(to_date(pod_eta,'yyyymmdd')- now(),'dd')end as pod_dday";
	 sqlText += " from ( select b.*, case when z.user_no is null then 9 else 0 end ord ";
	 sqlText += " from own_user_bl a ";
	 sqlText += " join own_tracking_bl b ";
	 sqlText += " on a.user_no = '"+request.session.sUser.userno+"'";
	 sqlText += " and a.bl_bkg = b.bl_bkg ";
	 if(request.body.blno) {
		 sqlText += " and b.bl_bkg = '"+request.body.blno+"'";
     }
	 if(request.body.vslname) {
		 sqlText += " and b.vsl_name like'"+request.body.vslname+"%' ";
	 }
	 sqlText += " left outer join own_book_mark z ";
	 sqlText += " on 1=1 ";
	 sqlText += " and z.carrier_code = b.carrier_code";
	 sqlText += " and (z.vsl_name = b.vsl_name or z.ie_type = b.ie_type or z.pol = b.pol or z.pod = b.pod) ) x ";
	 sqlText += " )a where curpage = '"+request.body.num+"'";
	 sqlText += " order by pol_etd";

console.log(sqlText);
    pgsqlPool.connect(function(err,conn,done) {
        if(err){
            console.log("err" + err);
            response.status(400).send(err);
        }

        conn.query(sqlText, function(err,result){
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

const getMyBlList = (request, response) => {
    
    console.log( request.body );
    let conditions = "";
    let params = [];
    conditions = " select row_number()over( order by insert_date desc) as num ";
    conditions += " ,bl_bkg,carrier_code,to_char(insert_date,'YYYY/MM/DD') as insert_date ";
    conditions += " from own_user_bl ";
    conditions += " where user_no = $1 ";
    params.push( request.session.sUser.userno );

    if( '' != request.body.fromDate && '' != request.body.toDate ) {
        conditions += " and to_char(insert_date , 'yyyymmdd') between $2 and $3 " ;
        params.push( request.body.fromDate);
        params.push( request.body.toDate);
    }
    if( '' != request.body.carrierCode ) {
        conditions += " and carrier_code = $4  ";
        params.push( request.body.carrierCode);
    }
    conditions += " and del_yn ='N' order by num";

    const sql = {
        text: conditions,
        values: params,
        // rowMode: 'array',
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

            response.status(200).json(result.rows);
        });
    });
}
  
  const getPkMyBlList = (request, response) => {
	    const sql = {
          text: "select bl_bkg "
          +" from own_user_bl "
          +" where user_no = $1 and carrier_code = $2 and bl_bkg = $3 ",
            values: [request.session.sUser.userno
                ,request.body.newData.carrier_code
                ,request.body.newData.bl_bkg,],
	        // rowMode: 'array',
        }
        console.log( sql )
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
                if(result != null) {
                    response.status(200).json(result.rows);
                } else {
                    response.status(200).json([]);
                }
	        });

	        // conn.release();
	    });
  }

  const updateMyBlNo = (request, response) => {
	    const sql = {
          text: " update own_user_bl "
          +" set bl_bkg = $1 "
          +" ,bl_no =$1 "
          +" ,update_user =$2 "
          +" ,update_date = now() "
          +" where carrier_code = $3 "
          +" and bl_bkg = $4 ",
          values: [request.body.newData.bl_bkg
              ,request.session.sUser.userno
              ,request.body.oldData.carrier_code
              ,request.body.oldData.bl_bkg],
      }
      // console.log( sql )
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
              if(result != null) {
                  response.status(200).json(result.rows);
              } else {
                  response.status(200).json([]);
              }
          });
      });
  }

  const deleteMyBlNo = (request, response) => {
	    const sql = {
          text: " update own_user_bl "
          +" set del_yn = 'Y' "
          +" ,update_user =$1 "
          +" ,update_date = now() "
          +" where carrier_code = $2 "
          +" and bl_bkg = $3 ",
          values: [request.session.sUser.userno
              ,request.body.oldData.carrier_code
              ,request.body.oldData.bl_bkg],
      }
      // console.log( sql )
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
              if(result != null) {
                  response.status(200).json(result.rows);
              } else {
                  response.status(200).json([]);
              }
          });
      });
  }

const getBookMark = (request, response) => {
    const sql = {
        text: "select seq,vsl_name,ie_type,pol,pod from own_book_mark"+
        	  " where user_no =$1  and menu_code='T'  order by seq",
        values: [request.session.sUser.userno,],
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

const getCntrList = (request, response) => {
/*    const sql = {
        text: "select row_number()over( order by loc_seq) as loc_seq, cntr_no,"+
              " case when (vsl_name is null or vsl_name ='') and (voyage_no is null or voyage_no='') then to_char(to_timestamp(move_time,'YYYYMMDDhh24mi'),'YYYY-MM-DD hh24:mi')"+
              "      else to_char(to_timestamp(move_time,'YYYYMMDDhh24mi'),'YYYY-MM-DD hh24:mi')||'/'||vsl_name||'('||voyage_no||')' end,"+
        	  " loc_name,move_name from own_tracking_loc"+
        	  " where carrier_code=$1 and bl_bkg= $2 and cntr_no is not null order by cntr_no,loc_seq",
        values: [request.body.carriercode, request.body.blno],
        rowMode: 'array',
    }*/
    
    const sql = {
            text: "select carrier_code,bl_bkg,cntr_no,loc_seq,move_time,vsl_name,voyage_no,loc_name,move_name from ("+
                  " select carrier_code,bl_bkg,cntr_no,row_number()over( partition by cntr_no order by move_time desc) as loc_seq,"+
                  "    to_char(to_timestamp(move_time,'YYYYMMDDhh24mi'),'YYYY-MM-DD hh24:mi') as move_time,"+
            	  " vsl_name,voyage_no,loc_name,move_name"+
            	  " from own_tracking_loc"+
            	  " where carrier_code= $1 and bl_bkg= $2 and cntr_no is not null"+
            	  " ) a where loc_seq=1"+
            	  " order by cntr_no",
            values: [request.body.carriercode, request.body.blno],
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
  
const getUserSetting = (request, response) => {

    const sql = {
        text: "select search_gb,search_name,search_pol,search_pod,search_eta,search_etd,"+
              " notice_eta_yn,notice_eta_value,notice_etd_yn,notice_etd_value,"+
              " notice_det_yn,notice_det_value,notice_dem_yn,notice_dem_value,"+
        	  " notice_inspect_yn,notice_inspect_off_yn,notice_email_yn,notice_email_value,"+
        	  " notice_sms_yn,notice_sms_value from own_user_ui_setting where user_no = $1",
        values: [request.session.sUser.userno],
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
            if(result != null) {
            	response.status(200).json(result.rows);
            } else {
            	response.status(200).json([]);
            }
            //response.status(200).send({'record':result.rows, 'field':result.fields.map(f => f.name)});
            //response.status(200).json(result.rows);
            // console.log(result.fields.map(f => f.name));
        });

        // conn.release();
    });
}

const getCntrDetailList = (request, response) => {

    const sql = {
        text: "select to_char(to_timestamp(move_time,'YYYYMMDDhh24mi'),'YYYY-MM-DD hh24:mi')||' / '||"+
              " vsl_name||' '||case when voyage_no is not null then '('||voyage_no||')' else voyage_no end,"+
              " loc_name,move_name from own_tracking_loc "+
              " where carrier_code = $1 "+
        	  "   and bl_bkg = $2 "+
        	  "   and cntr_no is not null and cntr_no = $3 "+
        	  "   order by loc_seq ",
        values: [request.body.carriercode, request.body.blno, request.body.cntrno],
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
            if(result != null) {
            	response.status(200).json(result.rows);
            } else {
            	response.status(200).json([]);
            }
            //response.status(200).send({'record':result.rows, 'field':result.fields.map(f => f.name)});
            //response.status(200).json(result.rows);
            // console.log(result.fields.map(f => f.name));
        });

        // conn.release();
    });
}
const getCarrierInfo = (request, response) => {

    const sql = {
        text: "select id,line_code,nm_kor,nm from OWN_CODE_CUSHIP",
        //values: [request.body.carriercode, request.body.nm, request.body.cntrno],
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
            if(result != null) {
            	response.status(200).json(result.rows);
            } else {
            	response.status(200).json([]);
            }
            //response.status(200).send({'record':result.rows, 'field':result.fields.map(f => f.name)});
            //response.status(200).json(result.rows);
            // console.log(result.fields.map(f => f.name));
        });

        // conn.release();
    });
}

const setUserSetting = (request, response) => {

    const sql = {
        text: "WITH UPSERT AS ("+
              " UPDATE OWN_USER_UI_SETTING SET "+
              "  SEARCH_GB=$1 , SEARCH_NAME= $2, SEARCH_POL=$3 , SEARCH_POD =$4, SEARCH_ETA=$5,"+
              "  SEARCH_ETD=$6, NOTICE_ETA_YN= $7, NOTICE_ETA_VALUE=$8, NOTICE_ETD_YN= $9 ,NOTICE_ETD_VALUE=$10, "+
        	  "  NOTICE_DET_YN=$11, NOTICE_DET_VALUE= $12, NOTICE_DEM_YN=$13, NOTICE_DEM_VALUE=$14, NOTICE_INSPECT_YN= $15, "+
        	  "  NOTICE_INSPECT_OFF_YN= $16, NOTICE_EMAIL_YN= $17 , NOTICE_EMAIL_VALUE=$18, NOTICE_SMS_YN= $19, NOTICE_SMS_VALUE= $20, "+
        	  "  INSERT_DATE= NOW() WHERE USER_NO=$21 AND  SERVICE_TYPE ='T' RETURNING*) "+
        	  " INSERT INTO OWN_USER_UI_SETTING (USER_NO,SERVICE_TYPE,SEARCH_GB,SEARCH_NAME,SEARCH_POL,  "+
        	  "     SEARCH_POD,SEARCH_ETA,SEARCH_ETD,NOTICE_ETA_YN,NOTICE_ETA_VALUE, "+
        	  "     NOTICE_ETD_YN,NOTICE_ETD_VALUE,NOTICE_DET_YN,NOTICE_DET_VALUE,NOTICE_DEM_YN, "+
        	  "     NOTICE_DEM_VALUE,NOTICE_INSPECT_YN,NOTICE_INSPECT_OFF_YN,NOTICE_EMAIL_YN,NOTICE_EMAIL_VALUE, "+
        	  "     NOTICE_SMS_YN,NOTICE_SMS_VALUE, INSERT_ID,INSERT_DATE) "+
        	  "          	    SELECT $21,'T',$1,$2,$3,"+  
        	  "         $4,$5,$6,$7,$8, "+
        	  "         $9,$10,$11,$12, "+
        	  "         $13,$14,$15,$16, "+
        	  "         $17,$18,$19,$20,$21,now() WHERE NOT EXISTS ( SELECT * FROM UPSERT)",
        values: [request.body.col0, request.body.col1, request.body.col2,request.body.col3,request.body.col4,
        		request.body.col5,request.body.col6,request.body.col7,request.body.col8,request.body.col9,
        		request.body.col10,request.body.col11,request.body.col12,request.body.col13,request.body.col14,
        		request.body.col15,request.body.col16,request.body.col17,request.body.col18,request.body.col19,request.session.sUser.userno
        		],
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
            if(result != null) {
            	response.status(200).json(result.rows);
            } else {
            	response.status(200).json([]);
            }
            //response.status(200).send({'record':result.rows, 'field':result.fields.map(f => f.name)});
            //response.status(200).json(result.rows);
            // console.log(result.fields.map(f => f.name));
        });

        // conn.release();
    });
}

const saveBlList = ( request, response ) => {
    // console.log( request.body );
    let dataRows = request.body.dataRows;
    let params = [];
    let multi_params = [];
    let count = 0;
    let error = null;
    
    let conditions = " insert into own_user_bl( user_no, carrier_code, bl_bkg, bl_no, cntr_no, insert_user ) ";
    for( let i = 0; i < dataRows.length; i++ ){
        // $1 user_no
        let userNo = request.session.sUser.userno;
        // $2 carrier_code
        let carrier_code = dataRows[i][1];
        // $3 bl_bkg
        let pk_bl_bkg = "";
        if( 'null' == dataRows[i][2] || '' == dataRows[i][2] || null == dataRows[i][2] ) {
            pk_bl_bkg = dataRows[i][3];
        } else {
            pk_bl_bkg = dataRows[i][2];
        }
        // $4 bl_no
        let bl_no = dataRows[i][2];
        // $5 cntr_no 
        let cntr_no =  dataRows[i][3];

        conditions += " select '"+userNo+"' user_no,'"+carrier_code+"' carrier_code, '"+pk_bl_bkg+"' bl_bkg ,'"+bl_no+"' bl_no,'"+cntr_no+"' cntr_no, '"+userNo+"' insert_user ";
        conditions += " where not exists (select 1 from own_user_bl b ";
        conditions += " where b.user_no = '"+userNo+"' and b.carrier_code = '"+carrier_code+"' and b.bl_bkg = '"+pk_bl_bkg+"' ) ";
        if( i != (dataRows.length-1) ) {
            conditions += " union all ";
        }
    // for( let i = 0; i < 2; i++ ){
        params = [];
        // console.log( dataRows[i] );
        // let dataRow = row.split(",");

        // $1 user_no
        params.push( request.session.sUser.userno );
        // $2 carrier_code
        params.push( dataRows[i][1] );
        // $3 bl_bkg
        if( 'null' == dataRows[i][2] || '' == dataRows[i][2] || null == dataRows[i][2] ) {
            params.push( dataRows[i][3] );
        } else {
            params.push( dataRows[i][2] );
        }
        // $4 bl_no
        params.push( dataRows[i][2] );
        // $5 cntr_no 
        params.push( dataRows[i][3] );
        // multi_params.push( params );
    }
    let sql = {
        text: conditions,
        // values: multi_params,
    }
    console.log( sql );
    pgsqlPool.connect( (err,conn,done) =>{
        if(err){
            console.log("err" + err);
            // response.status(400).send(err);
        }

        conn.query(sql, function(err,result){
            done();
            // console.log( result.command );
            if(err){
                error = err;
                console.log(err);
                // console.log(error);
                response.status(200).send(err);
                // response.status(400).send(err);
            } else {
                count += 1;
                console.log(count)
                // if(null != error){
                // } else {
                //     console.log("COUNT "+ count)
                //     response.status(200).json(count+"건 처리되었습니다.");
                // }
                // if ( count == dataRows.length) {
                    response.status(200).json(count+"건 처리되었습니다.");
                // }
            }
        });
    });
    // }
    // console.log( "최종>>>", error);

    // console.log( "<><><><><><><>"+error )
}


module.exports = {
	getTrackingList,
	getMyBlList,
	getBookMark,
	getCntrList,
	getUserSetting,
	getCntrDetailList,
	getCarrierInfo,
	setUserSetting,
	updateMyBlNo,
    deleteMyBlNo,
    getPkMyBlList,
    saveBlList,
}