const express = require('express');
const http = require('http');
const socketio = require('socket.io');

const PORT = 3030 || process.env.PORT;
const index = require("./routes/index");

const app = express();
app.use(index);

//create a server, pass in the express app (needed for socket.io)
const server = http.createServer(app);
const io = socketio(server);

let interval;

// Run when client connects 
io.on('connection', (socket) => {
    console.log('New Connection...');
    /*
    all the real time clock stuff delete this in the future. 

    this makes it so that it only runs on one page 
    if (interval) {
        clearInterval(interval);
    }
    interval = setInterval(() => getApiAndEmit(socket), 1000);
    socket.on("disconnect", () => {
      console.log("Client disconnected");
      clearInterval(interval);
    });
    */


    
    //When we get the GamePos console log it and 
    //reemit it to everyone (in the future change to emit to
    // only the other player)
    socket.on('GameDat', (gameData) => {
        console.log(gameData.sqr)
        socket.broadcast.emit("GameDat", gameData);
    });
});





//Takes socket as an argument, and emits the message "FromAPI" 
// which will contain the timestamp
const getApiAndEmit = socket =>  {
    const response = new Date();
    // emitting a new message. Will be consumed by the client 
    // ( this message can be intercepted by socket.io fronend client)
    socket.emit("FromAPI" , response);
};

//listen for incoming connections 
server.listen(PORT, () => console.log('Server running on port: '+ PORT));