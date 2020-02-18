// var passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const crypto = require('crypto');
// const bcrypt = require('bcrypt');
const sUser = require('../models/sessionUser');

const pgsqlPool = require("../database/pool.js").pgsqlPool
 
// const { User } = require('../models');
 
module.exports = (passport) => {

    // passport.use(new LocalStrategy({
    //     usernameField: 'id', //'username',
    //     passwordField: 'pw', //'password',
    //     passReqToCallback: true //인증을 수행하는 인증 함수로 HTTP request를 그대로  전달할지 여부를 결정한다
    //   }, function (req, username, password, done) {
    //     console.log(username, password);
    //     // if(username === 'user001' && password === 'password'){
    //     if(username === 'admin' && password === 'admin00'){
    //       return done(null, {
    //         'user_id': username,
    //       });
    //     }else{
    //       return done(false, null)
    //     }
    //   }));
          
    passport.use(new LocalStrategy({
        usernameField: 'id',
        passwordField: 'pw',
        passReqToCallback: true
/*        
        }, function(req, email, password, done) {

            const exUser = {password,email}; //DB 처리 결과

            console.log(email, password);
            let encpassword = bcrypt.hashSync(password, 10);
            console.log("encpassword", encpassword);
            // bcrypt.hash(password, 10, function(err, hash) {
            // // Store hash in database
            //     console.log("hash", hash);
            // });
            if(bcrypt.compareSync(exUser.password, encpassword)) {
                // Passwords match
            } else {
            // Passwords don't match
            }

            // const result = await bcrypt.compare(exUser.password, encpassword);

            // connection.query('select * from user where email=?', [email], function (err, rows) {
            //     if (err) { return done(err); }

            //     if (rows.length) {
            //         return done(null, false, {message: 'your email is already used'});
            //     }
            //     else {
            //         bcrypt.hash(password, null, null, function(err, hash) {
            //             var sql = {email: email, password: hash}; // 입력받은 평문을 hash로 바꿔서 넣어준다
            //             connection.query('insert into user set ?', sql, function (err, rows) {
            //                 if (err) throw err;
            //                 return done(null, { 'email' : email, 'id' : rows.insertId });
            //             });
            //         });
            //     }
            // })
*/
        // }, async (email, password, done) => {
    }, async (req, userid, password, done) => {
            // }, async (req, username, password, done) => {
                console.log('(localStrategy.js) userid:', userid, 'password:', password);

            try {

            	console.log(userid, password);

                /*
                    2020.01.21 pdk ship 

                    userid, password 로 DB를 검색하여 존재하는지에 따라 프로세스 처리
                */
                            
                // const exUser = await User.find({ where: { email } });
            	
            	if(userid) {
            		var storepassword = "";
	                let sql = "select  * from own_comp_user where user_id = upper('"+userid+"')";
	                //let sql = "select  * from own_comp_user ";
	                     pgsqlPool.connect(function(err,conn) {
	                    if(err){
	                        console.log("err" + err);
	                    }
	
	                    conn.query(sql, function(err,result){
	                        if(err){
	                            console.log(err);
	                        }
	                        if(result.rows[0] != null) {
	                            console.log("SQL:"+sql);
	                            console.log("DB DATA:"+result.rows[0].user_pw);
	                            storepassword = result.rows[0].user_pw.toString();
	                            // const storepassword = "admin00"; 
	                            
	                            // let hash = bcrypt.hashSync(exUser.password, 10);
	                            // console.log("hash:", hash);
	                            //password:admin00
	                            //const storepassword = "5a78d577c88cd1ac69c7f751cbb346763eed86862713756e4de33ed0219122238f548d8b1d5b9e19bcadcb89aedbca00ff69469e7a76fa4c0f28a154995263ec";
	                            // const result = await bcrypt.compare(password, storepassword);
	                           
	                            const exUser = {userid, password}

	                            sUser.provider = 'local';
	                            sUser.userid = userid;
	                            sUser.username = 'test',
	                            sUser.displayName = 'test',
	                            sUser.email = 'test@klnet.co.kr';
	                            req.session.sUser = sUser;
	                            
	                            const inputpassword = crypto.pbkdf2Sync(password, 'salt', 100000, 64, 'sha512').toString('hex');
	                            let resultSet = false; 
	                                 
	                                 if (inputpassword == storepassword) resultSet = true;
	                                 
	                                 // console.log("result:"+result);
	                                 if(resultSet) {
	                                     console.log('정상 로그인되었습니다.');
	                                     done(null, exUser);
	                                 } else {
	                                     console.log('아이디 또는 비밀번호가 일치하지 않습니다.');
	                                     done(null, false, { message: '아이디 또는 비밀번호가 일치하지 않습니다.' });
	                                 }   
	                        } else {
	                            console.log('가입되지 않은 회원입니다.');
	                            done(null, false, { message: '아이디 또는 비밀번호가 일치하지 않습니다.' });
	                        }
	                    });
	
	                    // conn.release();
	                });
            	}

            } catch(error) {
                console.error(error);
                done(error);
            }
    }));
};
