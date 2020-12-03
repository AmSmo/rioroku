import { Pannellum } from "pannellum-react";



export default function ThreeDTest() {
    return (
        <div className="App">
            <Pannellum
                width="50%"
                height="500px"
                image={'./assets/miami.jpeg'}
                pitch={10}
                yaw={180}
                hfov={110}
                autoLoad
                showZoomCtrl={false}
            >

            </Pannellum>
        </div>)
        }