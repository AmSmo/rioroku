import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import ImageMapper from 'react-image-mapper'
import { Modal } from 'semantic-ui-react'
import ModalVideo from '../modals/ModalVideo'
import ModalVideoLocal from '../modals/ModalVideoLocal'
import ModalAudio from '../modals/ModalAudio'
import ModalLivestream from '../modals/ModalLivestream'
import { BlueBackground, CenterMap } from '../Styles/Styles'
import TimeKeeper from '../Session/TimeKeeper'
import { useInfo } from '../actions/channelInfo'

function TrackE1(props) {
  const [open, setOpen] = useState(false)
  const [contents, setContents] = useState(null)
  const [width, setWidth] = useState(window.innerWidth * 0.5)
  const modalClose = () => {
    setOpen(false)
    unmuteAudio()
  }

 
  const generateModal = (e) => {
    muteAudio()
    switch (e.name) {
      case "1":
        setOpen(true)
        setContents(<ModalVideo basic size="small" setOpen={modalClose} />)
        break;
      case "2":
        setOpen(true)
        setContents(<ModalLivestream basic size="small" setOpen={modalClose} />)
        break;
      case "3":
        setOpen(true)
        setContents(<ModalVideo basic size="small" videoId={'7EpSBDPlZn4'} setOpen={modalClose} />)
        break;
      case "4":
        setOpen(true)
        setContents(<ModalVideo basic size="small" videoId={'jjUjrE19eyw'} setOpen={modalClose} />)
        break;
      case "5":
        setOpen(true)
        setContents(<ModalAudio basic size="small" setOpen={modalClose} />)
        break;
      case "6":
        setOpen(true)
        setContents(<ModalVideo basic size="small" videoId={'7EpSBDPlZn4'} setOpen={modalClose} />)
        break;
      default:
        break;
    }
  }
  const { userList, userCount } = useInfo("TrackE", `control-${props.username}`)
  const map = {
    name: "map1",
    areas: [
      {
        name: "1",
        shape: "rect",
        coords: [27, 27, 301, 183],
        preFillColor: "none",
        fillColor: "none"
      },
      {
        name: "2",
        shape: "rect",
        coords: [398, 54, 602, 285],
        preFillColor: "none",
        fillColor: "none"
      },

      {
        name: "3",
        shape: "rect",
        coords: [77, 265, 260, 439],
        preFillColor: "none",
        fillColor: "red"

      },
      {
        name: "4",
        shape: "poly",
        coords: [699, 75, 738, 73, 741, 39, 769, 38, 953, 43, 952, 250, 697, 257],
        preFillColor: "none",
        fillColor: "red"

      }
    ]
  }

  let audioEl = document.getElementsByClassName("audio-element")[0]

  
  const delay = 190
  const muteAudio = () =>{
    let volume = 0.70
    let turn = setInterval(function() {
      if (volume >= 0.05) {
        volume -= 0.05;
        audioEl.volume = volume;
      }else {
        audioEl.volume = 0
        clearInterval(turn);
      }}, delay)
  }
  const fadeUp = () => {
    let volume = 0.20
    let turn = setInterval(
    function() {
      if (volume < .95) {
        volume += 0.05;
        
        audioEl.volume = volume;
      }
      else {
        clearInterval(turn);
      }
    }, delay);
}

  

  
  
  const unmuteAudio = () =>{
    fadeUp()
  }

  const playAudio = () => {
    let audioEl = document.getElementsByClassName("audio-element")[0]
    setTimeout(()=>{
      audioEl.play()
      audioEl.muted=false},100)
  }
  
  useEffect(() => {
    
    function handleResize() {
      setWidth(window.innerWidth * .5)

    }
    
    window.addEventListener("resize", handleResize);
    handleResize();
    playAudio()
    return () => window.removeEventListener("resize", handleResize);
  }, []);


  return (
    <BlueBackground>
      
      <TimeKeeper />
      <CenterMap>
        <ImageMapper
          src={'https://dl.dropboxusercontent.com/s/3jncw5ztorvep3n/clue%20board.jpg?dl=0'}
          imgWidth={1000}
          width={width}
          onClick={e => generateModal(e)}
          map={map}
        />
      </CenterMap>
      <Modal
        onClose={() => {
          unmuteAudio()
          setOpen(false)}}
        onOpen={() => {
          muteAudio()
          setOpen(true)}}
        open={open}

        basic
      >
        
  
        {contents}
      </Modal>
      <audio muted="muted" className="audio-element">
        <source src="https://dl.dropboxusercontent.com/s/anm4e1835utfocg/Personal_Jesus.mp3?dl=0"></source>
        
      </audio>
    </BlueBackground>
  )
}

const mapStateToProps = state => {
  if (state.api.user) {
    state.username = state.api.user.username
  } else {
    state.username = localStorage.getItem("username")
  }
  return state
}

export default connect(mapStateToProps)(TrackE1)
