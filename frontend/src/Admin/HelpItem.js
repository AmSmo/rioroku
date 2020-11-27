import React, {useState, useEffect} from 'react'
import Chat from '../Chat/Chat'
import styled from 'styled-components'
import {Icon} from 'semantic-ui-react'
function HelpItem(props){
    let [beingHelped, setBeingHelped] = useState(false)
    return(
        beingHelped ?
            <>Chat with {props.message.username}<Icon name="window close" style={{float: "right"}}onClick={() => {
                props.deleteMessage(props.message)
                setBeingHelped(false)
            }
            }/>
            <br></br>
        <Chat help roomId={props.message.username}/>
        
        </>
        :
        <UserNeeds>
            {props.message.body}
            <HelpButton onClick={() => setBeingHelped(true)}>Open Chat</HelpButton>
        </UserNeeds>
        )
    }

const HelpButton= styled.button`
    background: blue;
    width: 80px;
    border-radius: 80px;
    border: 0.5px solid whitesmoke;
`

const UserNeeds= styled.li`
    list-style:none;

`

export default HelpItem