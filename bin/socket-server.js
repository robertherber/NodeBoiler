var socket = require('socket.io'),
	logger = require('./Helpers/logger'),
	blog = require('./Logic/blog'),
	config = require('./Config/socket-server.config');

logger.addLogFile(config.logFileName);
logger.info('Starting socket server');

var server = socket.listen(config.port);

var uid = 0;

server.sockets.on('connection', function(socket){
	console.log('Pinging new client');
	socket.emit('ping', {});
	socket.on('pong', function(data){
		console.log('Received pong from client, everythings OK!');
	});
	socket.on('data:add', function(data){
		data.data.uid = uid++;
		socket.broadcast.emit('data:add', data);
		socket.emit('data:change', data);
	});
	socket.on('data:remove', function(data){
		socket.broadcast.emit('data:remove', data);
	});
	socket.on('data:change', function(data){
		socket.broadcast.emit('data:change', data);
	});
});

logger.info('Websocket server listening at port ' + config.port);

