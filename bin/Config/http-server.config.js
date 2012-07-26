var path = require('path');

module.exports = {
	port : 3001,
	staticDir : path.normalize( __dirname + '/../../public'),
	logFileName : 'http-server.log'
};
