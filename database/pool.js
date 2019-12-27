// const pgsqldb = require('pg');

require('./pool_oracle.js');
const oracledb = require('oracledb');
const pgsqlPool = require('./pool_postgresql.js');

//oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;

// const oraclePool1 = oracledb.getPool();
// const oraPool = oracledb.getPool('oracle1');
// const oraclePool = await oracledb.getPool('oracle1');
// const oraclePool = oracledb.getPool('oracle1');
// const connection = await oracledb.getConnection();

// console.log(oraclePool);

//oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;

module.exports.oraclePool = oracledb
module.exports.pgsqlPool = pgsqlPool