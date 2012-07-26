var socket = {
	init: function(){
		socket.connection = io.connect('http://' + window.location.hostname+ ':2998');
		socket.connection.on('ping', function(data){
			console.log('Received ping from server');
			socket.connection.emit('pong', {});
		});
		socket.connection.on('data:add', function(data){
			socket.data.onAdd(data.collectionName, data.data);
		});
		socket.connection.on('data:remove', function(data){
			socket.data.onRemove(data.collectionName, data.data);
		});
		socket.connection.on('data:change', function(data){
			socket.data.onChange(data.collectionName, data.data);
		});
		/*socket.connection.on('dataSyncBack', function(collection, data){

		});*/
	},
	data : {
		onAdd : null,
		onRemove : null,
		onChange : null,
		add : function(collectionName, data) {
			this.sync(collectionName, data, 'add');
		},
		remove : function(collectionName, data) {
			this.sync(collectionName, data, 'remove');
		},
		change : function(collectionName, data) {
			this.sync(collectionName, data, 'change');
		},
		sync : function(collectionName, data, method){
			socket.connection.emit('data:' + method, {
				collectionName: collectionName,
				data: data
			});
		}
	}
};

socket.init();
