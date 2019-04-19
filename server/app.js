// --- INIT DEPENDENCIES
let express = require('express'),
    app = express(),
    path = require('path');

// --
let http = require('http').Server(app);
let io = require('socket.io')(http);

app.use('/js/', express.static(path.join(__dirname, '/js/' )))
// ------------------------
// ROUTE
// ------------------------
app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'../main.html'))
    console.log(path.join(__dirname, '/js/' ));
    
});

// ------------------------
//
// ------------------------
io.on('connection', function(socket){

    console.log('a user connected');

    socket.on('disconnect', function(){
        console.log('user disconnected');
    });

    socket.on('message', function(message){
        console.log(message);
        io.emit('cool', message);
    });

    socket.broadcast.emit('hi');

});

// ------------------------
// START SERVER
// ------------------------
http.listen(3030,function(){
    console.info('HTTP server started on port 3030');
});