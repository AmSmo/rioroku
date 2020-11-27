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
            delete data.help
            delete data.admin
            let allUsers = Object.values(data).flat().filter(user=>{
                return !user.startsWith("control") && user !== "undefined"
            })
            
            setUserCount(allUsers.length)
        })

        return () => {
            socketRef.current.disconnect();
        };
    }, [roomId]);

    
    

    return ({ userList, userCount });
};


export { useInfo };