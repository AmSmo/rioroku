import React, {useState, useEffect} from 'react'
import { connect } from 'react-redux'
import ImageMapper from 'react-image-mapper'
import { Modal } from 'semantic-ui-react'
import ModalVideoLocal from '../modals/ModalVideoLocal'
import {useInfo} from '../actions/channelInfo'
import {BlueBackground} from '../Styles/Styles'

function TrackA3(props){
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
        // LIVESTREAM
        setOpen(true)
        setContents(<ModalVideoLocal basic size="small" videoId={'https://vimeo.com/115189988'} setOpen={modalClose} />)
        break;
      case "2":
        // LIVESTREAM
        setOpen(true)
        setContents(<ModalVideoLocal basic size="small" videoId={'https://vimeo.com/115189988'} setOpen={modalClose} />)
        break;
      case "3":
        // LIVESTREAM
        setOpen(true)
        setContents(<ModalVideoLocal basic size="small" videoId={'https://vimeo.com/115189988'} setOpen={modalClose} />)
        break;
      case "4":
        // LIVESTREAM
        setOpen(true)
        setContents(<ModalVideoLocal basic size="small" videoId={'https://vimeo.com/115189988'} setOpen={modalClose} />)
        break;
      case "5":
        // RECORDED VIDEO
        setOpen(true)
        setContents(<ModalVideoLocal basic size="small" videoId={'https://vimeo.com/115189988'} setOpen={modalClose} />)
        break;
      default:
        break;
    }
  }
  const {userList, userCount} = useInfo("A-Act3", `control-${username}`)
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
  //src={'https://dl.dropboxusercontent.com/s/pk2wv82qhw2zlu7/map_A_2.png?dl=0'}
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
  </BlueBackground>
)
}

const mapStateToProps = state => {
  return state
}

export default connect(mapStateToProps)(TrackA3)
