import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import ImageMapper from 'react-image-mapper'
import { Modal } from 'semantic-ui-react'
import { useInfo } from '../actions/channelInfo'
import { CenterMap, BlueBackground } from '../Styles/Styles'
import TimeKeeper from '../Session/TimeKeeper'
import ThreeDTest from '../ThreeDTest'
import {chooseTrack } from '../actions/session_actions'
function Welcome(props) {
  const [open, setOpen] = useState(false)
  const [width, setWidth] = useState(window.innerWidth)
  const {username} = props.api.user
  const generateModal = (e) => {
    switch (e.name) {
      case "1":
        props.chooseTrack("A")
        props.history.push("/");
        break;
      case "2":
        props.chooseTrack("B")
        props.history.push("/");
        break;
      case "3":
        props.chooseTrack("C")
        props.history.push("/");
        break;
      case "4":
        props.chooseTrack("D")
        props.history.push("/");
        break;
      case "5":
        props.chooseTrack("E")
        props.history.push("/");
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
        coords: [295,301,289,224,301,87,542,114,514,355,385,337,336,322],
        preFillColor: "none",
        fillColor: "none",

      },
      {
        name: "2",
        shape: "poly",
        coords: [584,125,808,44,893,268,795,302,726,320,670,320,605,187],
        preFillColor: "none",
        fillColor: "none",

      },
      {
        name: "3",
        shape: "poly",
        coords: [172,463,403,384,481,610,359,650,292,658,258,660,212,560],
        preFillColor: "none",
        fillColor: "none"
      },
      {
        name: "4",
        shape: "poly",
        coords: [512,415,752,431,740,676,605,661,528,638,516,628,510,524,510,466],
        preFillColor: "none",
        fillColor: "none"
      },
      {
        name: "5",
        shape: "poly",
        coords: [990,302,1075,525,968,566,902,578,856,578,803,475,763,382],
        preFillColor: "none",
        fillColor: "none"
      }
    ]
  }
  let roomId = "Act0"
  
  let { userList, userCount } = useInfo(roomId, `control-${username}`)

  let maxWithSlop = (Math.ceil(userCount/5)+ 1 )
  if (userList.TrackA && userList.TrackA.length >= maxWithSlop){
    console.log("HERE")
      map.areas = map.areas.filter(area => area.name !== "1")
    }
  if (userList.TrackB && userList.TrackB.length >= maxWithSlop) {
      map.areas = map.areas.filter(area => area.name !== "2")
    }
  if (userList.TrackC && userList.TrackC.length >= maxWithSlop){
      map.areas = map.areas.filter(area => area.name !== "3")
    }

    if ( userList.TrackD && userList.TrackD.length >= maxWithSlop) {
      map.areas = map.areas.filter(area => area.name !== "5")
    }
  if (userList.trackE  && userList.TrackE.length >= maxWithSlop) {
      map.areas = map.areas.filter(area => area.name !== "6")
    }


  useEffect(() => {
    function handleResize() {
      setWidth(window.innerWidth )

    }
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);


  return (
    <BlueBackground>
      <TimeKeeper/>
      <CenterMap>
        <ImageMapper
          src={'https://dl.dropboxusercontent.com/s/pi9lngemsh75qqc/act_0_map_16x9.png?dl=0'}
          imgWidth={1280}

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
      </Modal>
      <ThreeDTest />
    </BlueBackground>

  )
}

const mapStateToProps = state => {
  return state
}
const mapDispatchToProps = dispatch =>{
  return {
    chooseTrack: track => dispatch(chooseTrack(track))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Welcome)
