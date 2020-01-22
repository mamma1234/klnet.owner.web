const LinkedinStrategy = require('passport-linkedin-oauth2').Strategy;
const sUser = require('../models/sessionUser');

module.exports = (passport) => {

    passport.use(new LinkedinStrategy({
        clientID: '184064786168643', // '6cda436e06b4b488ddb29023878270e9'
        clientSecret: 'f85e8617aef5f0eed750cf85465dc3b8',
        callbackURL: '/auth/linkedin/callback',
        passReqToCallback: true
    }, async (req, accessToken, refreshToken, profile, done) => {
        try {
            console.log('(linkedinStrategy.js) profile:', profile, 'accessToken:', accessToken, 'refreshToken:', refreshToken);
            process.nextTick(function () {
                // const exUser = await User.find({ where: { snsId: profile.id, provider: 'kakao' } });

                const userid = profile.id
                const password = accessToken
                const exUser = {userid, password}
                console.log(exUser);

                sUser.provider = 'linkedin';
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
        }
        catch(error) {
            console.error(error);
            done(error);
        }
    }));
};

