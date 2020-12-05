import TrackB1 from './TrackB1'
import TrackB2 from './TrackB2'
import TrackB3 from './TrackB3'
import TrackB4 from './TrackB4'
import TrackB5 from './TrackB5'
import TimeKeeper from '../Session/TimeKeeper'
import { useState } from 'react'


function TrackBRouter() {
  const [act, setAct] = useState(1)
  const changeAct = (newAct) => {
    setAct(newAct)
  }
  console.log("meow", act)
  const where = () => {
    switch (act) {
      case 1:
        return <TrackB1 />;
      case 2:
        return <TrackB2 />;
      case 3:
        return <TrackB3 />;
      case 4:
        return <TrackB4 />;
      case 5:
        return <TrackB5 />;
    }
  }

  return (
    <>
      <TimeKeeper track={"B"} changeAct={changeAct} />
      {where()}

    </>
  );
}

export default TrackBRouter;
