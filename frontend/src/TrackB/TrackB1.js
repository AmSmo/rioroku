import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import ImageMapper from 'react-image-mapper'
import { Modal } from 'semantic-ui-react'
import ModalVideoLocal from '../modals/ModalVideoLocal'
import { CenterMap, BlueBackground } from '../Styles/Styles'
import Chat from '../Chat/Chat'

function TrackB1(props) {
  const [open, setOpen] = useState(false)
  const [contents, setContents] = useState(null)
  const [width, setWidth] = useState(window.innerWidth * 0.5)
  const modalClose = () => {
    setOpen(false)
  }
  const generateModal = (e) => {
    switch (e.name) {
      case "1":
        // RECORDED VIDEO
        setOpen(true)
        setContents(<ModalVideoLocal basic size="small" setOpen={modalClose} />)
        break;
      case "2":
        // RECORDED VIDEO
        setOpen(true)
        setContents(<ModalVideoLocal basic size="small" setOpen={modalClose} />)
        break;
      case "3":
        // RECORDED VIDEO
        setOpen(true)
        setContents(<ModalVideoLocal basic size="small" videoId={'7EpSBDPlZn4'} setOpen={modalClose} />)
        break;
      case "4":
        // RECORDED VIDEO
        setOpen(true)
        setContents(<ModalVideoLocal basic size="small" setOpen={modalClose} />)
        break;
      case "5":
        // LIVE STREAM
        setOpen(true)
        setContents(<ModalVideoLocal basic size="small" setOpen={modalClose} />)
        break;
      default:
        break;
    }
  }
  // const { userList, userCount } = useInfo("TrackB", `control-${username}`)
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
        shape: "rect",
        coords: [77, 265, 260, 439],
        preFillColor: "none",
        fillColor: "red"

      },
      {
        name: "5",
        shape: "rect",
        coords: [77, 265, 260, 439],
        preFillColor: "none",
        fillColor: "red"

      }
    ]
  }
  useEffect(() => {
    function handleResize() {
      setWidth(window.innerWidth * .5)

    }
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);



  return (

    <BlueBackground>
      
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
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}

        basic
      >
        {contents}
      </Modal>
      <Chat roomId={"B-Act1"} />
    </BlueBackground>
  )
}

const mapStateToProps = state => {
  return state
}

export default connect(mapStateToProps)(TrackB1)
