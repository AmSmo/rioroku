import React, {useState, useEffect} from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import ImageMapper from 'react-image-mapper'
import { Modal } from 'semantic-ui-react'
import ModalVideo from '../modals/ModalVideo'
import ModalVideoLocal from '../modals/ModalVideoLocal'
import ModalAudio from '../modals/ModalAudio'
import ModalLivestream from '../modals/ModalLivestream'
import {useInfo} from '../actions/channelInfo'


function TrackA1(props){
  const [open, setOpen] = useState(false)
  const [contents, setContents] = useState(null)

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
        setContents(<ModalLivestream basic size="small" setOpen={modalClose} />)
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
      default:
      break;
    }
  }
  const {list, count} = useInfo("TrackA", props.username)
  const map = {name: "map1",
  areas: [
    {
      name: "1",
      shape: "circle",
      coords:[193,187,49],
      preFillColor: "none",
      fillColor: "none"
    },
    {
      name: "2",
      shape: "circle",
      coords:[414,323,49],
      preFillColor: "none",
      fillColor: "none"
    },
    {
      name: "3",
      shape: "circle",
      coords:[879,251,52],
      preFillColor: "none",
      fillColor: "none"
    },
    {
      name: "4",
      shape: "circle",
      coords:[152,490,51],
      preFillColor: "none",
      fillColor: "none"
    },
    {
      name: "5",
      shape: "circle",
      coords:[711,388,49],
      preFillColor: "none",
      fillColor: "none"
    },
    {
      name: "6",
      shape: "circle",
      coords:[381,663,47],
      preFillColor: "none",
      fillColor: "none"
    },
    {
      name: "7",
      shape: "circle",
      coords:[834,645,47],
      preFillColor: "none",
      fillColor: "none"
    }
  ]
}

return(

  <Background>
    
  <h1>{props.time}</h1>
  <div className="center_map">
  <ImageMapper
  src={'https://dl.dropboxusercontent.com/s/au6xan8beolro28/map_A_1.png?dl=0'}
  imgWidth={1200}
  width={1200}
  onClick={e=> generateModal(e)}
  map={map}

  />
  </div>
  <Modal
  onClose={() => setOpen(false)}
  onOpen={() => setOpen(true)}
  open={open}

  basic
  >
  {contents}
  </Modal>
  </Background>
)
}

const mapStateToProps = state => {
  return state.game
}

export default connect(mapStateToProps)(TrackA1)

const Background = styled.div`
background-color: #4287f5`
