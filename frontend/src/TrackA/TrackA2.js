import React, {useState, useEffect} from 'react'
import { connect } from 'react-redux'
import ImageMapper from 'react-image-mapper'
import { Modal } from 'semantic-ui-react'
import ModalVideo from '../modals/ModalVideo'
import ModalVideoLocal from '../modals/ModalVideoLocal'
import ModalAudio from '../modals/ModalAudio'
import ModalLivestream from '../modals/ModalLivestream'
import {useInfo} from '../actions/channelInfo'
import {CenterMap, BlueBackground} from '../Styles/Styles'
import TimeKeeper from '../Session/TimeKeeper'

function TrackA2(props){
  const [open, setOpen] = useState(false)
  const [contents, setContents] = useState(null)
  const [width, setWidth] = useState(window.innerWidth * 0.6)

  const modalClose = () => {
    setOpen(false)
  }
  const generateModal = (e) =>{
    switch (e.name){
      case "1":
        setOpen(true)
        setContents(<ModalVideo basic size="small" videoId={'7EpSBDPlZn4'} setOpen={modalClose}/>)
      break;
      case "2":
        setOpen(true)
        setContents(<ModalVideo basic size="small" videoId={'gPsxT8ODAU0'} setOpen={modalClose}/>)
      break;
      case "3":
        setOpen(true)
        setContents(<ModalVideo basic size="small" videoId={'jkV8SeNW_Nc'} setOpen={modalClose}/>)
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
        setContents(<ModalVideo basic size="small" videoId={'7EpSBDPlZn4'} setOpen={modalClose}/>)
      break;
      case "7":
        setOpen(true)
        setContents(<ModalVideo basic size="small" videoId={'qMxWAPvYrj4'} setOpen={modalClose}/>)
      break;
      case "8":
        setOpen(true)
        setContents(<ModalVideo basic size="small" videoId={'7EpSBDPlZn4'} setOpen={modalClose}/>)
      break;
      case "9":
        setOpen(true)
        setContents(<ModalVideo basic size="small" videoId={'7EpSBDPlZn4'} setOpen={modalClose}/>)
      break;
      case "10":
        setOpen(true)
        setContents(<ModalVideo basic size="small" videoId={'7EpSBDPlZn4'} setOpen={modalClose}/>)
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
      coords:[193,187,49],
      fillColor: "none"
    },
    {
      name: "2",
      shape: "circle",
      coords:[414,323,49],
      fillColor: "none"
    },
    {
      name: "3",
      shape: "circle",
      coords:[879,251,52],
      fillColor: "none"
    },
    {
      name: "4",
      shape: "circle",
      coords:[152,490,51],
      fillColor: "none"
    },
    {
      name: "5",
      shape: "circle",
      coords:[711,388,49],
      fillColor: "none"
    },
    {
      name: "6",
      shape: "circle",
      coords:[381,663,47],
      fillColor: "none"
    },
    {
      name: "7",
      shape: "circle",
      coords:[1039,442,49],
      fillColor: "none"
    },
    {
      name: "8",
      shape: "circle",
      coords:[833,646,48],
      preFillColor: "none",
      fillColor: "none"
    },
    {
      name: "9",
      shape: "circle",
      coords:[189,736,48],
      preFillColor: "none",
      fillColor: "none"
    },
    {
      name: "10",
      shape: "circle",
      coords:[1064,746,50],
      preFillColor: "none",
      fillColor: "none"
    }
  ]
}

  useEffect(() => {
    function handleResize() {
      setWidth(window.innerWidth * .6)

    }
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);


return(

  <BlueBackground>
    <TimeKeeper/>
  <CenterMap className="fade-in">
  <ImageMapper
  src={'https://dl.dropboxusercontent.com/s/pk2wv82qhw2zlu7/map_A_2.png?dl=0'}
  imgWidth={1200}
  width={width}
  onClick={e=> generateModal(e)}
  map={map}

  />
  </CenterMap>
  <Modal
  onClose={() => setOpen(false)}
  onOpen={() => setOpen(true)}
  open={open}

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
