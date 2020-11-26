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
            console.log(Object.values(data).flat() )
            console.log(data["Act0"].length)
            setUserList(data)
            setUserCount(data)
        })

        return () => {
            socketRef.current.disconnect();
        };
    }, [roomId]);

    
    console.log(userList)

    return ({ userList, userCount });
};


export { useInfo };