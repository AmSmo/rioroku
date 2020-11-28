import { useEffect, useRef, useState } from "react";
import socketIOClient, { io } from "socket.io-client";

const START_TIMER = "startTimer"
const PAUSE_TIMER = "pauseTimer"
const SET_TIMER = "setTimer"
const RESET_TIMER = "resetTimer"
const GET_TIMER = "getTimer"
const SOCKET_SERVER_URL = `/`;

const useTimer = () => {
    let [browserTimer, setBrowserTimer] = useState({timer: 0, rolling:false, accurate: false})
    const socketRef = useRef();

    useEffect(() => {
        socketRef.current = socketIOClient(SOCKET_SERVER_URL, {
            query: {roomId:"Help"}
        });

        socketRef.current.on("startBrowserTimer", (data) => {
            setBrowserTimer(data)
        });
        socketRef.current.on("resetBrowserTimer", (data) => {
            setBrowserTimer(data)
        });
        socketRef.current.on("pauseBrowserTimer", (data) => {
            setBrowserTimer(data)
        });
        socketRef.current.on("setBrowserTimer", (data) => {
            setBrowserTimer(data)
        });
        
        socketRef.current.on("getBrowserTimer", (data) => {
            setBrowserTimer(data)
        });

        return () => {
            socketRef.current.disconnect();
        };
    }, []);

    const startTimer = () => {
        socketRef.current.emit(START_TIMER, true)
    }

    const setTimer = (minutes, seconds) => {
        let intoSeconds = (parseInt(minutes)  * 60) + parseInt(seconds)
        socketRef.current.emit(SET_TIMER, {body:{newTimer: intoSeconds }})
    }

    const getTimer = () =>{
        socketRef.current.emit(GET_TIMER)
    }
    const pauseTimer = () => {
        socketRef.current.emit(PAUSE_TIMER)
    }

    const resetTimer = () => {
        socketRef.current.emit(RESET_TIMER)
    }

    

    return ({ startTimer, setTimer, resetTimer, pauseTimer, browserTimer, getTimer });
};


export { useTimer };