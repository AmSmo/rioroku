import React, { useEffect} from 'react'
import { Icon } from 'semantic-ui-react'
import ReactPlayer from 'react-player'
function ModalVideoLocal(props) {
    // const playVideo = () => {
    //   const videoEl = document.getElementsByClassName("video-element")[0]
    //   videoEl.play()
    // }

    // useEffect(()=>{playVideo()}, [])
  return (
<>
      <Icon name="window close" style={{ float: "right", margin: "-40px" }} onClick={() => props.setOpen()}/>
    <center>

    <ReactPlayer url={props.videoId} 
      className="video-element" 
        playing={true} width="100%" 
        playbackRate={1} muted={false} 
        onEnded={props.setOpen}
        controls={false}
        style={{ pointerEvents: 'none' }}
        />
    </center>
    </>
  )
}
export default ModalVideoLocal;
