import {Route, Switch} from 'react-router-dom'
import TrackC1 from './TrackC1'



function TrackCRouter() {
  return (

      <Switch>
          <Route path="/" component={TrackC1} />
      </Switch>

  );
}

export default TrackCRouter;
