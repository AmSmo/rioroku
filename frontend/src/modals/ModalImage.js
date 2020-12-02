import React, { useEffect} from 'react'
import { Icon } from 'semantic-ui-react'

function ModalImage(props) {


  return (
    <center>
      <Icon name="window close" style={{ float: "right" }} onClick={() => props.setOpen()} />
    <div onClick={null} >




    <img src={props.imageId}></img>


    </div>
    </center>
  )
}
export default ModalImage;
