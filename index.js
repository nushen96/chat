var express = require('express');
var socket = require('socket.io');

//App setup
var app = express();
var server = app.listen(8081, function() {
	console.log('listening to requests on port 8081')
});

//Static files
app.use(express.static('public'));

//Socket setup
var io = socket(server);

io.on('connection', function(socket) {
	console.log('made socket connection', socket.id)
	socket.on('chat', function(data) {
		console.log('Message :\''+data.message+'\' sent by '+data.pseudo)
		io.sockets.emit('chat', data);
	});

	socket.on('typing', function(data) {
		socket.broadcast.emit('typing', data)
	})
});