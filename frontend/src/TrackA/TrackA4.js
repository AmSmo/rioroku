import React, {useState, useEffect} from 'react'
import { connect } from 'react-redux'
import ImageMapper from 'react-image-mapper'
import { Modal } from 'semantic-ui-react'
import ModalVideoLocal from '../modals/ModalVideoLocal'
import ModalAudioImage from '../modals/ModalAudio'
import {BlueBackground} from '../Styles/Styles'
import Chat from '../Chat/Chat'

function TrackA4(props){
  const [open, setOpen] = useState(false)
  const [contents, setContents] = useState(null)
  const [width, setWidth] = useState(window.innerWidth)
  const [height, setHeight] = useState(window.innerHeight)

  const modalClose = () => {
    setOpen(false)
  }
  const generateModal = (e) =>{
    switch (e.name){
      case "1":
        // RECORDED
        setOpen(true)
        setContents(<ModalVideoLocal basic size="small" setOpen={modalClose} />)
        break;
      case "2":
        // PHOTO + VOICEOVER
        setOpen(true)
        setContents(<ModalAudioImage basic size="small" imageId={'https://losangeles.cbslocal.com/wp-content/uploads/sites/14984641/2016/07/shutterstock_234541271.jpg?w=1000&h=576&crop=1'} audioId={'https://dl.dropboxusercontent.com/s/anm4e1835utfocg/Personal_Jesus.mp3?dl=0'} setOpen={modalClose}/>)
        break;
      case "3":
        // PHOTO + VOICEOVER
        setOpen(true)
        setContents(<ModalAudioImage basic size="small" imageId={'https://losangeles.cbslocal.com/wp-content/uploads/sites/14984641/2016/07/shutterstock_234541271.jpg?w=1000&h=576&crop=1'} audioId={'https://dl.dropboxusercontent.com/s/anm4e1835utfocg/Personal_Jesus.mp3?dl=0'} setOpen={modalClose}/>)
        break;
      case "4":
        // PHOTO + VOICEOVER
        setOpen(true)
        setContents(<ModalAudioImage basic size="small" imageId={'https://losangeles.cbslocal.com/wp-content/uploads/sites/14984641/2016/07/shutterstock_234541271.jpg?w=1000&h=576&crop=1'} audioId={'https://dl.dropboxusercontent.com/s/anm4e1835utfocg/Personal_Jesus.mp3?dl=0'} setOpen={modalClose}/>)
        break;
      case "5":
        // PHOTO + VOICEOVER
        setOpen(true)
        setContents(<ModalAudioImage basic size="small" imageId={'https://losangeles.cbslocal.com/wp-content/uploads/sites/14984641/2016/07/shutterstock_234541271.jpg?w=1000&h=576&crop=1'} audioId={'https://dl.dropboxusercontent.com/s/anm4e1835utfocg/Personal_Jesus.mp3?dl=0'} setOpen={modalClose} />)
        break;
      case "6":
        // RECORDED VIDEO
        setOpen(true)
        setContents(<ModalVideoLocal basic size="small" videoId={'https://vimeo.com/115189988'} setOpen={modalClose} />)
        break;
      default:
       break;
    }
  }
  const map = {name: "map1",
  areas: [
    {
      name: "1",
      shape: "circle",
      coords:[193,141,52],
      preFillColor: "none",
      fillColor: "none"
    },
    {
      name: "2",
      shape: "circle",
      coords:[420,281,51],
      preFillColor: "none",
      fillColor: "none"
    },
    {
      name: "3",
      shape: "circle",
      coords:[875,205,51],
      preFillColor: "none",
      fillColor: "none"
    },
    {
      name: "4",
      shape: "circle",
      coords:[149,448,53],
      preFillColor: "none",
      fillColor: "none"
    },
    {
      name: "5",
      shape: "circle",
      coords:[712,341,51],
      preFillColor: "none",
      fillColor: "none"
    }
  ]
}

useEffect(() => {
  function handleResize() {
    setWidth(window.innerWidth)
    setHeight(window.innerHeight)

  }
  window.addEventListener("resize", handleResize);
  handleResize();
  return () => window.removeEventListener("resize", handleResize);
}, []);


return(

  <BlueBackground className="fade-in">
  <ImageMapper
  src={'https://dl.dropboxusercontent.com/s/p7a55clmn6cqw7r/map_A_2_16x9.png?dl=0'}
  
  imgWidth={1280}
  width={width}
  onClick={e=> generateModal(e)}
  map={map}

  />
  
  <Modal
  onClose={() => setOpen(false)}
  onOpen={() => setOpen(true)}
  open={open}
  dimmer='blurring'
  basic
  >
  {contents}
  </Modal>
    <Chat roomId={"A-Act4"} />
  </BlueBackground>
)
}

const mapStateToProps = state => {
  return state
}

export default connect(mapStateToProps)(TrackA4)
