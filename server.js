const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = process.env.PORT || 5000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// const oracleConfig = require('./config_oracle.js');
// const pgsqlConfig = require('./config_postgresql.js');

const dao = require('./database/');


// console.log("oraclePool:" + oraclePool);
// console.log("oracledb:" + oracledb);

app.get("/ora/getTestSimple", dao.oracle.getTestSimple);
app.get("/ora/getTestQuerySample", dao.oracle.getTestQuerySample);
app.get("/pg/getTestSimple", dao.postgresql.getTestSimple);
app.get("/pg/getTestQuerySample", dao.postgresql.getTestQuerySample);
app.get("/pg/getTestQueryParamSample", dao.postgresql.getTestQueryParamSample);

app.listen(port, () => console.log(`Listening on port ${port}`));
