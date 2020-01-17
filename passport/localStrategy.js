// var passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
 
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
        passwordField: 'pw'
        // passReqToCallback: true
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
        }, async (userid, password, done) => {
            // }, async (req, username, password, done) => {


            try {
                console.log(userid, password);
                // const exUser = await User.find({ where: { email } });
                const exUser = {userid, password}

                // console.log(exUser);
                if(exUser) {
                    // let hash = bcrypt.hashSync(exUser.password, 10);
                    // console.log("hash:", hash);
                    //password:admin00
                    const storepassword = "$2b$10$4GWf52INsdxRGz0oMGLQ2uvOaGJpamIQCHZhfZAM7pKuWKdsQvbf6";
                    const result = await bcrypt.compare(password, storepassword);
                    console.log(result);
                    if(result) {
                        console.log('정상 로그인되었습니다.');
                        done(null, exUser);
                    }
                    else {
                        console.log('비밀번호가 일치하지 않습니다.');
                        done(null, false, { message: '비밀번호가 일치하지 않습니다.' });
                    }

                }
                else {
                    console.log('가입되지 않은 회원입니다.');
                    done(null, false, { message: '가입되지 않은 회원입니다.' });
                }
            }
            catch(error) {
                console.error(error);
                done(error);
            }
        }
    ));
};
