const TwitterStrategy = require('passport-twitter-oauth2').Strategy;
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

    passport.use(new TwitterStrategy({
        clientID: '184064786168643', // '6cda436e06b4b488ddb29023878270e9'
        clientSecret: 'f85e8617aef5f0eed750cf85465dc3b8',
        callbackURL: '/auth/twitter/callback',
        // profileFields: ['id', 'displayName', 'email', 'birthday', 'friends', 'first_name', 'last_name', 'middle_name', 'gender', 'link'],
        passReqToCallback: true
    }, async (req, accessToken, refreshToken, profile, done) => {
        try {
            console.log('(twitterStrategy.js) profile:', profile, 'accessToken:', accessToken, 'refreshToken:', refreshToken);
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


            sUser.provider = 'twitter';
            // sUser.email = profile._json.kakao_account.email; //mamma1234@naver.com
            sUser.id = profile.id;  //3383301225075545
            sUser.username = profile.displayName
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

