import { Route, Switch } from 'react-router-dom'
import AdminRoutes from './Routes/AdminRoutes'
import AudienceTestRoutes from './Routes/AudienceTestRoutes'
import Login from './Session/Login'

import { connect } from 'react-redux'
import Test from './Test'
function App(props) {
  const { isAuthenticated } = props
  

  let admin
  if (props.user) {
    admin = props.user.admin
  }
  
  return (


    isAuthenticated ?
      <>
        {admin ?
        <>
        
        <AdminRoutes />
        </>
        :
        <>
        
          
            <AudienceTestRoutes />
        </>
        }


      </>
      :
      
      <Switch>
        
        <Route path="/test" component={Test}/>
        <Route path="/" component={Login} />
        
      </Switch>

        
  )
}
const mapStateToProps = state => {
  return state.api
}
export default connect(mapStateToProps)(App);
