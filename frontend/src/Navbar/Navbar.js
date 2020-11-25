import React, {useState, useEffect} from 'react'
import {Menu} from 'semantic-ui-react'
import { connect } from 'react-redux'
import { changeActive, currentClock, resetClock} from '../actions'
import {logout} from '../actions/session_actions'

import {withRouter} from 'react-router-dom'
function NavBar(props){
    const [time, setTime] = useState(0)
    const [isActive, setIsActive] = useState(false);
    
    useEffect((e) => {
        let {currentClock} = props
        let interval = null;
        if (isActive) {
            interval = setInterval(() => {
                setTime(time => (time + 1));
                currentClock(time)
            }, 1000);
        } else if (!isActive && time !== 0) {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [isActive, time, props]);
    
    
    
    let updatedTime = new Date(time * 1000).toISOString().substr(11, 8);
    
   
    
        return (
            <Menu style={{marginBottom: "0px"}}>
                <Menu.Item
                    name='start-clock'
                    onClick={() => {
                        setIsActive(true)
                        props.changeActive('start-clock')}}
                    active={props.game.active === 'start-clock'}
                >
                    Start Clock
                </Menu.Item>
                <Menu.Item
                    name='stop-clock'
                    onClick={() => {
                        setIsActive(false)
                        props.changeActive('stop-clock')}}
                    active={props.game.active === 'stop-clock'}
                >
                    Stop Clock
                </Menu.Item>
                
                <Menu.Item>{updatedTime}</Menu.Item>
                <Menu.Item
                    name='reset-clock'
                    onClick={() => {
                        setIsActive(false)
                        setTime(0)
                        props.changeActive('reset-clock')
                        props.resetClock()

                    }}
                    active={props.game.active === 'reset-clock'}
                >
                    Reset Clock
                </Menu.Item>
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

const mapStateToProps = state =>{
    return state
}

export default withRouter(connect( mapStateToProps, {changeActive, currentClock, resetClock, logout})(NavBar))