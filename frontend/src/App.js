import {Route, Switch} from 'react-router-dom'
import {useState} from 'react'
import NavBar from './Navbar/Navbar'
import AudienceNavBar from './Navbar/AudienceNavBar'
import Start from './Act0/Map1'
import Rolled from './Rolled/Rolled'
import Login from './Session/Login'
import HelpDesk from './Admin/HelpDesk'
import TrackARouter from './TrackA/TrackARouter'
import TrackBRouter from './TrackB/TrackBRouter'
import TrackCRouter from './TrackC/TrackCRouter'
import TrackDRouter from './TrackD/TrackDRouter'
import TrackERouter from './TrackE/TrackERouter'
import {connect} from 'react-redux'
import UserHelp from './Chat/UserHelp'
import { HelpButton , BottomRight } from './Styles/Styles'
function App(props) {
  const {isAuthenticated } = props
  const [needHelp, setNeedHelp] = useState(false)
  const changeNeed = () => {
    setNeedHelp(false)
  }

  let admin
  if(props.user){
    admin = props.user.admin
  }
  return (
    <div className="App">
      
        <>
          {isAuthenticated ?<>
      {admin ? 
        <NavBar />

      :
        <AudienceNavBar />
      }
          <Switch>
            {admin ?
           <Route path='/HelpDesk' component={HelpDesk} />
           :
           null
          }
              <Route path="/rolled" component={Rolled} />
              <Route path="/TrackA" component={TrackARouter} />
              <Route path="/TrackB" component={TrackBRouter} />
              <Route path="/TrackC" component={TrackCRouter} />
              <Route path="/TrackD" component={TrackDRouter} />
              <Route path="/TrackE" component={TrackERouter} />

              <Route path="/" component={Start} />


          </Switch>
          {needHelp ?
            <BottomRight>
              <UserHelp changeNeed={changeNeed} />
            </BottomRight>
            :
            <HelpButton style={{
              right: "10px",
              bottom: "5px"
            }}
              onClick={() => setNeedHelp(true)}>
              Help
                        </HelpButton>
          }
          </>
          :
          <Switch>
            <Route path="/" component={Login} />
          </Switch>
          }
        </>

    </div>
  );
}
const mapStateToProps = state =>{
  return state.api
}
export default connect(mapStateToProps)(App);
