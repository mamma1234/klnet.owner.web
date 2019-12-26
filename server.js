const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = process.env.PORT || 5000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


const dao = require('./database/');

// ORACLE API https://oracle.github.io/node-oracledb/doc/api.html
// POSTGRES API https://node-postgres.com/api


app.get("/pg/getTestSimple", dao.postgresql.getTestSimple);
app.get("/pg/getTestQuerySample", dao.postgresql.getTestQuerySample);
app.get("/pg/getTestQueryParamSample", dao.postgresql.getTestQueryParamSample);
app.get("/ora/getTestSimple", dao.oracle.getTestSimple);
app.get("/ora/getTestQuerySample", dao.oracle.getTestQuerySample);
app.get("/ora/getTestQueryParamSample", dao.oracle.getTestQueryParamSample);

app.listen(port, () => console.log(`Listening on port ${port}`));
