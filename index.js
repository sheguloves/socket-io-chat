var express = require("express");
var app = express();
var http = require("http").Server(app);

var io = require("socket.io")(http);

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.use(express.static(__dirname + '/bower_components'));

io.on('connection', function(socket) {
    console.log('a user connected');

    socket.on('chat messages', function(msg) {
        console.log('message: ' + msg);
        io.emit('chat messages', msg);
    })

    socket.on('disconnect', function() {
        console.log('user disconnected');
    });
});

http.listen(3000, function() {
    console.log('listening on *:3000');
})