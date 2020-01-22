const DaumStrategy = require('passport-daum-oauth2').Strategy;
const sUser = require('../models/sessionUser');
// console.log("sUser:",sUser);

module.exports = (passport) => {
    // Client Secret	= s94tuPZ0Go
    passport.use(new DaumStrategy({
        clientID: '5vSPppBEGLWEwMT8p9kZ', 
        clientSecret: 's94tuPZ0Go',
        callbackURL: '/auth/daum/callback',
        passReqToCallback: true
    }, async (req, accessToken, refreshToken, profile, done) => {
        try {
            console.log('(daumStrategy.js) profile:', profile, 'accessToken:', accessToken, 'refreshToken:', refreshToken);
            
            process.nextTick(function () {
                // const exUser = await User.find({ where: { snsId: profile.id, provider: 'kakao' } });

                const userid = profile.id
                const password = accessToken
                const exUser = {userid, password}
                console.log(exUser);

                sUser.provider = 'daum';
                sUser.email = profile._json.email; //mamma1234@naver.com
                sUser.id = profile.id;  //30625476
                sUser.username = profile.displayName
                sUser.displayName = profile.displayName       
                sUser.accessToken = accessToken;
                sUser.refreshToken = refreshToken;
                req.session.sUser = sUser;

                if(exUser) {
                    return done(null, exUser);
                }
                else {
                    console.log('가입되지 않은 회원입니다.');
                    return done(null, false, { message: '가입되지 않은 회원입니다.' });
                }                
            });


            /*
                2020.01.21 pdk ship 

                kakao id 로 DB를 검색하여 존재하면 accessToken, refreshToken 저장
                이후 서버 세션 저장 (미정, 토큰으로 클라이언트 처리할지 검토중)

                kakao id DB에 존재하지 않을 경우 회원 가입 페이지로 이동, 
                    옵션 1 신규 회원 가입 및 카카오 아이디, accessToken, refreshToken 신규 저장
                    옵션 2 기존 회원 정보 찾아 카카오 아이디 업데이트

            */

            // const userid = profile.id
            // const password = accessToken
            // const exUser = {userid, password}


            // sUser.provider = 'naver';
            // // sUser.email = profile._json.kakao_account.email; //mamma1234@naver.com
            // sUser.id = profile.id;  //1261001956
            // sUser.username = profile.username
            // sUser.displayName = profile.displayName       
            // sUser.accessToken = accessToken;
            // sUser.refreshToken = refreshToken;
            // req.session.sUser = sUser;


            // if(exUser) {
            //     done(null, exUser);
            // }
            // else {
            //     console.log('가입되지 않은 회원입니다.');
            //     done(null, false, { message: '가입되지 않은 회원입니다.' });
            //     // const newUser = await User.create({
            //     //     email: profile._json && profile._json.kaccount_email,
            //     //     nick: profile.displayName,
            //     //     snsId: profile.id,
            //     //     provider: 'kakao',
            //     // });
            //     // done(null, newUser);
            // }
        }
        catch(error) {
            console.error(error);
            done(error);
        }
    }));
};

