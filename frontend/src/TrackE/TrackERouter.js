import {Route, Switch} from 'react-router-dom'
import TrackE1 from './TrackE1'



function TrackERouter() {
  return (

      <Switch>
          <Route path="/TrackE" component={TrackE1} />
      </Switch>

  );
}

export default TrackERouter;
