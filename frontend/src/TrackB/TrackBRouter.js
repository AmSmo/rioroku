import {Route, Switch} from 'react-router-dom'
import TrackB1 from './TrackB1'



function TrackBRouter() {
  return (

      <Switch>
          <Route path="/TrackB" component={TrackB1} />
      </Switch>

  );
}

export default TrackBRouter;
