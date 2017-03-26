var express = require('express');
var app = express();
var path = require('path');
var http = require('http').Server(app);
var io = require('socket.io')(http);

var clients = {};

app.use(express.static(path.join(__dirname, 'public')));

//Routes for basic html rendering
app.get('/', function(req, res){
  res.sendFile(__dirname + '/views/index.html');
});

app.get('/sendLocation', function(req, res){
  res.sendFile(__dirname + '/views/sendLocation.html');
});

app.get('/receiveLocation', function(req, res){
  res.sendFile(__dirname + '/views/receiveLocation.html');
});


//Whenever a new client connects
io.on('connection', function(socket){

  //add this client's socket id to clients object
  socket.on('addClient', function(name){
    for( var key in clients){
      if(clients[key] === socket.id){
        delete clients[key];
      }
    }
    if(!clients.hasOwnProperty(name)){
      clients[name] = socket.id;
      console.log("New client set");
      console.log(clients);
    }
  });

  //Remove the client's socket id on disconnection
  socket.on('disconnect', function () {
    for( var key in clients){
      if(clients[key] === socket.id){
        delete clients[key];
        console.log("One client removed");
        console.log(clients);
      }
    } 
  });

  socket.on('stopReceivingLocation', function(name){
  	if(clients[name]){
  		io.to(clients[name]).emit('stopSending');
  	}
  });

  socket.on('senderLocation', function(details){
  	io.to(clients[details.to]).emit('locationToReciever', details);
  });

});

http.listen(3000);