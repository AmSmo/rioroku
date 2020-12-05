import TrackC1 from './TrackC1'
import TrackC2 from './TrackC2'
import TrackC3 from './TrackC3'
import TrackC4 from './TrackC4'
import TrackC5 from './TrackC5'
import TimeKeeper from '../Session/TimeKeeper'
import { useState } from 'react'


function TrackCRouter() {
  const [act, setAct] = useState(1)
  const changeAct = (newAct) => {
    setAct(newAct)
  }
  console.log("meow", act)
  const where = () => {
    switch (act) {
      case 1:
        return <TrackC1 />;
      case 2:
        return <TrackC2 />;
      case 3:
        return <TrackC3 />;
      case 4:
        return <TrackC4 />;
      case 5:
        return <TrackC5 />;
    }
  }

  return (
    <>
      <TimeKeeper track={"C"} changeAct={changeAct} />
      {where()}

    </>
  );
}

export default TrackCRouter;
