var express = require('express'),
	lessMiddleware = require('less-middleware');

var config = require('./Config/http-server.config');

var app = express.createServer();

app.configure(function(){
	app.use(lessMiddleware({ src: config.staticDir, compress: true }));
    app.use(express.static(config.staticDir));
});

app.listen(config.port);

console.log('Server listening at port ' + config.port);
