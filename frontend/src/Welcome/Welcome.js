import React, {useState, useEffect} from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import ImageMapper from 'react-image-mapper'
import { Modal } from 'semantic-ui-react'
import Modal1 from '../Map1/Modals/Modal1'
import Modal2 from '../Map1/Modals/Modal2'

function Welcome(props){
    const [open, setOpen] = useState(false)
    const [contents, setContents] = useState(null)
    
    const modalClose = () => {
        setOpen(false)
    }
    const generateModal = (e) =>{
        switch (e.name){
            case "1":
                setOpen(true)
                setContents(<Modal1 basic size="small" setOpen={modalClose}/>)
                break;
            case "2":
                setOpen(true)
                setContents(<Modal2 basic size="small" setOpen={modalClose} />)
                break;
            default:
                break;
        }
    }

    const map = {name: "map1",
areas: [
    {name: "1", 
        shape: "poly", 
        coords:[204, 257, 330, 211, 279, 91, 166, 136, 190, 208, 195, 231],
         fillColor: "none"
    },
    {name: "2",
        shape:"rect",
        coords: [648, 531, 526, 406],
        preFillColor: "none", fillColor: "blue"},
    {name: "3",
        shape:"poly",
        coords: [805, 539, 909, 476, 847, 373, 743, 432],
        preFillColor: "none", fillColor: "blue"}
]}
    if(props.time > 20){
        props.history.push("/rolled")}
    return(
        <Background>
            <h1>{props.time}</h1>
            <ImageMapper 
                src={'/assets/backgrounds/Map1.png'}
                width={1250}
                onClick={e=> generateModal(e)}
                map={map}

            />
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

export default connect(mapStateToProps)(Welcome)

const Background = styled.div`
background:url('/assets/backgrounds/Rio.png');
background-size: contain;
background-repeat: no-repeat;
height: 100vh;
width: 100vw;`