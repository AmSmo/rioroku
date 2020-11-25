import {Route, Switch} from 'react-router-dom'
import TrackD1 from './TrackD1'



function TrackDRouter() {
  return (

      <Switch>
          <Route path="/TrackD" component={TrackD1} />
      </Switch>

  );
}

export default TrackDRouter;
