exports.isLoggedIn = (req, res, next) => {
    console.log("(middlewares.js) isLoggedIn:req.isAuthenticated():".req.isAuthenticated());
    if(req.isAuthenticated()) {
        next();
    }
    else {
        res.status(403).send('로그인 필요');
    }
};
 
exports.isNotLoggedIn = (req, res, next) => {
    console.log("(middlewares.js) isNotLoggedIn:req.isAuthenticated():",req.isAuthenticated());
    console.log("req.session.sUser:", req.session.sUser);
    if(!req.isAuthenticated()) {
        next();
    }
    else {
        res.redirect('/');
        //next();
    }
};


exports.isLoggedPass = (req, res, next) => {
    console.log("(middlewares.js) isLoggedPass:req.isAuthenticated():",req.isAuthenticated());
    next();
};