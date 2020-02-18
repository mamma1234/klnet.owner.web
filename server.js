'use strict';
const express = require("express");

const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const path = require('path');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
//const auth = require('basic-auth');
require('dotenv').config();
// const cookieSession = require('cookie-session');

const pageRouter = require('./routes/page');
const authRouter = require('./routes/auth');

// const { sequelize } = require('./models');
const passportConfig = require('./passport');
const bodyParser = require("body-parser");
const dao = require('./database/');

// const bcrypt = require('bcrypt');
const { isLoggedIn, isNotLoggedIn } = require('./routes/middlewares');

const app = express();
// sequelize.sync();
passportConfig(passport);
//const swaggerRouter = require('./routes/swaggerDoc'); //swagger 설정 정의
const sUser = require('./models/sessionUser');
console.log("sUser:",sUser);

app.set('views', path.join(__dirname, 'views')); //템플리트 엔진을 사용 1
app.set('view engine', 'pug'); //템플리트 엔진을 사용 2
//app.use(swaggerRouter);//swagger API
app.use(morgan('dev')); //morgan: 요청에 대한 정보를 콘솔에 기록
app.use(express.static(path.join(__dirname, 'public'))); //static: 정적인 파일을 제공, public 폴더에 정적 폴더를 넣는다.
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser('nodebirdsecret')); //cookie-parser: 요청에 동봉된 쿠키를 해석
app.use(session({   //express-session: 세션 관리용 미들웨어, 로그인 드의 이유로 세션을 구현할 때 유용하다.
    resave: false,
    saveUninitialized: false,
    secret: 'nodebirdsecret',
    cookie: {
        httpOnly: true,
        secure: false,
        //saveUninitialized:true,
        cookie: {
          maxAge: 1000 * 60 * 60 // 유효기간 1시간
        }
    },
}));
// app.use(cookieSession({
//     keys: ['node_yun'],
//     cookie: {
//       maxAge: 1000 * 60 * 60 // 유효기간 1시간
//     }
// }));
app.use(flash()); //connect-flash: 일회성 메시지들을 웹 브라우저에 나타낼 때 사용한다. cookie-parser와 express-session 뒤에 위치해야한다.
app.use(passport.initialize());
app.use(passport.session());

/*
2020.01.21 pdk ship 개발 혹은 테스트 기간중 아래 세션 체크 로직 편의상 막아도 됨

app.route(/^((?!\/auth\/|\/login).)*$/s).all(function(req, res, next) {    
	var path = req.params[0];
	console.log("(server.js) path:",path);
    // if (req.isAuthenticated !== undefined && req.isAuthenticated()){
    if (req.isAuthenticated()){
      console.log('로그인 정보 남아 있음.', req.session.sUser);
      next();
    } else {
      var fullUrl = req.protocol + '://' + req.headers.host + req.originalUrl;
      console.log( fullUrl );
      console.log('로그인 정보 없음 예외 처리');
      // console.log(req.headers.host);
      // return res.redirect('http://' + req.headers.host + '/login/?redirect=' + fullUrl);
      //return res.redirect('http://' + req.headers.host + '/login');

      // return;
      // const err = new Error('Not Found');
      // err.status = 404;
      // next(err);

      // req.logout();
      // req.session.destroy();
      // res.redirect('/');   
      // return res.redirect('http://' + req.headers.host + '/auth/');
      // return res.redirect('/auth/logout');
      // next('/auth/logout');
      next('not login');
    }

	// if ( req.session.user ) { 
	// 	console.dir( req.session.user );
	// 	console.log('로그인 정보 남아 있음.');
	// 	next();
	// } else {
	// 	var fullUrl = req.protocol + '://' + req.headers.host + req.originalUrl;
	// 	console.log( fullUrl );
  //       console.log('로그인 정보 없음 예외 처리');
  //       console.log(req.headers.host);
  //       // return res.redirect('http://' + req.headers.host + '/login/?redirect=' + fullUrl);
  //       //return res.redirect('http://' + req.headers.host + '/login');

  //       return;
  // }
})
*/

