const pool = require('./pool.js');

module.exports.oracle = require('./oracle/template.js');
module.exports.schedule = require('./oracle/schedule.js');
module.exports.postgresql = require('./postgresql/template.js');
// module.exports = require('./postgresql/template.js');
