import { useEffect, useRef, useState} from "react";
import socketIOClient, { io } from "socket.io-client";



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
            let userArray = Object.values(data).flat()
            let allUsers = userArray.filter(user=>{
                if(user){
                return user !== "undefined" && user.startsWith("control")}

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