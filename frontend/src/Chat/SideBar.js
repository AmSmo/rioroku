import React, {useState, useEffect} from 'react'
import Chat from '../Chat/Chat'

function Sidebar(props){
const [sideBar, setSideBar] = useState({ width: "50px" })
const [hidden, setHidden] = useState(true)



return (<div className="sidebar"
    style={sideBar}
    onMouseOver={() => {
        setSideBar({ width: "200px", opacity: "1", marginRight: "25px", boxShadow: "5px 5px black" })
        setHidden(false)
    }}
    onMouseOut={() => {
        setSideBar({ width: "50px", right: "0px" })
        setHidden(true)
    }}
>
    <Chat roomId={props.roomId} hidden={hidden} />
</div>
)
}

export default Sidebar