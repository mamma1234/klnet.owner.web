const express = require('express');
const passport = require('passport');
// const bcrypt = require('bcrypt');
const { isLoggedIn, isNotLoggedIn, isLoggedPass } = require('./middlewares');
 
const router = express.Router();
router.post('/join', isNotLoggedIn, async (req, res, next) => {
    const { email, nick, password } = req.body;
    try {
        const exUser = await User.find({ where: { email } });
        if(exUser) {
            req.flash('joinError', '이미 가입된 이메일입니다.');
            return res.redirect('/join');
        }
    
        // const hash = await bcrypt.hash(password, 12);
        const hash = password;
        await User.create({
            email,
            nick,
            password: hash,
        });
        return res.redirect('/');
    } catch(error) {
        console.error(error);
        return next(error);
    }            
});
 

// router.post('/login', isNotLoggedIn, (req, res, next) => {
router.post('/login', isLoggedPass, (req, res, next) => {
    console.log("(auth.js) req.isAuthenticated():", req.isAuthenticated());
    
    passport.authenticate('local', (authError, user, info) => {
        console.log("authError:",authError,",user:",user,",info:",info);
        if(authError) {
            console.error("authError", authError);
            return next(authError);
        }
        if(!user){
            console.log("!user", user);
            // req.flash('loginError', info.message);
            // return res.redirect('/');

            res.status(200).json(info);
            return;
        }
        return req.login(user, (loginError) => {
            console.log("user", user);
            if(loginError) {
                console.error("loginError", loginError);
                return next(loginError);
            }
            // return res.redirect('/');
            res.status(200).json(user);
            return;
            // return res.redirect('http://localhost:3000');
        });
    })(req, res, next)  //미들웨어 내의 미들웨어에는 (req, res, next)를 붙인다.
});



// kakao 로그인
router.get('/login/kakao',
  passport.authenticate('kakao')
);

router.get('/kakao/callback', isLoggedPass, (req, res, next) => {
    
    console.log("(auth.js) /kakao/callback:req.isAuthenticated():", req.isAuthenticated());
    
    passport.authenticate('kakao', (authError, user, info) => {
        console.log("authError:",authError,",user:",user,",info:",info);
        if(authError) {
            console.error("authError", authError);
            return next(authError);
        }
        if(!user){
            console.log("!user", user);
            // req.flash('loginError', info.message);
            return res.redirect('http://localhost:3000/login');

            // res.status(200).json(info);
            // return;
        }
        return req.login(user, (loginError) => {
            console.log("user", user);
            if(loginError) {
                console.error("loginError", loginError);
                return next(loginError);
            }
            console.log("http://localhost:3000 redirect");
            return res.redirect('http://localhost:3000');
            // res.status(200).json(user);
            // return;
        });
    })(req, res, next)  //미들웨어 내의 미들웨어에는 (req, res, next)를 붙인다.
});


// kakao 로그인 연동 콜백
// router.get('/kakao/callback',
//   passport.authenticate('kakao', {
//     successRedirect: '/',
//     failureRedirect: '/login'
//   })
// );

// router.get('/login/kakao/callback', 
//     passport.authenticate('kakao', {
//         failureRedirect: '/',
//     }), 
//     (req, res) => {
//         res.redirect('/');
//     }
// );


// // naver 로그인
// router.get('/auth/login/naver',
//   passport.authenticate('naver')
// );
// // naver 로그인 연동 콜백
// router.get('/auth/login/naver/callback',
//   passport.authenticate('naver', {
//     successRedirect: '/',
//     failureRedirect: '/login'
//   })
// );


router.get('/naver/callback', isLoggedPass, (req, res, next) => {
    
    console.log("(auth.js) /naver/callback:req.isAuthenticated():", req.isAuthenticated());
    
    passport.authenticate('naver', (authError, user, info) => {
        console.log("authError:",authError,",user:",user,",info:",info);
        if(authError) {
            console.error("authError", authError);
            return next(authError);
        }
        if(!user){
            console.log("!user", user);
            // req.flash('loginError', info.message);
            return res.redirect('http://localhost:3000/login');

            // res.status(200).json(info);
            // return;
        }
        return req.login(user, (loginError) => {
            console.log("user", user);
            if(loginError) {
                console.error("loginError", loginError);
                return next(loginError);
            }
            console.log("http://localhost:3000 redirect");
            return res.redirect('http://localhost:3000');
            // res.status(200).json(user);
            // return;
        });
    })(req, res, next)  //미들웨어 내의 미들웨어에는 (req, res, next)를 붙인다.
});

