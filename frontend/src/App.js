import {Route, Switch} from 'react-router-dom'
import './App.css';
import NavBar from './Navbar/Navbar'
import Start from './Act0/Map1'
import Rolled from './Rolled/Rolled'
import Login from './Session/Login'
import TrackARouter from './TrackA/TrackARouter'
import TrackBRouter from './TrackB/TrackBRouter'
import TrackCRouter from './TrackC/TrackCRouter'
import TrackDRouter from './TrackD/TrackDRouter'
import TrackERouter from './TrackE/TrackERouter'
import {connect} from 'react-redux'

function App(props) {
  const {isAuthenticated} = props
  return (
    <div className="App">
      <NavBar />
      {isAuthenticated?
      <Switch>
          <Route path="/rolled" component={Rolled} />
          <Route path="/TrackA" component={TrackARouter} />
          <Route path="/TrackB" component={TrackBRouter} />
          <Route path="/TrackC" component={TrackCRouter} />
          <Route path="/TrackD" component={TrackDRouter} />
          <Route path="/TrackE" component={TrackERouter} />

          <Route path="/" component={Start} />


      </Switch>
      :
        <Switch>
          <Route path="/" component={Login} />
        </Switch>
}
    </div>
  );
}
const mapStateToProps = state =>{
  return state.api
}
export default connect(mapStateToProps)(App);
