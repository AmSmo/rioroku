import React, { useEffect} from 'react'
import { Button } from 'semantic-ui-react'
import ReactPlayer from 'react-player'
function ModalVideoLocal(props) {
    // const playVideo = () => {
    //   const videoEl = document.getElementsByClassName("video-element")[0]
    //   videoEl.play()
    // }

    // useEffect(()=>{playVideo()}, [])
  return (
    <center>
    {/* <div onClick={null} >


    <video className="video-element">
    <source src={props.videoId}></source>
    </video>

    </div> */}
    <ReactPlayer url={props.videoId} className="video-element" playing={true} playbackRate={3} muted={true} onEnded={props.setOpen}/>
    </center>
  )
}
export default ModalVideoLocal;
