let express = require('express');
let app = express();
let http = require('http');
let server = http.Server(app);

let socketIO = require('socket.io');
let io = socketIO(server);

const port = process.env.port || 3000 ;
server.listen(port,()=>{
    console.log(`Server started on port ${port}`)
})

io.on('connection',(socket)=>{
    socket.on('join',(data)=>{
        socket.join(data.room)
        socket.broadcast.to(data.room).emit('User Created Successfully')
    })

    socket.on('message',(data)=>{
        socket.join(data.room)
        socket.broadcast.to(data.room).emit('Message Sent Successfully', {user : data.user, message : data.message})
    })
})