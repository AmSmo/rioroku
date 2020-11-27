import { useEffect, useRef, useState} from "react";
import socketIOClient from "socket.io-client";

const SOCKET_SERVER_URL = `/`;



const useInfo = (roomId, username) => {
    const [userList, setUserList] = useState([])
    const [userCount, setUserCount] = useState([])
    const socketRef = useRef();
    
    useEffect(() => {
        socketRef.current = socketIOClient(SOCKET_SERVER_URL, {
            query: { roomId, username }
        });

        socketRef.current.on("channelInfo", data=>{ 
            setUserList(data)
            setUserCount(Object.values(data).flat().length)
        })

        return () => {
            socketRef.current.disconnect();
        };
    }, [roomId]);

    
    

    return ({ userList, userCount });
};


export { useInfo };