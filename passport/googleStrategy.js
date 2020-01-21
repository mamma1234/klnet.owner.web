const GoogleStrategy = require('passport-google-oauth20').Strategy;
const sUser = require('../models/sessionUser');
// console.log("sUser:",sUser);

module.exports = (passport) => {

    // passport.use(new KakaoStrategy({
    //     clientID: secret_config.federation.kakao.client_id,
    //     callbackURL: '/auth/kakao/callback'
    //   },
    //   function (accessToken, refreshToken, profile, done) {
    //     var _profile = profile._json;
    
    //     loginByThirdparty({
    //       'auth_type': 'kakao',
    //       'auth_id': _profile.id,
    //       'auth_name': _profile.properties.nickname,
    //       'auth_email': _profile.id
    //     }, done);
    //   }
    // ));

    //{"web":{"client_id":"684197542136-kkba8s7e8a1l6pnqdio46vgdgkfkhsmn.apps.googleusercontent.com",
    // "project_id":"kl-net-1579596577680",
    // "auth_uri":"https://accounts.google.com/o/oauth2/auth",
    // "token_uri":"https://oauth2.googleapis.com/token",
    // "auth_provider_x509_cert_url":"https://www.googleapis.com/oauth2/v1/certs",
    // "client_secret":"zBaf8ektlPyt9i-crtmZe9__",
    // "redirect_uris":["http://localhost:5000/auth/google/callback"]}}

    passport.use(new GoogleStrategy({
        clientID: '684197542136-kkba8s7e8a1l6pnqdio46vgdgkfkhsmn.apps.googleusercontent.com', //process.env.KAKAO_ID,
        clientSecret: 'zBaf8ektlPyt9i-crtmZe9__',
        callbackURL: '/auth/google/callback',
        // profileFields: ['id', 'displayName', 'emails', 'birthday', 'friends', 'first_name', 'last_name', 'middle_name', 'gender', 'link'],
        passReqToCallback: true
    }, async (req, accessToken, refreshToken, profile, done) => {
        try {
            console.log('(googleStrategy.js) profile:', profile, 'accessToken:', accessToken, 'refreshToken:', refreshToken);
            // const exUser = await User.find({ where: { snsId: profile.id, provider: 'kakao' } });



            /*
                2020.01.21 pdk ship 

                kakao id 로 DB를 검색하여 존재하면 accessToken, refreshToken 저장
                이후 서버 세션 저장 (미정, 토큰으로 클라이언트 처리할지 검토중)

                kakao id DB에 존재하지 않을 경우 회원 가입 페이지로 이동, 
                    옵션 1 신규 회원 가입 및 카카오 아이디, accessToken, refreshToken 신규 저장
                    옵션 2 기존 회원 정보 찾아 카카오 아이디 업데이트

            */

            const userid = profile.id
            const password = accessToken
            const exUser = {userid, password}


            sUser.provider = 'google';
            sUser.email = profile.emails; //mamma1234@naver.com
            sUser.id = profile.id;  //1261001956
            sUser.username = profile.username
            sUser.displayName = profile.displayName       
            sUser.accessToken = accessToken;
            sUser.refreshToken = refreshToken;
            req.session.sUser = sUser;


            if(exUser) {
                done(null, exUser);
            }
            else {
                console.log('가입되지 않은 회원입니다.');
                done(null, false, { message: '가입되지 않은 회원입니다.' });
                // const newUser = await User.create({
                //     email: profile._json && profile._json.kaccount_email,
                //     nick: profile.displayName,
                //     snsId: profile.id,
                //     provider: 'kakao',
                // });
                // done(null, newUser);
            }
        }
        catch(error) {
            console.error(error);
            done(error);
        }
    }));
};

