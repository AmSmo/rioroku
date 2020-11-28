const { Console } = require('console');

module.exports = (function (app, port) {
    const server = require('http').createServer(app);
    let timer = 0
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
    let timerInterval
    io.on("connection", (socket) => {

        const { roomId, username } = socket.handshake.query;
        socket.join(roomId);
        let channelArray = library[roomId]
        
        if (channelArray) {
            channelArray.push(username)
            let unique = [...new Set(channelArray)]
            library[roomId] = unique
        } else {
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

        const startTimer = () => {
            
            timerInterval = setInterval(() => {
                timer = timer + 1
            }, 1000)
            io.sockets.emit("startBrowserTimer", { data: { timer, rolling: true, accurate: true } })
        }
        const getTimer = () => {
            let rolling
            if (timerInterval && timerInterval._destroyed){
                rolling = false
            }else{
                rolling = true
            }
            io.sockets.emit("getBrowserTimer", { data: { timer, rolling, accurate: true } })
        }

        const resetTimer = () => {
            clearInterval(timerInterval)
            delete (timerInterval)
            timer = 0
            io.sockets.emit("resetBrowserTimer", { data: { timer, rolling: false, accurate: true } })
        }

        const pauseTimer = () => {
            clearInterval(timerInterval)
            delete(timerInterval)
            io.sockets.emit("pauseBrowserTimer", { data: { timer, rolling: false, accurate: true } })
        }

        const setTimer = (newTime) => {
            timer = newTime
            io.sockets.emit("setBrowserTimer", { data: { timer, rolling: false, accurate: true } })
        }

        socket.on("getTimer", (data)=>{
            
            getTimer()
        })

        socket.on("startTimer", (data) => {
            startTimer()
        })
        socket.on("pauseTimer", (data) => {
            pauseTimer()
            
        })

        socket.on("setTimer", (data) => {
            setTimer(data.body.newTimer)
            
        })
        
        if (timer > 7800) {
            resetTimer()
        }
 
        socket.on("resetTimer", data => {
           resetTimer()
        })

        socket.on("disconnect", () => {
            library[roomId] = library[roomId].filter(online => online !== username)
            socket.emit("channelInfo", library)
            socket.leave(roomId);
        });
    })


}
)