// // facebook 로그인
// router.get('/auth/login/facebook',
//   passport.authenticate('facebook')
// );
// // facebook 로그인 연동 콜백
// router.get('/auth/login/facebook/callback',
//   passport.authenticate('facebook', {
//     successRedirect: '/',
//     failureRedirect: '/login'
//   })
// );
router.get('/facebook/callback', isLoggedPass, (req, res, next) => {
    
    console.log("(auth.js) /facebook/callback:req.isAuthenticated():", req.isAuthenticated());
    
    passport.authenticate('facebook', (authError, user, info) => {
        console.log("authError:",authError,",user:",user,",info:",info);
        if(authError) {
            console.error("authError", authError);
            return next(authError);
        }
        if(!user){
            console.log("!user", user);
            // req.flash('loginError', info.message);
            return res.redirect('http://localhost:3000/login');

            // res.status(200).json(info);
            // return;
        }
        return req.login(user, (loginError) => {
            console.log("user", user);
            if(loginError) {
                console.error("loginError", loginError);
                return next(loginError);
            }
            console.log("http://localhost:3000 redirect");
            return res.redirect('http://localhost:3000');
            // res.status(200).json(user);
            // return;
        });
    })(req, res, next)  //미들웨어 내의 미들웨어에는 (req, res, next)를 붙인다.
});

router.get('/google/callback', isLoggedPass, (req, res, next) => {
    
    console.log("(auth.js) /google/callback:req.isAuthenticated():", req.isAuthenticated());
    
    passport.authenticate('google', (authError, user, info) => {
        console.log("authError:",authError,",user:",user,",info:",info);
        if(authError) {
            console.error("authError", authError);
            return next(authError);
        }
        if(!user){
            console.log("!user", user);
            // req.flash('loginError', info.message);
            return res.redirect('http://localhost:3000/login');

            // res.status(200).json(info);
            // return;
        }
        return req.login(user, (loginError) => {
            console.log("user", user);
            if(loginError) {
                console.error("loginError", loginError);
                return next(loginError);
            }
            console.log("http://localhost:3000 redirect");
            return res.redirect('http://localhost:3000');
            // res.status(200).json(user);
            // return;
        });
    })(req, res, next)  //미들웨어 내의 미들웨어에는 (req, res, next)를 붙인다.
});


router.get('/openbank/callback', isLoggedPass, (req, res, next) => {
    
    console.log("(auth.js) /openbank/callback:req.isAuthenticated():", req.isAuthenticated());
    
    passport.authenticate('openbank', (authError, user, info) => {
        console.log("authError:",authError,",user:",user,",info:",info);
        if(authError) {
            console.error("authError", authError);
            return next(authError);
        }
        if(!user){
            console.log("!user", user);
            // req.flash('loginError', info.message);
            return res.redirect('http://localhost:3000/login');

            // res.status(200).json(info);
            // return;
        }
        return req.login(user, (loginError) => {
            console.log("user", user);
            if(loginError) {
                console.error("loginError", loginError);
                return next(loginError);
            }
            console.log("http://localhost:3000 redirect");
            return res.redirect('http://localhost:3000');
            // res.status(200).json(user);
            // return;
        });
    })(req, res, next)  //미들웨어 내의 미들웨어에는 (req, res, next)를 붙인다.
});


router.get('/microsoft/callback', isLoggedPass, (req, res, next) => {
    
    console.log("(auth.js) /microsoft/callback:req.isAuthenticated():", req.isAuthenticated());
    
    passport.authenticate('microsoft', (authError, user, info) => {
        console.log("authError:",authError,",user:",user,",info:",info);
        if(authError) {
            console.error("authError", authError);
            return next(authError);
        }
        if(!user){
            console.log("!user", user);
            // req.flash('loginError', info.message);
            return res.redirect('http://localhost:3000/login');

            // res.status(200).json(info);
            // return;
        }
        return req.login(user, (loginError) => {
            console.log("user", user);
            if(loginError) {
                console.error("loginError", loginError);
                return next(loginError);
            }
            console.log("http://localhost:3000 redirect");
            return res.redirect('http://localhost:3000');
            // res.status(200).json(user);
            // return;
        });
    })(req, res, next)  //미들웨어 내의 미들웨어에는 (req, res, next)를 붙인다.
});


router.get('/daum/callback', isLoggedPass, (req, res, next) => {
    
    console.log("(auth.js) /daum/callback:req.isAuthenticated():", req.isAuthenticated());
    
    passport.authenticate('daum', (authError, user, info) => {
        console.log("authError:",authError,",user:",user,",info:",info);
        if(authError) {
            console.error("authError", authError);
            return next(authError);
        }
        if(!user){
            console.log("!user", user);
            // req.flash('loginError', info.message);
            return res.redirect('http://localhost:3000/login');

            // res.status(200).json(info);
            // return;
        }
        return req.login(user, (loginError) => {
            console.log("user", user);
            if(loginError) {
                console.error("loginError", loginError);
                return next(loginError);
            }
            console.log("http://localhost:3000 redirect");
            return res.redirect('http://localhost:3000');
            // res.status(200).json(user);
            // return;
        });
    })(req, res, next)  //미들웨어 내의 미들웨어에는 (req, res, next)를 붙인다.
});



