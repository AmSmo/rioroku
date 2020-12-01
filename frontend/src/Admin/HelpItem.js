import React, { useState, useEffect } from 'react'
import Chat from '../Chat/Chat'
import { OpenHelp, UserNeeds } from '../Styles/Styles'
import { Icon } from 'semantic-ui-react'
function HelpItem(props) {
    let [beingHelped, setBeingHelped] = useState(false)
    return (
        beingHelped ?
            <>Chat with {props.message.username}<Icon name="window close" style={{ float: "right" }} onClick={() => {
                props.deleteMessage(props.message)
                setBeingHelped(false)
            }
            } />
                <br></br>
                <Chat help roomId={`Help-${props.message.username}-${new Date().getDate()}`} />

            </>
            :
            <UserNeeds>
                <OpenHelp onClick={() => setBeingHelped(true)}>Help</OpenHelp>
                {props.message.body}
            </UserNeeds>
    )
}


export default HelpItem