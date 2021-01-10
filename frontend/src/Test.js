import React from 'react'
import ReactPlayer from 'react-player'

function Test(props){
    return(<div style={{height: "200px", width: "200px"}}> TEST
    <ReactPlayer
            url={`https://www.twitch.tv/riorecordszoom`}/>
            autoplay={true}
    </div>)
}

export default Test