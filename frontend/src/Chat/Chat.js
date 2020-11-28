import React, {useEffect, useState, useRef} from 'react'
import {useChat} from '../actions/socketFunctions'
import {useInfo} from '../actions/channelInfo'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {SendMessageButton, ChatMessageContainer, Vertical} from '../Styles/Styles'
function Chat(props){
    if (!props.loggedIn){
        props.history.push("/")
    }
    
    const {roomId} = props
    const { messages, sendMessage, stageTime } = useChat(roomId, props.username)
    const [newMessage, setNewMessage] = useState("")
    const [time, setTime] = useState(0)
    const [newTime, setNewTime]= useState("")
    useInfo(roomId, `control-${props.username}`)
    
    const handleSendMessage = ()=>{
        if (newMessage.trim() !== ""){
        sendMessage(props.username + ": " + newMessage)
    }
        setNewMessage("")
    }

    const messagesEndRef = useRef(null)

    const scrollToBottom = () => {
        messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }

    useEffect(scrollToBottom, [messages]);


    const displayMessages = () => {
        return messages.map((message, idx) => {
                    
        return <p key={idx} className={ message.ownedByCurrentUser ? "from-me" : "from-them"}>{message.body}</p>
} )   }


    const handlePress = (e) =>{
        if (e.key === "Enter"){
            e.preventDefault()
            handleSendMessage()
        }
    }
    return(<>
        
            <Vertical style={{display: !props.hidden ? "none" : "block"}}>CHAT ^</Vertical>
            <div style={{ display: props.hidden ? "none" : "block", transform: "2s", paddingBottom: "10px", background: "whitesmoke", borderBottomLeftRadius: "15px" }}>
            
            <ChatMessageContainer style={props.help ? { height: "300px"}: null}className="imessage">
                {displayMessages()}
                <div ref={messagesEndRef} />
            </ChatMessageContainer>
            { props.userHelp && messages.length === 0 ?
                <div> Alison Has been Notified </div>
                :
                <>
            <textarea
                className="messageInput"
                value={newMessage}
                onChange={(e)=> setNewMessage(e.target.value)}
                placeholder="Your Message..."
                onKeyPress={(e) => handlePress(e)}
            />
            <SendMessageButton onClick={handleSendMessage}>Send Message</SendMessageButton>
            </>
}
            <br></br>
            {/* {props.control ? 
            <>
                <input type="text" value={newTime} onChange={(e)=> setNewTime(e.target.value)} />
                <button onClick={handleTimeChange}>ChangeTime</button>
            </>
            :
            null} */}
        </div>
        </>
    )   

    }
const mapStatetoProps = state => {
    if(state.api.user){
        return {username: state.api.user.username, loggedIn: state.api.isAuthenticated}}
    else{
        return {username: localStorage.getItem("username"), loggedIn: true}
    }
}

export default withRouter(connect(mapStatetoProps)(Chat))