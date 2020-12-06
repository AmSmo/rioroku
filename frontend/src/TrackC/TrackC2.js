import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import ImageMapper from 'react-image-mapper'
import { Modal } from 'semantic-ui-react'
import ModalVideoLocal from '../modals/ModalVideoLocal'
import ModalAudio from '../modals/ModalAudio'
import { CenterMap, BlueBackground } from '../Styles/Styles'
import { useInfo } from '../actions/channelInfo'
function TrackC2(props) {
    const [open, setOpen] = useState(false)
    const [contents, setContents] = useState(null)
    const [width, setWidth] = useState(window.innerWidth * 0.5)
    const { username } = props.api.user
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
                // RECORDED VIDEO
                setOpen(true)
                setContents(<ModalVideoLocal basic size="small" setOpen={modalClose} />)
                break;
            case "6":
                // RECORDED VIDEO
                setOpen(true)
                setContents(<ModalVideoLocal basic size="small" videoId={'7EpSBDPlZn4'} setOpen={modalClose} />)
                break;
            case "7":
                // RECORDED VIDEO
                setOpen(true)
                setContents(<ModalVideoLocal basic size="small" videoId={'7EpSBDPlZn4'} setOpen={modalClose} />)
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
                coords: [204, 257, 330, 211, 279, 91, 166, 136, 190, 208, 195, 231],
                fillColor: "none"
            },
            {
                name: "2",
                shape: "rect",
                coords: [648, 531, 526, 406],
                preFillColor: "none",
                fillColor: "blue"
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
                coords: [648, 531, 526, 406],
                preFillColor: "none",
                fillColor: "blue"
            },

            {
                name: "5",
                shape: "rect",
                coords: [77, 265, 260, 439],
                preFillColor: "none",
                fillColor: "red"

            },
            {
                name: "6",
                shape: "rect",
                coords: [648, 531, 526, 406],
                preFillColor: "none",
                fillColor: "blue"
            },

            {
                name: "7",
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

    const { userList, userCount } = useInfo("C-Act2", `control-${username}`)

    return (
        <BlueBackground>
            <CenterMap>
                <ImageMapper
                    src={'https://dl.dropboxusercontent.com/s/3jncw5ztorvep3n/clue%20board.jpg?dl=0'}
                    imgWidth={1250}
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
        </BlueBackground>
    )
}

const mapStateToProps = state => {
    return state
}

export default connect(mapStateToProps)(TrackC2)
