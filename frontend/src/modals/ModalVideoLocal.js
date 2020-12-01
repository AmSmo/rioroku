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


    <ReactPlayer url={props.videoId} className="video-element" playing={true} width="100%" playbackRate={1} muted={false} onEnded={props.setOpen}/>
    </center>
  )
}
export default ModalVideoLocal;
