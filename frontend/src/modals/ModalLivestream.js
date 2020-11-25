//not working yet

import React from 'react'
import { Modal } from 'semantic-ui-react'
import ReactLivestream from 'react-livestream'

function ModalLivestream(props) {

  return (
      <Modal.Content onClick={()=> props.setOpen(false) }>
          <center>
          <ReactLivestream
  platform="youtube"
  youtubeApiKey="AIzaSyAHNMYMKSIF31hgptGxv6_kMP4V2YLHoBM"
  youtubeChannelId="UCMX6ZTHxULXGoCD26ePQs0g"
/>
          </center>
    </Modal.Content>
  )
}

export default ModalLivestream
