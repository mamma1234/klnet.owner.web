'use strict';

const pgsqlPool = require("../pool.js").pgsqlPool
const basicauth = require("basic-auth");

const getDemDetList = (request, response) => {
    const sql = {
        text: "select line_code as line_code,ie_type, bl_bkg, cntr_no, type_size, mbl_no, hbl_no, bkg_no, vsl_code, vsl_name, voyage, ter_ref_no, pol, pod "+
        ", to_char(to_date(eta,'YYYYMMDD'), 'YYYY-MM-DD') as eta, eta_time "+
        ", to_char(to_date(etd,'YYYYMMDD'), 'YYYY-MM-DD') as etd, etd_time "+
        ", to_char(to_timestamp(ata||ata_time,'YYYYMMDDHH24MI'),'YYYY-MM-DD HH24:MI') as ata, ata_time "+
        ", to_char(to_date(atd,'YYYYMMDD'), 'YYYY-MM-DD') as atd, atd_time "+
        ", to_char(to_timestamp(unloading_date,'YYYYMMDDHH24MI'), 'YYYY-MM-DD') as unloading_date "+
        ", to_char(to_timestamp(loading_date,'YYYYMMDDHH24MI'), 'YYYY-MM-DD') as loading_date "+
        ", to_char(to_timestamp(full_outgate_date,'YYYYMMDDHH24MI'), 'YYYY-MM-DD') as full_outgate_date "+
        ", to_char(to_timestamp(full_ingate_date,'YYYYMMDDHH24MI'), 'YYYY-MM-DD') as full_ingate_date "+
        ", to_char(to_timestamp(mt_outgate_date,'YYYYMMDDHH24MI'), 'YYYY-MM-DD') as mt_outgate_date "+
        ", to_char(to_timestamp(mt_ingate_date,'YYYYMMDDHH24MI'), 'YYYY-MM-DD') as mt_ingate_date "+
        ", ret_date, dem_date, osc_date "+
        ", trim(to_char(dem_amount,'999,999,999,999')) as dem_amount "+
        ", trim(to_char(dem_vat,'999,999,999,999')) as dem_vat "+
        ", dem_unit "+
        ", trim(to_char(det_amount,'999,999,999,999')) as det_amount "+
        ", trim(to_char(det_vat,'999,999,999,999')) as det_vat "+
        ", det_unit "+
        ", trim(to_char(combin_amount,'999,999,999,999')) as combin_amount "+
        ", trim(to_char(combin_vat,'999,999,999,999')) as combin_vat "+
        ", combin_unit  "+
        ", trim(to_char(osc_amount,'999,999,999,999')) as osc_amount "+
        ", trim(to_char(osc_vat,'999,999,999,999')) as osc_vat "+
        ", osc_unit "+
        ", remark "+
        "from own_dem_det odd "+
        "order by line_code desc ",
        values: [],
        rowMode: 'array',
    }

    pgsqlPool.connect(function(err,conn,done) {
        if(err){
            console.log("err" + err);
            response.status(400).send(err);
        }
        console.log("sql : " + sql.text);
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

const getTarrifList = (request, response) => { 
    //console.log(">> request.body :"+request.body);
    const sql = {
        text: "select bound, cntr_type, cntr_size, date1, date2, "+
              "       case when m_gubun = '1' then 'KRW' "+
              "            when m_gubun = '2' then 'USD' end m_gubun "+
              ", trim(to_char(cast(charge as float),'999,999,999,999'))  as charge "+
              ", to_char(to_date(begin_date,'YYYYMMDD'), 'YYYY-MM-DD') as begin_date "+
              ", to_char(to_date(expire_date,'YYYYMMDD'), 'YYYY-MM-DD') as expire_date "+
              "from mfedi_tcs_do_charge  "+
              "where line_code is not null  "+
              "and line_code = $1 "+
              "and dem_det_type = '1' "+  
            //   "and cntr_type = $2 "+
            //   "and cntr_size = $3 "+
              "order by line_code, bound, dem_det_type, cntr_type, cntr_size, date1, date2, begin_date, expire_date ",
              //values: [request.body.lineCode, request.body.cntrType, request.body.cntrSize],
              values: [request.body.lineCode],
        rowMode: 'array',
    }

    pgsqlPool.connect(function(err,conn,done) { 
        if(err){
            console.log("err" + err);
            response.status(400).send(err);
        }
        console.log("sql : " + sql.text);
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
    getDemDetList,
    getTarrifList,
}