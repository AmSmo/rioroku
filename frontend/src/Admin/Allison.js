import React, { useEffect, useState } from 'react';
import { UserNeeds, OpenHelp, InteriorQueue, BlueBackground } from '../Styles/Styles'
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
        <BlueBackground>
        <div className="grid-container">
        <div className="item1">
            <AllisonNavBar />
        </div>
            <div className="item2">
                
                
                        <h2 style={{width: "100%", textAlign: "center", borderBottom: "0.5px solid grey"}}>Help Queue</h2>
                            {displayMessages()}
                
                    </div>
                    <div className="item3">
                        {openChat()}
                    </div>
                <div className="item4">
                
                    <div>
                        <h2>Active Rooms</h2>
                        <p>
                            Total Users: {userCount}
                        </p>
                    </div>
                    {renderChannels()}
                    

                
            </div>

        </div>
        </BlueBackground>
    )

}
const mapStatetoProps = state => {
    return state
}


export default connect(mapStatetoProps)(Allison);