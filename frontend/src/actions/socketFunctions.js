import { useEffect, useRef, useState } from "react";
import socketIOClient from "socket.io-client";

const NEW_CHAT_MESSAGE_EVENT = "newChatMessage"; 
const SOCKET_SERVER_URL = `/`;



const useChat = (roomId, username) => {
    const [messages, setMessages] = useState([]); 
    const [stageTime, setStageTime] = useState("0")
    const socketRef = useRef();
    
    useEffect(() => {
        socketRef.current = socketIOClient(SOCKET_SERVER_URL, {
            query: { roomId, username }
        });

        

        socketRef.current.on(NEW_CHAT_MESSAGE_EVENT, (message) => {
            
            const incomingMessage = {
                ...message,
                ownedByCurrentUser: message.senderId === socketRef.current.id,
            };
            console.log(incomingMessage)
            setMessages((messages) => [...messages, incomingMessage]);
        });

        socketRef.current.on("changeTime", (time) => {
            setStageTime(time.body)
        })

        return () => {
            socketRef.current.disconnect();
        };
    }, [roomId]);

    const sendMessage = (messageBody) => {
        socketRef.current.emit(NEW_CHAT_MESSAGE_EVENT, {
            body: messageBody,
            senderId: socketRef.current.id,
        });
    
        
    };

    const changeStageTime = (time) => {
        socketRef.current.emit("changeTime",{
            body: time
        })
    }

    

    return { messages, sendMessage, stageTime, changeStageTime };
};


export {useChat};