import {Route, Switch} from 'react-router-dom'
import TrackA1 from './TrackA1'



function TrackARouter() {
  return (

      <Switch>
          <Route path="/TrackA" component={TrackA1} />
      </Switch>

  );
}

export default TrackARouter;
