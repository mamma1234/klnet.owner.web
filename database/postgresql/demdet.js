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
        "from own_dem_det odd ",
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
  

  
module.exports = {
	getDemDetList,
}