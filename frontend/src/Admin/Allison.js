import React, { useEffect, useState } from 'react';
import { ChannelContainer, UserNeeds, OpenHelp, InteriorQueue } from '../Styles/Styles'
import { connect } from 'react-redux'
import { useHelp } from '../actions/helpFunctions'
import { useInfo } from '../actions/channelInfo'
import UserList from '../Chat/UserList'
import HelpItem from './HelpItem'
import AllisonNavBar from '../Navbar/AllisonNavBar'
function Allison(props) {
    let [helping, setHelping] = useState([])

    const { messages, sendMessage, deleteMessage } = useHelp()
    const { userList, userCount } = useInfo("admin", "Allison")
    let [toBeHelped, setToBeHelped] = useState([])

    useEffect(() => {
        renderChannels()
    }, [userList])
    
    const completedHelp = (message) => {
        let newArray = helping.filter(oldMessage => oldMessage !== message)
        setHelping(newArray)
    }

    const openChat = () => {
        return helping.map((message,idx) => {
            return <HelpItem message={message} completedHelp={completedHelp}/>
        })
    }

    let waiting = []
    const displayMessages = () => {
        (Object.keys(userList)).map((channel, idx) => {
            if (channel.startsWith("Help-") && userList[channel].length <= 2) {
                
            waiting.push(...userList[channel].filter(user=> {
                return (!user.startsWith("control-") )}))
            
        } })
        let bob = []
        return messages.map((message, idx) => {
            
            
            if (waiting.includes(`${message.username}`) && !bob.includes(message.username)){
                bob.push(message.username)
            return (
                <InteriorQueue key={idx}>
                    <UserNeeds>
                        <OpenHelp onClick={() => {
                            setHelping(helping => [...helping, message])
                            deleteMessage(message)
                        }}>Help</OpenHelp>
                        {message.body}
                    </UserNeeds>
                </InteriorQueue>)
}        })
    }


    const renderChannels = () => {
        delete userList.help
        delete userList.admin
        return (Object.keys(userList)).map((channel,idx) => {
            let users = userList[channel]
            if (users && users.length > 0 && !channel.startsWith("Help")) {
                return <UserList control users={users} roomId={channel} />
            }
        })
    }

    return (
        <>
            <AllisonNavBar />
            <div style={{display:"flexbox", flexWrap: "wrap", height: "100%"}}>
                
                <InteriorQueue style={{ width: "200px", height: "100vh", display:"inline-flex", position: "fixed", borderRight: "1px solid black"}}>
                        <h2 style={{width: "100%", textAlign: "center", borderBottom: "0.5px solid grey"}}>Help Queue</h2>
                            {displayMessages()}
                        </InteriorQueue>
                    <div style={{display: "flexbox", justifyContent:"flex-end", position: "relative", maxWidth: "800px",flexWrap: "wrap-reverse", float:"right", height:"70%", overflowY:"scroll"}}>
                        {openChat()}
                    </div>
            </div>
                
                <ChannelContainer>
                    <div style={{ marginRight: "10px" }}>
                        <h2>Active Rooms</h2>
                        <p>
                            Total Users: {userCount}
                        </p>
                    </div>

                    {renderChannels()}
                </ChannelContainer>
            

        </>
    )

}
const mapStatetoProps = state => {
    return state
}


export default connect(mapStatetoProps)(Allison);