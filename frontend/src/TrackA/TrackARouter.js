import TrackA1 from './TrackA1'
import TrackA2 from './TrackA2'
import TrackA3 from './TrackA3'
import TrackA4 from './TrackA4'
import TimeKeeper from '../Session/TimeKeeper'
import {useState} from 'react'


function TrackARouter() {
  const [act,setAct] = useState(1)
  const changeAct = (newAct) => {
    setAct(newAct)
  }

  const where = () =>{
    switch (act){
      case 1:
        return <TrackA1 />;
      case 2:
        return <TrackA2 />;
      case 3:
        return <TrackA3 />;
      case 4:
        return <TrackA4 />;
      default:
        return <TrackA1 />
  }
  }
  
  return (
      <>
        <TimeKeeper track={"A"} changeAct={changeAct} />
        {where()}
      
      </>
  );  
}

export default TrackARouter;
