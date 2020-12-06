import React, {useState, useEffect} from 'react'
import { connect } from 'react-redux'
import ImageMapper from 'react-image-mapper'
import { Modal } from 'semantic-ui-react'
import ModalVideoLocal from '../modals/ModalVideoLocal'
import Chat from '../Chat/Chat'
import {BlueBackground} from '../Styles/Styles'


function TrackA2(props){
  const [open, setOpen] = useState(false)
  const [contents, setContents] = useState(null)
  const [width, setWidth] = useState(window.innerWidth)
  const [height, setHeight] = useState(window.innerHeight)
  const { username } = props.api.user
  const modalClose = () => {
    setOpen(false)
  }
  const generateModal = (e) =>{
    switch (e.name){
      case "1":
        // RECORDED VIDEO
        setOpen(true)
        setContents(<ModalVideoLocal basic size="small" videoId={'https://vimeo.com/115189988'} setOpen={modalClose} />)
      break;
      case "2":
        // RECORDED VIDEO
        setOpen(true)
        setContents(<ModalVideoLocal basic size="small" videoId={'https://vimeo.com/115189988'} setOpen={modalClose}/>)
      break;
      case "3":
        // RECORDED VIDEO
        setOpen(true)
        setContents(<ModalVideoLocal basic size="small" videoId={'https://youtu.be/jkV8SeNW_Nc'} setOpen={modalClose}/>)
      break;
      case "4":
        // RECORDED VIDEO
        setOpen(true)
        setContents(<ModalVideoLocal basic size="small" videoId={'https://storage.googleapis.com/rio_reveal/LAyeas.mov'} setOpen={modalClose}/>)
      break;
      case "5":
        // RECORDED VIDEO
        setOpen(true)
        setContents(<ModalVideoLocal basic size="small" videoId={'https://vimeo.com/115189988'} setOpen={modalClose} />)
      break;
      case "6":
        // RECORDED VIDEO
        setOpen(true)
        setContents(<ModalVideoLocal basic size="small" videoId={'https://youtu.be/7EpSBDPlZn4'} setOpen={modalClose}/>)
      break;
      case "7":
        // RECORDED VIDEO
        setOpen(true)
        setContents(<ModalVideoLocal basic size="small" videoId={'https://youtu.be/qMxWAPvYrj4'} setOpen={modalClose}/>)
      break;
      case "8":
        // RECORDED VIDEO
        setOpen(true)
        setContents(<ModalVideoLocal basic size="small" videoId={'https://soundcloud.com/will-pickens/sets/experiment-audio-plays-cyoa'} setOpen={modalClose}/>)
      break;
      case "9":
        // RECORDED VIDEO
        setOpen(true)
        setContents(<ModalVideoLocal basic size="small" videoId={'https://youtu.be/z2eYchNQ-64'} setOpen={modalClose}/>)
      break;
      case "10":
        // RECORDED VIDEO
        setOpen(true)
        setContents(<ModalVideoLocal basic size="small" videoId={'https://youtu.be/gPsxT8ODAU0'} setOpen={modalClose}/>)
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
    },
    {
      name: "6",
      shape: "circle",
      coords:[380,617,51],
      preFillColor: "none",
      fillColor: "none"
    },
    {
      name: "7",
      shape: "circle",
      coords:[1039,397,54],
      preFillColor: "none",
      fillColor: "none"
    },
    {
      name: "8",
      shape: "circle",
      coords:[833,600,52],
      preFillColor: "none",
      fillColor: "none"
    },
    {
      name: "9",
      shape: "circle",
      coords:[170,619,53],
      preFillColor: "none",
      fillColor: "none"
    },
    {
      name: "10",
      shape: "circle",
      coords:[1134,145,53],
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
  <Chat roomId={"A-Act2"} />
  </BlueBackground>
)
}

const mapStateToProps = state => {
  return state
}

export default connect(mapStateToProps)(TrackA2)
