const pool = require('./pool.js');

module.exports.oracle = require('./oracle/template.js');
module.exports.schedule = require('./oracle/schedule.js');
module.exports.tracking = require('./oracle/tracking.js');
module.exports.postgresql = require('./postgresql/template.js');
module.exports.pgtracking = require('./postgresql/tracking.js');
// module.exports = require('./postgresql/template.js');
