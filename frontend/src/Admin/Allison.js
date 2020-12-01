import React, { useEffect, useState } from 'react';
import { ChannelContainer, HelpQueue, InteriorQueue } from '../Styles/Styles'
import { connect } from 'react-redux'
import { useHelp } from '../actions/helpFunctions'
import { useInfo } from '../actions/channelInfo'
import UserList from '../Chat/UserList'
import HelpItem from './HelpItem'
import AllisonNavBar from '../Navbar/AllisonNavBar'
function Allison(props) {


    const { messages, sendMessage, deleteMessage } = useHelp()
    const { userList, userCount } = useInfo("admin", "Allison")


    useEffect(() => {
        renderChannels()
    }, [userList])

    const displayMessages = () => {
        return messages.map((message, idx) => {
            return (
                <>
                    <HelpItem message={message} key={idx} deleteMessage={deleteMessage} />
                </>)
        })
    }

    const renderChannels = () => {
        delete userList.help
        delete userList.admin
        return (Object.keys(userList)).map(channel => {
            let users = userList[channel]
            if (users && users.length > 0 && !channel.startsWith("Help")) {
                return <UserList control users={users} roomId={channel} />
            }
        })
    }

    return (
        <>
            <AllisonNavBar />
            <div>


                <HelpQueue>
                    <InteriorQueue>
                        <h2>Help Queue</h2>
                        {displayMessages()}
                    </InteriorQueue>
                </HelpQueue>

                <ChannelContainer>
                    <div style={{ marginRight: "10px" }}>
                        <h2>Active Rooms</h2>
                        <p>
                            Total Users: {userCount}
                        </p>
                    </div>

                    {renderChannels()}
                </ChannelContainer>
            </div>

        </>
    )

}
const mapStatetoProps = state => {
    return state
}


export default connect(mapStatetoProps)(Allison);