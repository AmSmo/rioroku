module.exports = (function(app, port){
    const server = require('http').createServer(app);
const options = {
        cors: {
            origin: '*',
        }
    };
const io = require('socket.io')(server, options); 
const NEW_CHAT_MESSAGE_EVENT = "newChatMessage";
const NEW_HELP_MESSAGE_EVENT = "newHelpMessage";
    server.listen(port);
const library = {}
io.on("connection", (socket) => {
    const { roomId, username } = socket.handshake.query;
    
    
    socket.join(roomId);
    let channelArray = library[roomId]
    // array.push(username)
    if (channelArray){
        channelArray.push(username)
        library[roomId] = channelArray
    }else{
        library[roomId] = [username]
    }
    io.sockets.emit("channelInfo", library)
    // Listen for new messages
    socket.on(NEW_CHAT_MESSAGE_EVENT, (data) => {
        
        io.in(roomId).emit(NEW_CHAT_MESSAGE_EVENT, data);
        
    });
    socket.on(NEW_HELP_MESSAGE_EVENT, (data) => {
        io.in("help").emit(NEW_HELP_MESSAGE_EVENT, data);
    });

    socket.on("changeTime", (data)=>{
        io.in(roomId).emit("changeTime", data)
    })

    // Leave the room if the user closes the socket
    socket.on("disconnect", () => {
        
        library[roomId] = library[roomId].filter(online => online !== username)
        socket.emit("channelInfo", library)
        socket.leave(roomId);
        
        io.sockets.emit("channelInfo", library)
    });
})


}
)