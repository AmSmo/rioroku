import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux'
import {useHelp} from'../actions/helpFunctions'
import {HelpArea, SendMessageButton} from '../Styles/Styles'
import Chat from './Chat'
import {Icon} from 'semantic-ui-react'

function UserHelp(props){
    const { messages, sendMessage } = useHelp(props.username)
    const [newMessage, setNewMessage] = useState("")
    const [myHelp, setMyHelp] = useState(false)
    const handleSendMessage = ()=>{
        sendMessage(props.username + ": " + newMessage)
        setNewMessage("")
        setMyHelp(true)
    }

    return(
         myHelp ? 
            <HelpArea>
                <Icon name="window close" style={{ float: "right" }} onClick={() => {
                    setMyHelp(false)
                    props.changeNeed()
                }} />
                <Chat roomId={props.username} userHelp />
                <br></br>
            </HelpArea>
                :
        <HelpArea>
                <Icon name="window close" style={{ float: "right" }} onClick={() => {
                    setMyHelp(false)
                    props.changeNeed()
                }}/>
            <p>Please Describe You Problem</p>
            <textarea
                value={newMessage}
                onChange={(e)=> setNewMessage(e.target.value)}
                placeholder="Your Message..."
            /><br></br>
            <SendMessageButton onClick={handleSendMessage}>Send Message</SendMessageButton>
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

