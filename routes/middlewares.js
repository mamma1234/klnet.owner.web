exports.isLoggedIn = (req, res, next) => {
   // console.log("(middlewares.js) isLoggedIn:req.isAuthenticated():".req.isAuthenticated());
	console.log("(isLoggedIn middlewares.js)req.session.sUser:", req.session.sUser);
    if(req.isAuthenticated()) {
        next();
    }
    else {
    	console.log("로그인필요");
        res.status(200).send('로그인 필요');
        //res.status(403).send('로그인 필요');
        next();
    }
};
 
exports.isNotLoggedIn = (req, res, next) => {
    console.log("(middlewares.js) isNotLoggedIn:req.isAuthenticated():",req.isAuthenticated());
    console.log("(isNotLoggedIn middlewares.js) req.session.sUser:", req.session.sUser);
    if(!req.isAuthenticated()) {
        next();
    }
    else {
        res.redirect('/login');
        //next();
    }
};


exports.isLoggedPass = (req, res, next) => {
    console.log("(middlewares.js) isLoggedPass:req.isAuthenticated():",req.isAuthenticated());
    next();
};