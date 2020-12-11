import { PannellumVideo, Pannellum } from "pannellum-react";
import {ReactPlayer} from 'react-player'


export default function ThreeDTest() {
    return (
        <div style={{display: "flex"}}>
            <PannellumVideo
                width="50%"
                height="500px"
                loop
                video={'./assets/3dtest.mp4'}
                autoLoad
                showZoomCtrl={false}
            >

            </PannellumVideo>
            <Pannellum
            width="50%"
            height="500px"
            image={'./assets/miami.jpeg'}
            ></Pannellum>
        </div>

        
        )
        }