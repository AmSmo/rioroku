import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import ImageMapper from 'react-image-mapper'
import { Modal } from 'semantic-ui-react'
import Chat from '../Chat/Chat'
import { useInfo } from '../actions/channelInfo'
import UserList from '../Chat/UserList'
import { CenterMap, BlueBackground } from '../Styles/Styles'
import TimeKeeper from '../Session/TimeKeeper'
function Welcome(props) {
  const [open, setOpen] = useState(false)
  const [contents, setContents] = useState(null)
  const [sideBar, setSideBar] = useState({ width: "50px" })
  const [hidden, setHidden] = useState(true)
  const [width, setWidth] = useState(window.innerWidth * 0.6)

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
  let roomId = "Act0"
  let { userList, userCount } = useInfo(roomId, props.username)

  if (userList.TrackA)
    if (userList.TrackA.length > 5) {
      map.areas = map.areas.filter(area => area.name !== "1")
    }
  useEffect(() => {
    function handleResize() {
      setWidth(window.innerWidth * .6)

    }
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);


  return (
    <BlueBackground>
      <TimeKeeper/>

      <UserList users={userList[roomId]} roomId={roomId}  />

      <div className="sidebar"
        style={sideBar}
        onMouseOver={() => {
          setSideBar({ width: "200px", opacity: "1", marginRight: "25px", boxShadow: "5px 5px black" })
          setHidden(false)
        }}
        onMouseOut={() => {
          setSideBar({ width: "50px", right: "0px" })
          setHidden(true)
        }}
      >
        <Chat roomId={"Act0"} hidden={hidden} />
      </div>
      <CenterMap>
        <ImageMapper
          src={'https://dl.dropboxusercontent.com/s/h5kf351m71ljaf5/act_0_map.png?dl=0'}
          imgWidth={1200}
          width={width}
          onClick={e => generateModal(e)}
          map={map}
          style={{ zIndex: "2", position: "relative"}}
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
      {"STUFF",   console.log(props.game)}
    </BlueBackground>
    
  )
}

const mapStateToProps = state => {
  return state
}

export default connect(mapStateToProps)(Welcome)
