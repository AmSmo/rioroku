import React, {useState, useEffect} from 'react'
import {connect} from 'react-redux'
import {useTimer} from '../actions/timerInfo'
import { currentClock } from '../actions/index'
import {Menu} from 'semantic-ui-react'
import { logout } from '../actions/session_actions'
import {withRouter} from 'react-router-dom'
import { Modal } from 'semantic-ui-react'


function TimeKeeper (props){
    const [localTime, setLocalTime] = useState(-1)
    const { browserTimer, getTimer } = useTimer()



    useEffect(() => {
        let interval = null;
        if (browserTimer.accurate === "set" && browserTimer.rolling) {
            browserTimer.accurate = false
            currentClock(browserTimer.timer + 1)
            return setLocalTime(browserTimer.timer + 1)
        }
        if (browserTimer.accurate === "get" && browserTimer.rolling) {
            browserTimer.accurate = false
            setLocalTime(browserTimer.timer + 1)
            currentClock(localTime)
        }
        if (browserTimer.rolling) {
            interval = setInterval(() => {
                setLocalTime(localTime => (localTime + 1))
            }, 1000);
            currentClock(localTime)
            browserTimer.accurate = false
        } else {
            setLocalTime(browserTimer.timer || -1)
            currentClock(localTime)
            browserTimer.accurate = false
        }
        return () => {
            clearInterval(interval)
            currentClock(localTime)
        };
    }, [localTime, browserTimer, props]);
    useEffect(()=>{
        getTimer()
    }, [])
    let updatedTime = new Date(localTime === -1? 0: localTime * 1000).toISOString().substr(11, 8);

    if(localTime === 0 && props.match.path != "/"){
        props.history.push("/")
    }
    if(localTime > 40 && localTime < 50 && props.match.path === "/TrackA"){
        props.history.push("/TrackA2")
    }


    return (
        <></>
        // <Menu style={{ marginBottom: "0px" }}>


        //     <Menu.Item className="fade-in" >{updatedTime}</Menu.Item>

        //     {props.api.isAuthenticated ?
        //         <Menu.Item
        //             side="right"
        //             onClick={(e) => {
        //                 e.preventDefault()
        //                 props.logout()
        //             }}

        //         >
        //             Log Out
        //         </Menu.Item>
        //         :
        //         null}

        //   </Menu>
    )
}



const mapStateToProps = state => {
    return state
}


export default withRouter(connect(mapStateToProps, {currentClock, logout})(TimeKeeper))
