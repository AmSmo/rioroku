import React from 'react'
import { Modal } from 'semantic-ui-react'
import YouTube from 'react-youtube'

function ModalVideo(props) {

  return (
      <Modal.Content onClick={()=> props.setOpen(false) }>
          <center>
      <YouTube
              videoId={props.videoId}
              //videoId={'7EpSBDPlZn4'}

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
