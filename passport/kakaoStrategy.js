const KakaoStrategy = require('passport-kakao').Strategy;

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

    passport.use(new KakaoStrategy({
        clientID: '0b6d98316119442e856dd2ad7497df14', //process.env.KAKAO_ID,
        callbackURL: '/auth/kakao/callback',
    }, async (accessToken, refreshToken, profile, done) => {
        try {
            // const exUser = await User.find({ where: { snsId: profile.id, provider: 'kakao' } });
            const exUser = {userid, password}
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

