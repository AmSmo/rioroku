import { PannellumVideo, Pannellum } from "pannellum-react";

function ModalThreeD(props) {
    return (
        <>
            <PannellumVideo
                width="100%"
                height="500px"
                video={props.video}
                pitch={10}
                yaw={180}
                hfov={110}
                autoLoad
                showZoomCtrl={false}
             >  

            </PannellumVideo>
      </>
        )
}

export default ModalThreeD