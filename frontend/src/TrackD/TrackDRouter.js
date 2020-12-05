import TrackD1 from './TrackD1'
import TrackD2 from './TrackD2'
import TrackD3 from './TrackD3'
import TrackD4 from './TrackD4'
import TrackD5 from './TrackD5'
import TimeKeeper from '../Session/TimeKeeper'
import { useState } from 'react'


function TrackDRouter() {
  const [act, setAct] = useState(1)
  const changeAct = (newAct) => {
    setAct(newAct)
  }
  console.log("meow", act)
  const where = () => {
    switch (act) {
      case 1:
        return <TrackD1 />;
      case 2:
        return <TrackD2 />;
      case 3:
        return <TrackD3 />;
      case 4:
        return <TrackD4 />;
      case 5:
        return <TrackD5 />;
    }
  }

  return (
    <>
      <TimeKeeper track={"D"} changeAct={changeAct} />
      {where()}

    </>
  );
}

export default TrackDRouter;
