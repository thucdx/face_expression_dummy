var express = require('express');
var app = express();
var path = require('path');
var server = require('http').Server(app);
var io = require('socket.io')(server);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(__dirname+'/public'));

server.listen(3001);

app.get('/', function (req, res) {
  res.sendfile(__dirname + '/views/index.html');
});

io.on('connection', function (socket) {
	for (var i = 0; i <= 10; ++i) {
		setTimeout(function() {
			console.log('Blah blah blah blah extra-blah');
			socket.emit('news', { hello: 'world' });		
		}, 3000);
	}

  socket.on('my other event', function (data) {
    console.log(data);
  });
});