const oracledb = require('oracledb');
const pgsqldb = require('pg');

const pgsqlPool = require('./pool_postgresql.js');
const oraclePool = require('./pool_oracle.js');


// const oraPool = oracledb.getPool('oracle1');


module.exports.oraclePool = oraclePool
module.exports.pgsqlPool = pgsqlPool
