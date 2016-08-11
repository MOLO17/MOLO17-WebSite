var config = require('./config/config');
module.exports = config["lc_"+process.env.NODE_ENV];

module.exports.title = (config.title || "")
module.exports.version = (config.version || "")
module.exports.copyright = (config.copyright || "")