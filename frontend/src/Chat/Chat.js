import {updateChatHistory, retrieveChatHistory} from '../util/session_api_util'
import React, {useEffect, useState, useRef} from 'react'
import {useChat} from '../actions/socketFunctions'
import {useInfo} from '../actions/channelInfo'
import {connect} from 'react-redux'
import {withRouter, Link} from 'react-router-dom'
import {SendMessageButton, ChatMessageContainer, Vertical} from '../Styles/Styles'
import {usePrevious} from '../Session/MessageHistory'
function Chat(props){
    if (!props.loggedIn){
        props.history.push("/")
    }
    
    const {roomId} = props
    let [history, setHistory] = useState([])
    let { messages, sendMessage } = useChat(roomId, props.username)
    const [newMessage, setNewMessage] = useState("")

    useInfo(roomId, `control-${props.username}`)    
    const handleSendMessage = ()=>{
        if (newMessage.trim() !== ""){
            let fullMessage = props.username + ": " + newMessage
            let latest = sendMessage(fullMessage)
            if (roomId.startsWith("Help-")) {
                updateChatHistory({ roomId: roomId, messages: [...history, latest, ...prevMessages.current] })
        }
        setNewMessage("")
    }
}
    const prevMessages = usePrevious(messages)
    
    useEffect(()=>{
        if (roomId.startsWith("Help-")){
        let local = []
        retrieveChatHistory({roomId}).then(resp=>{ 
            local= resp.data
            setHistory(resp.data)})
        
        return () =>{
            updateChatHistory({roomId: roomId, messages: [...local, ...prevMessages.current]})

    }}},[])

    const messagesEndRef = useRef(null)

    const scrollToBottom = () => {
        messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }

    useEffect(scrollToBottom, [messages]);
    const displayHistory = () => {
        return history.map((message, idx)=>{
            return <p key={idx} className={message.ownedByCurrentUser ? "from-me" : "from-them"}>{message.body}</p>    
        })
    }

    function urlify(text) {
        var urlRegex = /(https?:\/\/[^\s]+)/g;
        if(RegExp(urlRegex).test(text)){

            text.replace(urlRegex, function (url) {

                let split = text.split(url)
                console.log(url)
                text= <p>{split[0]} <a style={{color: "orange"}} href={url} target="_blank"> {url}</a> {split[1]}</p>
            })
        }
            return text
            
    }
    const displayMessages = () => {
        return messages.map((message, idx) => {

        return <p key={idx} className={ message.ownedByCurrentUser ? "from-me" : "from-them"}>{urlify(message.body)}</p>
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
                {displayHistory()}
                {displayMessages()}
                <div ref={messagesEndRef} />
            </ChatMessageContainer>
            {/* { props.userHelp && messages.length === 0 ?
                <div> Alison Has been Notified </div>
                : */}
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
{/* } */}
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