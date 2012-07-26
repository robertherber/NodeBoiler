var winston = require('winston');

var logger = new (winston.Logger)({
    transports: [
      new (winston.transports.Console)({ level: 'debug'})
    ]
  });

exports.info = function(message) {
	logger.info(message);
};
exports.warn = function(message) {
	logger.warn(message);
};
exports.error = function(message) {
	logger.error(message);
};
exports.addLogFile = function(path){
	logger.add(winston.transports.File, { filename: path, level: 'info' });
};
