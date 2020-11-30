import React from 'react'
import TimerKeeper from '../Session/TimeKeeper'
import YouTube from 'react-youtube'
import ModalVideoLocal from '../modals/ModalVideoLocal'
function Rolled(props) {

    return (
        <>
        <TimerKeeper />
        <ModalVideoLocal basic size="small" videoId={'https://storage.googleapis.com/rio_reveal/LAyeas.mov'}  />
        </>
    )
}

export default  (Rolled)