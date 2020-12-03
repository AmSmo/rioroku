import React from 'react'
import Chat from '../Chat/Chat'

import { Icon } from 'semantic-ui-react'
function HelpItem(props) {
    
    return (
            <div style={{width:"220px", margin: "40px"}}>
                Chat with {props.message.username}<Icon name="window close" style={{ float: "right" }} onClick={() => {
                return props.completedHelp(props.message)
            }
            } />
                <br></br>
                <div style={{width: "230px"}}>
                <Chat help roomId={`Help-${props.message.username}-${new Date().getDate()}`} />
                </div>
            </div>
    )
}


export default HelpItem