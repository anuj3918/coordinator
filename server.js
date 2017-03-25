var express = require('express');
var app = express();
var path = require('path');
var http = require('http').Server(app);
var io = require('socket.io')(http);

var clients = {}

app.get('/', function(req, res){
  res.sendfile('index.html');
});

app.get('/sendLocation', function(req, res){
  res.sendfile('sendLocation.html');
});

app.get('/receiveLocation', function(req, res){
  res.sendfile('receiveLocation.html');
});

app.use(express.static(path.join(__dirname, 'public')));

//Whenever someone connects this gets executed
io.on('connection', function(socket){
  console.log('A new user connected with id : '+ socket.id);
  
  socket.on('addClient', function(name){
  	clients[name] = socket.id;
  	console.log("Clients object is :");
  	console.log(clients);
  })

  socket.on('stopReceivingLocation', function(name){
  	console.log("Stopping from server side");
  	if(clients[name]){
  		io.to(clients[name]).emit('stopSending');
  		console.log('Emitted stop event to sender');
  	}
  	
  	console.log("Clients object is :");
  	console.log(clients);
  })


  socket.on('senderLocation', function(details){
  	io.to(clients[details.to]).emit('locationToReciever', details);
  })

  //Whenever someone disconnects this piece of code executed
  socket.on('disconnect', function () {
    console.log('A user disconnected');
    delete clients[socket.id];
  });

});

http.listen(3000, function(){
  console.log('listening on *:3000');
});