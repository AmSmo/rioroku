import TrackE1 from './TrackE1'
import TrackE2 from './TrackE2'
import TrackE3 from './TrackE3'
import TrackE4 from './TrackE4'
import TrackE5 from './TrackE5'
import TimeKeeper from '../Session/TimeKeeper'
import { useState } from 'react'


function TrackERouter() {
  const [act, setAct] = useState(1)
  const changeAct = (newAct) => {
    setAct(newAct)
  }
  console.log("meow", act)
  const where = () => {
    switch (act) {
      case 1:
        return <TrackE1 />;
      case 2:
        return <TrackE2 />;
      case 3:
        return <TrackE3 />;
      case 4:
        return <TrackE4 />;
      case 5:
        return <TrackE5 />;
    }
  }

  return (
    <>
      <TimeKeeper track={"E"} changeAct={changeAct} />
      {where()}

    </>
  );
}

export default TrackERouter;
