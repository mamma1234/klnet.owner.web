'use strict';

const pgsqlPool = require("../pool.js").pgsqlPool
const basicauth = require("basic-auth");

  const getUserInfo = (request, response) => {
    const sql = {
        text: "select  case when user_type='S' then '선사'"+
        	"               when user_type='F' then '포워더'"+
        	"               when user_type='O' then '화주'"+
        	"               when user_type='A' then '관리자'"+
        	"               else user_type end, "+
        	" user_email,user_name,user_company," +
        	" user_phone,social_link_yn,social_name,svc_login_date from own_comp_user where user_no = $1",
        values: [request.session.sUser.userno],
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
	getUserInfo,
}