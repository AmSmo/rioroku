import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import ImageMapper from 'react-image-mapper'
import { Modal } from 'semantic-ui-react'
import { HelpButton } from '../Styles/Styles'
import UserHelp from '../Chat/UserHelp'
import Chat from '../Chat/Chat'
function Welcome(props) {
  const [open, setOpen] = useState(false)
  const [contents, setContents] = useState(null)
  const [needHelp, setNeedHelp] = useState(false)
  console.log("welcome", props)

  const changeNeed = () => {
    setNeedHelp(false)
  }

  const modalClose = () => {
    setOpen(false)
  }
  const generateModal = (e) => {
    switch (e.name) {
      case "1":
        props.history.push("/TrackA");
        break;
      case "2":
        props.history.push("/TrackB");
        break;
      case "3":
        props.history.push("/TrackC");
        break;
      case "4":
        props.history.push("/TrackD");
        break; 
      case "5":
        props.history.push("/TrackE");
        break;
      default:
        break;
    }
  }

  const map = {
    name: "map1",
    areas: [
      {
        name: "1",
        shape: "poly",
        coords: [260, 175, 498, 206, 470, 442, 347, 424, 250, 391, 249, 289],
        preFillColor: "none",
        fillColor: "none",

      },
      {
        name: "2",
        shape: "poly",
        coords: [536, 214, 765, 128, 848, 357, 733, 398, 675, 406, 627, 408],
        preFillColor: "none",
        fillColor: "none",

      },
      {
        name: "3",
        shape: "poly",
        coords: [129, 550, 357, 472, 438, 698, 278, 745, 214, 746],
        preFillColor: "none",
        fillColor: "none"
      },
      {
        name: "4",
        shape: "poly",
        coords: [469, 505, 708, 518, 695, 759, 584, 752, 505, 733, 471, 718],
        preFillColor: "none",
        fillColor: "none"
      },
      {
        name: "5",
        shape: "poly",
        coords: [723, 473, 948, 386, 1031, 615, 930, 650, 864, 667, 811, 666, 763, 576],
        preFillColor: "none",
        fillColor: "none"
      }
    ]
  }

  let width = window.innerWidth * 0.6
  return (
    <Background className="fade-in color-change-2x">

    
      <div className="sidebar" onMouseOver={()=> openSidebar()} onMouseOut={()=> closeSiderBar()}>
        <Chat roomId={"Act0"} />
      </div>
      <div className="center_map">
        <ImageMapper
          src={'https://dl.dropboxusercontent.com/s/h5kf351m71ljaf5/act_0_map.png?dl=0'}
          imgWidth={1200}
          width={width}
          onClick={e => generateModal(e)}
          map={map}
          style={{zIndex: "2", position: "relative"}}
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
      {needHelp ?
        <BottomRight>
          <UserHelp changeNeed={changeNeed}/>
        </BottomRight>
        :
        <HelpButton style={{
          right: "10px",
          bottom: "5px"
        }}
          onClick={() => setNeedHelp(true)}>
          Help
                        </HelpButton>
      }
    </Background>
  )
}

const mapStateToProps = state => {
  return state
}

export default connect(mapStateToProps)(Welcome)

const Background = styled.div`
  background: #4287f5;
  top: 16px;
  height: 94.5vh;
`

const BottomRight = styled.div`
    position: fixed;
    right: 10px;
    bottom: 10px;
`
const TopRight = styled.div`
    position: absolute;
    top: 50px;
    right: 0px;
    border: 0.4px solid grey;
    background: white;
`