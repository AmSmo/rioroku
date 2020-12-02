import React from 'react'
import { Modal, Icon } from 'semantic-ui-react'
import YouTube from 'react-youtube'

function ModalVideo(props) {

  return (
      <Modal.Content onClick={()=> props.setOpen(false) }>
          <center>
        <Icon name="window close" style={{ float: "right" }} onClick={() => props.setOpen()} />
        <YouTube
              videoId={props.videoId}
              opts={
                {
                  playerVars: {autoplay: 1, controls: 0},
                  Volume: 1
                }
              }
              />
          </center>
    </Modal.Content>
  )

}


export default ModalVideo;
