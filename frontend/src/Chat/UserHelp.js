import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux'
import {useHelp} from'../actions/helpFunctions'
import {HelpArea} from '../Styles/Styles'
import Chat from './Chat'
import {Icon} from 'semantic-ui-react'

function UserHelp(props){
    const { messages, sendMessage } = useHelp(props.username)
    const [newMessage, setNewMessage] = useState(props.time.toLocaleTimeString())
    const [myHelp, setMyHelp] = useState(false)
    const handleSendMessage = ()=>{
        sendMessage(props.username + ": " + newMessage)
        setNewMessage("")
        setMyHelp(true)
    }


    useEffect(()=>{
        handleSendMessage()
    },[props.time])
    return(
        <HelpArea className={myHelp ? "slide-in-blurred-bottom" : null} style={{ display: myHelp ?  "block" : "none"}}>
                <Icon name="window close" style={{ float: "right" }} onClick={() => {
                    setMyHelp(false)
                    props.changeNeed()
                }} />
                <Chat roomId={`Help-${props.username}-${new Date().getDate()}`} userHelp />
                <br></br>
            </HelpArea>
    )   

    }
const mapStatetoProps = state => {
    if(state.api.user){
        return {username: state.api.user.username, loggedIn: state.api.isAuthenticated}}
    else{
        return {username: localStorage.getItem("username"), loggedIn: true}
    }
}


export default connect(mapStatetoProps)(UserHelp);

