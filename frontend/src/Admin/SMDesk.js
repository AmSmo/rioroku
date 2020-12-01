import React, { useEffect} from 'react';
import {ChannelContainer} from '../Styles/Styles'
import { connect } from 'react-redux'
import { useHelp } from '../actions/helpFunctions'
import { useInfo } from '../actions/channelInfo'
import UserList from '../Chat/UserList'
import ShowController from '../Navbar/ShowController'
function SMDesk(props) {

    const { userList, userCount} = useInfo("admin", props.username)
    

    useEffect(() =>{
        renderChannels()
    }, [userList])

    const renderChannels = () =>{
        delete userList.help
        delete userList.admin
        return (Object.keys(userList)).map(channel =>{
            let users = userList[channel]
            if (users && users.length >0 && !channel.startsWith("Help")){
                return <UserList control users={users} roomId={channel} />
            }
    })}
 
    return (
        <>
            <ShowController/>
        <div>
              
           
                

                <ChannelContainer>
                    <div style={{marginRight: "10px"}}>
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
    if (state.api.user) {
        return { username: state.api.user.username, loggedIn: state.api.isAuthenticated }
    }
    else {
        return { username: localStorage.getItem("username"), loggedIn: true }
    }
}


export default connect(mapStatetoProps)(SMDesk);