import React, { useEffect} from 'react'
import { Button } from 'semantic-ui-react'

function Modal2(props) {
    const playAudio = () => {
        const audioEl = document.getElementsByClassName("audio-element")[0]
        audioEl.play()
    }

    useEffect(()=>{playAudio()}, [])
    return (
        <center>
        <div onClick={null} >
                <Button.Group vertical labeled icon>
                    <Button icon='play' content='Play' onClick={playAudio} />
                    <Button icon='pause' content='Pause' />
                    <Button icon='shuffle' content='Shuffle' />
                </Button.Group>
                <audio className="audio-element">
                    <source src="https://assets.coderrocketfuel.com/pomodoro-times-up.mp3"></source>
                </audio>
            
        </div>
        </center>
    )
}

export default Modal2