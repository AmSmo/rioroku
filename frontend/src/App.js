import { Route, Switch } from 'react-router-dom'
import { useState } from 'react'
import AdminRoutes from './Routes/AdminRoutes'
import AudienceTestRoutes from './Routes/AudienceTestRoutes'

import Login from './Session/Login'

import { connect } from 'react-redux'
import UserHelp from './Chat/UserHelp'
import { HelpButton, BottomRight } from './Styles/Styles'



function App(props) {
  const { isAuthenticated } = props
  const [needHelp, setNeedHelp] = useState(false)
  const changeNeed = () => {
    setNeedHelp(false)
  }

  let admin
  if (props.user) {
    admin = props.user.admin
  }
  return (


    isAuthenticated ?
      <>
        {admin ?
          <AdminRoutes />
          :
          <>
            <AudienceTestRoutes />
            {needHelp ?
              <BottomRight>
                <UserHelp changeNeed={changeNeed} time={new Date()} />
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
        }


      </>
      :
      <Switch>
        <Route path="/" component={Login} />
      </Switch>



  )
}
const mapStateToProps = state => {
  return state.api
}
export default connect(mapStateToProps)(App);
