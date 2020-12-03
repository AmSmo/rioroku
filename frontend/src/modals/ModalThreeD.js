import { PannellumVideo, Pannellum } from "pannellum-react";

function ModalThreeD(props) {
    return (
        <>
            <PannellumVideo
                width="100%"
                height="500px"
                video={"./assets/3dtest.mp4"}
                pitch={10}
                yaw={180}
                hfov={110}
                autoLoad
                showZoomCtrl={false}
             >  

                <Pannellum.Hotspot
                    // type="custom"
                    // pitch={31}
                    // yaw={150}
                    // handleClick={(evt, name) => this.hanldeClick(name)}
                    // name="hs1"
                />
            </PannellumVideo>
      </>
        )
}

export default ModalThreeD