import React, { useEffect, useState } from 'react';
import {ChannelContainer, HelpQueue, InteriorQueue} from '../Styles/Styles'
import { connect } from 'react-redux'
import { useHelp } from '../actions/helpFunctions'
import { useInfo } from '../actions/channelInfo'
import UserList from '../Chat/UserList'
import HelpItem from './HelpItem'
import {useTimer} from '../actions/timerInfo'
import { Dropdown } from 'semantic-ui-react';
function HelpDesk(props) {


    const { messages, sendMessage, deleteMessage} = useHelp()
    const { userList, userCount} = useInfo("admin", props.username)
    const {setTimer, startTimer, resetTimer, pauseTimer, browserTimer, getTimer} = useTimer()
    const [disable, setDisable] = useState(true)
    const [showMinutes, setShowMinutes] = useState(0)
    const [showSeconds, setShowSeconds] = useState(0)
    const [localTime, setLocalTime] = useState(0)
    

    console.log(browserTimer)

    useEffect(() =>{
        renderChannels()
    }, [userList])
    const displayMessages = () => {
        return messages.map((message, idx) => {
            return (
                <>
                    <HelpItem message={message} key={idx} deleteMessage={deleteMessage}/>
                </>)
        })
    }
    const renderChannels = () =>{
        delete userList.help
        delete userList.admin
        return (Object.keys(userList)).map(channel =>{
            let users = userList[channel]
            if (users && users.length >0 && !channel.startsWith("Help")){
                return <UserList control users={users} roomId={channel} />
            }
    })}

    const handleChange = (e) =>{
        switch(e.target.name){
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
    return (

            <div>
                <button onClick={()=> setDisable(!disable)}>Toggle Timer Changes</button>
                <button onClick={()=> {
                    return startTimer()}} disabled={disable} >Start Timer</button>
                <button onClick={() => {
                    console.log(localTime)
                    pauseTimer()}} disabled={disable}>Pause Timer</button>
                <button onClick={() => resetTimer()} disabled={disable}>Reset Timer</button>
                <button onClick={() => getTimer()} >Get Timer</button>
                
            <input type="number" min="0" max="200" name="showMinutes" disabled={disable} value={showMinutes} onChange={handleChange} /> 
                <label for="minutes">Minutes</label>
                <input type="number" min="0" max="59" name="showSeconds" disabled={disable} value={showSeconds} onChange={handleChange} /> 
                <label for="minutes">Seconds</label>
                <button onClick={() => setShowTimer()} disabled={disable}>Set Timer</button>
                <HelpQueue>
                    <InteriorQueue>
                        <h2>Help Queue</h2>
                        {displayMessages()}
                    </InteriorQueue>
                </HelpQueue>

                <ChannelContainer>
                    <div style={{marginRight: "10px"}}>
                    <h2>Active Rooms</h2>
                    <p>Total Users: {userCount}</p>
                    </div>
                
                    {renderChannels()}
                </ChannelContainer>
            </div>


    )

}
const mapStatetoProps = state => {
    if (state.api.user) {
        return { username: state.api.user.username, loggedIn: state.api.isAuthenticated }
    }
    else {
        return { username: localStorage.getItem("username"), loggedIn: true }
    }
}


export default connect(mapStatetoProps)(HelpDesk);