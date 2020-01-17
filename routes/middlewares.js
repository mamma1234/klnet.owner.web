exports.isLoggedIn = (req, res, next) => {
    console.log("isLoggedIn:req.isAuthenticated():".req.isAuthenticated());
    if(req.isAuthenticated()) {
        next();
    }
    else {
        res.status(403).send('로그인 필요');
    }
};
 
exports.isNotLoggedIn = (req, res, next) => {
    console.log("isNotLoggedIn:req.isAuthenticated():",req.isAuthenticated());
    if(!req.isAuthenticated()) {
        next();
    }
    else {
        res.redirect('/');
    }
};
