import {Route, Switch} from 'react-router-dom'
import TrackA1 from './TrackA1'
import TrackA2 from './TrackA2'



function TrackARouter() {
  return (

      <Switch>
          <Route path="/TrackA" component={TrackA1} />
          <Route path="/TrackA" component={TrackA2} />
      </Switch>

  );
}

export default TrackARouter;
