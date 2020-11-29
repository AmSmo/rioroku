import React, {useState, useEffect} from 'react'
import {connect} from 'react-redux'
import {useTimer} from '../actions/timerInfo'
import { currentClock } from '../actions/index'
import {Menu} from 'semantic-ui-react'
function TimeKeeper (props){
    const [localTime, setLocalTime] = useState(-1)
    const { browserTimer, getTimer } = useTimer()
    

    useEffect(() => {
        let interval = null;
        console.log("used", browserTimer)
        if (browserTimer.accurate === "set" && browserTimer.rolling) {
            browserTimer.accurate = false
            return setLocalTime(browserTimer.timer + 1)
        }
        if (browserTimer.accurate === "get" && browserTimer.rolling) {
            browserTimer.accurate = false
            setLocalTime(browserTimer.timer + 1)
        }
        if (browserTimer.rolling) {
            interval = setInterval(() => {
                setLocalTime(localTime => (localTime + 1))
            }, 1000);
            browserTimer.accurate = false
        } else {
            setLocalTime(browserTimer.timer || -1)
            browserTimer.accurate = false
        }
        return () => {
            clearInterval(interval)
        };
    }, [localTime, browserTimer, props]);

    useEffect(()=>{
        getTimer()
    }, [])
    let updatedTime = new Date(localTime === -1? 0: localTime * 1000).toISOString().substr(11, 8);



    return (
        <Menu style={{ marginBottom: "0px" }}>


            <Menu.Item>{updatedTime}</Menu.Item>

            {props.api.isAuthenticated ?
                <Menu.Item
                    side="right"
                    onClick={(e) => {
                        e.preventDefault()
                        props.logout()
                    }}

                >
                    Log Out
                </Menu.Item>
                :
                null}
        </Menu>
    )
}



const mapStateToProps = state => {
    return state
}


export default connect(mapStateToProps, {currentClock})(TimeKeeper)