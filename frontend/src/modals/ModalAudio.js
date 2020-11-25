import React, { useEffect} from 'react'
import { Button } from 'semantic-ui-react'

function ModalAudio(props) {
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
    <Button icon='pause' content='Pause' onClick={pauseAudio}/>
    <Button icon='stop' content='Stop' onClick={stopAudio}/>
    </Button.Group>

    <audio className="audio-element">
    <source src={props.audioId}></source>
    </audio>

    </div>
    </center>
  )
}
export default ModalAudio;

function pauseAudio() {
  var x = document.getElementsByClassName("audio-element")[0];
  x.pause();
  console.log("pause");
}

function stopAudio(){
  var x = document.getElementsByClassName("audio-element")[0];
  x.pause();
  x.currentTime = 0;
  console.log("stop");
}
