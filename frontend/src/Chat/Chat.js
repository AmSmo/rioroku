import React, {useEffect, useState, useRef} from 'react'
import {useChat} from '../actions/socketFunctions'
import {useInfo} from '../actions/channelInfo'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {SendMessageButton, MessageLine, ChatMessageContainer, Vertical} from '../Styles/Styles'
function Chat(props){
    if (!props.loggedIn){
        props.history.push("/")
    }
    
    const {roomId} = props
    const { messages, sendMessage, stageTime, changeStageTime, userList } = useChat(roomId, props.username)
    const {list, count } = useInfo(roomId, `control-${props.username}`)
    const [newMessage, setNewMessage] = useState("")
    const [time, setTime] = useState(0)
    const [newTime, setNewTime]= useState("")
    const handleSendMessage = ()=>{
        sendMessage(props.username + ": " + newMessage)
        setNewMessage("")

    }

    const messagesEndRef = useRef(null)

    const scrollToBottom = () => {
        messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }

    useEffect(scrollToBottom, [messages]);
    const handleTimeChange = () =>{
       changeStageTime(parseInt(newTime))
    }

    const displayMessages = () => {
        return messages.map((message, idx) => {
                    
        return <p key={idx} className={ message.ownedByCurrentUser ? "from-me" : "from-them"}>{message.body}</p>
} )   }
    // useEffect(() => {
    //     let timer = setInterval(() => {
    //         setTime(time => (time + 1));
            
    //     }, 1000);

    // return () => clearInterval(timer);
    // },[time])

    // useEffect(()=>{
    //     return setTime(parseInt(stageTime))
    // },[stageTime])

    const handlePress = (e) =>{
        if (e.key === "Enter"){
            handleSendMessage()
        }
        
    }
    
    return(<>
        
            <Vertical style={{display: !props.hidden ? "none" : "block"}}>CHAT ^</Vertical>
            <div style={{ display: props.hidden ? "none" : "block", transform: "2s", paddingBottom: "10px", background: "whitesmoke", borderBottomLeftRadius: "15px" }}>
            
            <ChatMessageContainer className="imessage">
                {displayMessages()}
                <div ref={messagesEndRef} />
            </ChatMessageContainer>

            <textarea
                className="messageInput"
                value={newMessage}
                onChange={(e)=> setNewMessage(e.target.value)}
                placeholder="Your Message..."
                onKeyPress={(e) => handlePress(e)}
            /><br></br>
            <SendMessageButton onClick={handleSendMessage}>Send Message</SendMessageButton>
            {userList}
            {props.control ? 
            <>
                <input type="text" value={newTime} onChange={(e)=> setNewTime(e.target.value)} />
                <button onClick={handleTimeChange}>ChangeTime</button>
            </>
            :
            null}
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