app.route(/^((?!\/auth\/|\/login).)*$/s).all(function(req, res, next) {    
	var path = req.params[0];
	console.log("(server.js) path:",path);
    // if (req.isAuthenticated !== undefined && req.isAuthenticated()){
    //if (req.isAuthenticated()){
     // console.log('로그인 정보 남아 있음.', req.session.sUser);
    //  next();
    //} else {
    //  var fullUrl = req.protocol + '://' + req.headers.host + req.originalUrl;
    //  console.log( fullUrl );
    //  console.log('로그인 정보 없음 예외 처리');
      // console.log(req.headers.host);
      // return res.redirect('http://' + req.headers.host + '/login/?redirect=' + fullUrl);
      //return res.redirect('http://' + req.headers.host + '/login');

      // return;
      // const err = new Error('Not Found');
      // err.status = 404;
      // next(err);

      // req.logout();
      //req.session.destroy();
      // res.redirect('/');   
      // return res.redirect('http://' + req.headers.host + '/auth/');
      // return res.redirect('/auth/logout');
      //next('/auth/logout');
      //next('not login');
   // }
 if ( req.session.sUser ) { 
 	console.dir( req.session.sUser );
 	console.log('로그인 정보 남아 있음.');
 	next();
 } else {
	var fullUrl = req.protocol + '://' + req.headers.host + req.originalUrl;
 	console.log( fullUrl );
       console.log('로그인 정보 없음 예외 처리');
       console.log(req.headers.host);
       // return res.redirect('http://' + req.headers.host + '/login/?redirect=' + fullUrl);
       //return res.redirect('http://' + req.headers.host + '/login');
       return;
 }
});

app.use('/auth', authRouter);
app.use('/', pageRouter);

app.use(bodyParser.json()); //요청의 본문을 해석해주는 미들웨어 1
app.use(bodyParser.urlencoded({ extended: true })); //요청의 본문을 해석해주는 미들웨어 2


// const oracleConfig = require('./config_oracle.js');
// const pgsqlConfig = require('./config_postgresql.js');



//데이터베이스 사용 방법 아래 API 참조
//ORACLE API https://oracle.github.io/node-oracledb/doc/api.html
//POSTGRES API https://node-postgres.com/api
//DB별 서비스별 klnet.owner.web\database\oracle\, klnet.owner.web\database\postgresql\ 위치에 파일 만들고 쿼리별 함수 선언
//위 함수를 해당 파일의 module에 module.exports 를 등록하여 사용
//get, post, put, delete 등 method 별로 exports한 함수를 맵핑하여 사용
//하위 예시 참조
//klnet.owner.web\database\oracle\template.js
//klnet.owner.web\database\postgresql\template.js 

//ORACLE API https://oracle.github.io/node-oracledb/doc/api.html
//POSTGRES API https://node-postgres.com/api



app.get("/pg/getTestSimple", dao.postgresql.getTestSimple);
app.post("/pg/getPortLocation",dao.postgresql.getPortLocation);
app.post("/pg/getPort",dao.postgresql.getPort);

app.get("/pg/getTestQuerySample", dao.postgresql.getTestQuerySample);
app.get("/pg/getTestQueryParamSample", dao.postgresql.getTestQueryParamSample);
app.post("/pg/getTestQueryAttibuteSample", dao.postgresql.getTestQueryAttibuteSample);
app.post("/api/getUserInfoSample", dao.postgresql.getUserInfoSample);

//app.get("/ora/getTestSimple", dao.oracle.getTestSimple);
app.get("/ora/getTestQuerySample", dao.oracle.getTestQuerySample);
//app.get("/ora/getTestQueryParamSample", dao.oracle.getTestQueryParamSample);
app.post("/ora/getTestQueryAttibuteSample", dao.oracle.getTestQueryAttibuteSample);

app.post("/api/snkMasterList", dao.postgresql.getSnkMasterList );
app.post("/api/kmdMasterList", dao.postgresql.getKmdMasterList );
app.post("/api/ymlMasterList", dao.postgresql.getYmlMasterList );


app.post("/api/getCarrierInfo", dao.schedule.getCarrierInfo);
app.post("/api/getScheduleList", dao.schedule.getScheduleList);
app.post("/api/getPortCodeInfo", dao.schedule.getPortCodeInfo);
app.post("/api/getScheduleDetailList", dao.schedule.getScheduleDetailList);
app.post("/api/getHotInfo", dao.tracking.getHotInfo);
app.post("/api/getTrackingList", dao.tracking.getTrackingList);


//에러 처리 미들웨어: error라는 템플릿 파일을 렌더링한다. 404에러가 발생하면 404처리 미들웨어에서 넣어준 값을 사용한다.
app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.use((err, req, res) => {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    res.status(err.status || 500);
    res.render('error');
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}`));
