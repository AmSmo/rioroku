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

io.on("connection", (socket) => {
    const { roomId } = socket.handshake.query;
    socket.join(roomId);

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
        socket.leave(roomId);
    });
})


}
)