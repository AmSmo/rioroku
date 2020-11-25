import React from 'react'
import { Modal } from 'semantic-ui-react'
import YouTube from 'react-youtube'
function Modal1(props) {

  return (
      <Modal.Content onClick={()=> props.setOpen(false) }>
          <center>
      <YouTube
              videoId={'DoJtK7upCdg'}
              opts={{playerVars: {autoplay: 1}}}
              />
          </center>
    </Modal.Content>
  )
}

export default Modal1