router.get('/twitter/callback', isLoggedPass, (req, res, next) => {
    
    console.log("(auth.js) /twitter/callback:req.isAuthenticated():", req.isAuthenticated());
    
    passport.authenticate('twitter', (authError, user, info) => {
        console.log("authError:",authError,",user:",user,",info:",info);
        if(authError) {
            console.error("authError", authError);
            return next(authError);
        }
        if(!user){
            console.log("!user", user);
            // req.flash('loginError', info.message);
            return res.redirect('http://localhost:3000/login');

            // res.status(200).json(info);
            // return;
        }
        return req.login(user, (loginError) => {
            console.log("user", user);
            if(loginError) {
                console.error("loginError", loginError);
                return next(loginError);
            }
            console.log("http://localhost:3000 redirect");
            return res.redirect('http://localhost:3000');
            // res.status(200).json(user);
            // return;
        });
    })(req, res, next)  //미들웨어 내의 미들웨어에는 (req, res, next)를 붙인다.
});


router.get('/cognito/callback', isLoggedPass, (req, res, next) => {
    
    console.log("(auth.js) /cognito/callback:req.isAuthenticated():", req.isAuthenticated());
    
    passport.authenticate('cognito', (authError, user, info) => {
        console.log("authError:",authError,",user:",user,",info:",info);
        if(authError) {
            console.error("authError", authError);
            return next(authError);
        }
        if(!user){
            console.log("!user", user);
            // req.flash('loginError', info.message);
            return res.redirect('http://localhost:3000/login');

            // res.status(200).json(info);
            // return;
        }
        return req.login(user, (loginError) => {
            console.log("user", user);
            if(loginError) {
                console.error("loginError", loginError);
                return next(loginError);
            }
            console.log("http://localhost:3000 redirect");
            return res.redirect('http://localhost:3000');
            // res.status(200).json(user);
            // return;
        });
    })(req, res, next)  //미들웨어 내의 미들웨어에는 (req, res, next)를 붙인다.
});


router.get('/instagram/callback', isLoggedPass, (req, res, next) => {
    
    console.log("(auth.js) /instagram/callback:req.isAuthenticated():", req.isAuthenticated());
    
    passport.authenticate('instagram', (authError, user, info) => {
        console.log("authError:",authError,",user:",user,",info:",info);
        if(authError) {
            console.error("authError", authError);
            return next(authError);
        }
        if(!user){
            console.log("!user", user);
            // req.flash('loginError', info.message);
            return res.redirect('http://localhost:3000/login');

            // res.status(200).json(info);
            // return;
        }
        return req.login(user, (loginError) => {
            console.log("user", user);
            if(loginError) {
                console.error("loginError", loginError);
                return next(loginError);
            }
            console.log("http://localhost:3000 redirect");
            return res.redirect('http://localhost:3000');
            // res.status(200).json(user);
            // return;
        });
    })(req, res, next)  //미들웨어 내의 미들웨어에는 (req, res, next)를 붙인다.
});

router.get('/linkedin/callback', isLoggedPass, (req, res, next) => {
    
    console.log("(auth.js) /linkedin/callback:req.isAuthenticated():", req.isAuthenticated());
    
    passport.authenticate('linkedin', (authError, user, info) => {
        console.log("authError:",authError,",user:",user,",info:",info);
        if(authError) {
            console.error("authError", authError);
            return next(authError);
        }
        if(!user){
            console.log("!user", user);
            // req.flash('loginError', info.message);
            return res.redirect('http://localhost:3000/login');

            // res.status(200).json(info);
            // return;
        }
        return req.login(user, (loginError) => {
            console.log("user", user);
            if(loginError) {
                console.error("loginError", loginError);
                return next(loginError);
            }
            console.log("http://localhost:3000 redirect");
            return res.redirect('http://localhost:3000');
            // res.status(200).json(user);
            // return;
        });
    })(req, res, next)  //미들웨어 내의 미들웨어에는 (req, res, next)를 붙인다.
});

// router.post('/login', isNotLoggedIn, (req, res, next) => {
//     passport.authenticate('local', (authError, user, info) => {
//         if(authError) {
//             console.error(authError);
//             return next(authError);
//         }
//         if(!user){
//             req.flash('loginError', info.message);
//             return res.redirect('/');
//         }
//         return req.login(user, (loginError) => {
//             if(loginError) {
//                 console.error(loginError);
//                 return next(loginError);
//             }
//             return res.redirect('/');
//         });
//     })(req, res, next)  //미들웨어 내의 미들웨어에는 (req, res, next)를 붙인다.
// });
 
router.get('/logout', isLoggedIn, (req, res) => {
	console.log(">>>>>LOG OUT");
    req.logout();
    delete req.session.sUser;
    //req.session.destroy();
/*    req.session.destroy(function(err){
    	res.redirect('/');
    });*/
    req.session.save(function(){
    	res.redirect('/');
    	console.log("정상로그아웃 되었습니다.");
    })
    
});
 
module.exports = router;
