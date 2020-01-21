const local = require('./localStrategy');
const kakao = require('./kakaoStrategy');
const naver = require('./naverStrategy');
const facebook = require('./facebookStrategy');
const google = require('./googleStrategy');
// const { User } = require('../models');
 
module.exports = (passport) => {
    passport.serializeUser((user, done) => {
        done(null, user);
    });
    
    passport.deserializeUser((user, done) => {
        done(null, user);
        // User.find({ where: { id } })
        //     .then(user => done(null, user))
        //     .catch(err => done(err));
    });
    
    local(passport);
    kakao(passport);
    naver(passport);
    facebook(passport);
    google(passport);
};
