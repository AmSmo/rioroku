import React, {useState, useEffect} from 'react'
import { connect } from 'react-redux'
import ImageMapper from 'react-image-mapper'
import { Modal } from 'semantic-ui-react'
import ModalVideo from '../modals/ModalVideo'
import ModalVideoLocal from '../modals/ModalVideoLocal'
import ModalAudio from '../modals/ModalAudio'
import ModalLivestream from '../modals/ModalLivestream'
import ModalImage from '../modals/ModalImage'
import {useInfo} from '../actions/channelInfo'
import {CenterMap, BlueBackground} from '../Styles/Styles'
import TimeKeeper from '../Session/TimeKeeper'

function TrackA2(props){
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
        setOpen(true)
        setContents(<ModalImage basic size="small" imageId={'https://losangeles.cbslocal.com/wp-content/uploads/sites/14984641/2016/07/shutterstock_234541271.jpg?w=1000&h=576&crop=1'} setOpen={modalClose}/>)
      break;
      case "2":
        setOpen(true)
        setContents(<ModalVideoLocal basic size="small" videoId={'https://vimeo.com/115189988'} setOpen={modalClose}/>)
      break;
      case "3":
        setOpen(true)
        setContents(<ModalVideoLocal basic size="small" videoId={'https://youtu.be/jkV8SeNW_Nc'} setOpen={modalClose}/>)
      break;
      case "4":
        setOpen(true)
        setContents(<ModalVideoLocal basic size="small" videoId={'https://storage.googleapis.com/rio_reveal/LAyeas.mov'} setOpen={modalClose}/>)
      break;
      case "5":
        setOpen(true)
        setContents(<ModalAudio basic size="small" audioId={'https://dl.dropboxusercontent.com/s/anm4e1835utfocg/Personal_Jesus.mp3?dl=0'}setOpen={modalClose} />)
      break;
      case "6":
        setOpen(true)
        setContents(<ModalVideoLocal basic size="small" videoId={'https://youtu.be/7EpSBDPlZn4'} setOpen={modalClose}/>)
      break;
      case "7":
        setOpen(true)
        setContents(<ModalVideoLocal basic size="small" videoId={'https://youtu.be/qMxWAPvYrj4'} setOpen={modalClose}/>)
      break;
      case "8":
        setOpen(true)
        setContents(<ModalVideoLocal basic size="small" videoId={'https://soundcloud.com/will-pickens/sets/experiment-audio-plays-cyoa'} setOpen={modalClose}/>)
      break;
      case "9":
        setOpen(true)
        setContents(<ModalVideoLocal basic size="small" videoId={'https://youtu.be/z2eYchNQ-64'} setOpen={modalClose}/>)
      break;
      case "10":
        setOpen(true)
        setContents(<ModalVideoLocal basic size="small" videoId={'https://youtu.be/gPsxT8ODAU0'} setOpen={modalClose}/>)
      break;
      default:
      break;
    }
  }
  const {userList, userCount} = useInfo("TrackA2", `control-${props.username}`)
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
    <TimeKeeper/>
  {/* <CenterMap> */}
  <ImageMapper
  src={'https://dl.dropboxusercontent.com/s/p7a55clmn6cqw7r/map_A_2_16x9.png?dl=0'}
  //src={'https://dl.dropboxusercontent.com/s/pk2wv82qhw2zlu7/map_A_2.png?dl=0'}
  imgWidth={1280}
  width={width}
  onClick={e=> generateModal(e)}
  map={map}

  />
  {/* </CenterMap> */}
  <Modal
  onClose={() => setOpen(false)}
  onOpen={() => setOpen(true)}
  open={open}
  dimmer='blurring'
  basic
  >
  {contents}
  </Modal>
  </BlueBackground>
)
}

const mapStateToProps = state => {
  if (state.api.user) {
    return { username: state.api.user.username, loggedIn: state.api.isAuthenticated }
  }
  else {
    return { username: localStorage.getItem("username"), loggedIn: true }
  }
}

export default connect(mapStateToProps)(TrackA2)
