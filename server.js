const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = process.env.PORT || 5000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// const oracleConfig = require('./config_oracle.js');
// const pgsqlConfig = require('./config_postgresql.js');

const dao = require('./database/');

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
app.get("/pg/getTestQuerySample", dao.postgresql.getTestQuerySample);
app.get("/pg/getTestQueryParamSample", dao.postgresql.getTestQueryParamSample);
app.post("/pg/getTestQueryAttibuteSample", dao.postgresql.getTestQueryAttibuteSample);
app.post("/api/getUserInfoSample", dao.postgresql.getUserInfoSample);

//app.get("/ora/getTestSimple", dao.oracle.getTestSimple);
//app.get("/ora/getTestQuerySample", dao.oracle.getTestQuerySample);
//app.get("/ora/getTestQueryParamSample", dao.oracle.getTestQueryParamSample);
//app.post("/ora/getTestQueryAttibuteSample", dao.oracle.getTestQueryAttibuteSample);

app.post("/api/snkMasterList", dao.postgresql.getSnkMasterList );
app.post("/api/kmdMasterList", dao.postgresql.getKmdMasterList );
app.post("/api/ymlMasterList", dao.postgresql.getYmlMasterList );


app.post("/api/getCarrierInfo", dao.oracle.getCarrierInfo);
app.post("/api/getScheduleList", dao.oracle.getScheduleList);
app.post("/api/getPortCodeInfo", dao.oracle.getPortCodeInfo);
app.post("/api/getScheduleDetailList", dao.oracle.getScheduleDetailList);

app.listen(port, () => console.log(`Listening on port ${port}`));
