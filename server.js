const express = require('express')
const port = process.env.PORT || 8080;
const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server, {
    cors: {
      origin: '*',
    }
  });

server.listen(port);
const path = require('path')
app.use(express.static(path.join(__dirname, 'assets')));
app.get('/', function(req, res){
  res.render('index')
})
var currentlyOnline = new Array();
io.on('connection', socket =>{
  
  socket.on('disconnect', () =>{ 
    if(currentlyOnline.indexOf(socket.userName)>-1){
      currentlyOnline.splice(currentlyOnline.indexOf(socket.userName),1)
      io.emit('curConnected', currentlyOnline);
    }
  });
  socket.on('updateList', userName =>{
    socket.userName=userName;
    currentlyOnline.push(socket.userName)
    io.emit('curConnected', currentlyOnline)
  })
});
