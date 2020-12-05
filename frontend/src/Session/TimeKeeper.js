import React, {useState, useEffect} from 'react'
import {connect} from 'react-redux'
import {useTimer} from '../actions/timerInfo'
import { currentClock } from '../actions/index'

import { logout } from '../actions/session_actions'
import {withRouter} from 'react-router-dom'



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

    if(props.track==="A"){
        switch (true){
            case localTime < 20:
                props.changeAct(1);
                break;
            case localTime < 40:
                props.changeAct(2)
                break;
            case localTime < 60:
                props.changeAct(3)
                break;
            case localTime < 80:
                props.changeAct(4)
                break;
            case localTime < 100:
                props.changeAct(5)
                break;
            default:
                break;
        }
            
    } else if (props.track === "B") {
        switch (true) {
            case localTime < 20:
                props.changeAct(1);
                break;
            case localTime < 40:
                props.changeAct(2)
                break;
            case localTime < 60:
                props.changeAct(3)
                break;
            case localTime < 80:
                props.changeAct(4)
                break;
            case localTime < 100:
                props.changeAct(5)
                break;
            default:
                break;
        } 
    }else if (props.track === "C") {
            switch (true) {
                case localTime < 20:
                    props.changeAct(1);
                    break;
                case localTime < 40:
                    props.changeAct(2)
                    break;
                case localTime < 60:
                    props.changeAct(3)
                    break;
                case localTime < 80:
                    props.changeAct(4)
                    break;
                case localTime < 100:
                    props.changeAct(5)
                    break;
                default:
                    break;
            }
    } else if (props.track === "D") {
        switch (true) {
            case localTime < 20:
                props.changeAct(1);
                break;
            case localTime < 40:
                props.changeAct(2)
                break;
            case localTime < 60:
                props.changeAct(3)
                break;
            case localTime < 80:
                props.changeAct(4)
                break;
            case localTime < 100:
                props.changeAct(5)
                break;
            default:
                break;
        }
    } else if (props.track === "E") {
        switch (true) {
            case localTime < 20:
                props.changeAct(1);
                break;
            case localTime < 40:
                props.changeAct(2)
                break;
            case localTime < 60:
                props.changeAct(3)
                break;
            case localTime < 80:
                props.changeAct(4)
                break;
            case localTime < 100:
                props.changeAct(5)
                break;
            default:
                break;
        }
    }
    return (
        <></>
    )
}



const mapStateToProps = state => {
    return state
}


export default withRouter(connect(mapStateToProps, {currentClock, logout})(TimeKeeper))
