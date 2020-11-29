import React, { useState, useEffect } from 'react'
import { Menu } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { changeActive, currentClock, resetClock } from '../actions'
import { logout } from '../actions/session_actions'
import { withRouter } from 'react-router-dom'
import { useTimer } from '../actions/timerInfo'



function ShowController(props) {
    const [localTime, setLocalTime] = useState(0)
    const [isActive, setIsActive] = useState(false);
    const [disable, setDisable] = useState(true)
    const [showMinutes, setShowMinutes] = useState(0)
    const [showSeconds, setShowSeconds] = useState(0)
    let [truth, setTruth] = useState(false)
    const { setTimer, startTimer, resetTimer, pauseTimer, browserTimer, getTimer } = useTimer()
    let updatedTime = new Date(localTime * 1000).toISOString().substr(11, 8);
    
    browserTimer.changed = false
    
    useEffect(() => {
        let interval = null;
        if (browserTimer.rolling) {
            interval = setInterval(() => {
                setLocalTime(localTime => (localTime + 1))
            }, 1000);
        } else if (!browserTimer.rolling && localTime !== 0) {
            clearInterval(interval);
        }
        return () => {
            console.log("RETURNING")
            clearInterval(interval)};
    }, [isActive, localTime, browserTimer]);

    
    
    const handleChange = (e) => {
        switch (e.target.name) {
            case "showMinutes":
                setShowMinutes(e.target.value)
                break;
            case "showSeconds":
                setShowSeconds(e.target.value)
                break;
            default:
                break;
        }
    }
    const setShowTimer = () => {
        setTimer(showMinutes, showSeconds)
    }
    console.log(localTime)
    if (browserTimer.accurate){
        setTruth(true)
        browserTimer.accurate = false
        browserTimer.change = true
     }
    
    if (truth){
        console.log("local", localTime,browserTimer.timer)
        if (localTime !== browserTimer.timer){
            console.log("NOT TRUE")
            setLocalTime(browserTimer.timer)
        }
        if (browserTimer.rolling !== isActive) {
            
            setIsActive(browserTimer.rolling)
        }
    }
    
    return (
        <Menu style={{ marginBottom: "0px" }}>
                <Menu.Item
                    name='control-toggle'
                    onClick={() => {
                        return setDisable(disable => !disable)
                    }}
                >
                    Toggle Time Controls
                </Menu.Item>
            <Menu.Item
                name='start-clock'
                onClick={() => {
                    startTimer()
                    props.changeActive('start-clock')
                }}
                disabled = { disable? true : false }
                active={props.game.active === 'start-clock'}
            >
                Start Clock
                </Menu.Item>
                <Menu.Item
                    name='stop-clock'
                    onClick={() => {
                        pauseTimer()
                        props.changeActive('stop-clock')
                    }}
                    active={props.game.active === 'stop-clock'}
                    disabled={disable? true: false}
                >
                    Stop Clock
                </Menu.Item>

                <Menu.Item>{localTime}</Menu.Item>
                <Menu.Item
                    name='reset-clock'
                    onClick={() => {
                        resetTimer()
                        props.changeActive('reset-clock')
                        props.resetClock()

                    }}
                    active={props.game.active === 'reset-clock'}
                    disabled={disable ? true : false}
                >
                    Reset Clock
                </Menu.Item>
                <Menu.Item>
                    <input type="number" min="0" max="200" name="showMinutes" disabled={disable} value={showMinutes} onChange={handleChange} /> 
                    <label for="minutes">Minutes</label>
                    <input type="number" min="0" max="59" name="showSeconds" disabled={disable} value={showSeconds} onChange={handleChange} /> 
                    <label for="minutes">Seconds</label>
                    <button onClick={() => setShowTimer()} disabled={disable}>Set Timer</button>
                </Menu.Item>
                <Menu.Item
                    name='server-check'
                    onClick={() => {
                        getTimer()
                    }}
                >
                    Server Time Check
                </Menu.Item>
            <Menu.Item>ServerTime{new Date((browserTimer.timer || 0) * 1000).toISOString().substr(11, 8)}</Menu.Item>
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

export default withRouter(connect(mapStateToProps, { changeActive, currentClock, resetClock, logout})(ShowController))