import { Route, Switch } from 'react-router-dom'
import React, {useState} from 'react'
import Allison from '../Admin/Allison'
import Start from '../Act0/Map1'

import TrackA2 from '../TrackA/TrackA2'

import SMDesk from '../Admin/SMDesk'
import TrackARouter from '../TrackA/TrackARouter'
import TrackBRouter from '../TrackB/TrackBRouter'
import TrackCRouter from '../TrackC/TrackCRouter'
import TrackDRouter from '../TrackD/TrackDRouter'
import TrackERouter from '../TrackE/TrackERouter'
import { connect } from 'react-redux'
import UserHelp from '../Chat/UserHelp'
import { HelpButton, BottomRight } from '../Styles/Styles'


function AudienceTestRoutes(props) {
    const [needHelp, setNeedHelp] = useState(false)
    const changeNeed = () => {
        setNeedHelp(!needHelp)
    }




    return (
        <>
        <Switch>

            <Route path='/SMDesk' component={SMDesk} />
            <Route path='/Allison' component={Allison} />
            <Route path="/TrackA2" component={TrackA2} />
            <Route path="/TrackA" component={TrackARouter} />
            <Route path="/TrackB" component={TrackBRouter} />
            <Route path="/TrackC" component={TrackCRouter} />
            <Route path="/TrackD" component={TrackDRouter} />
            <Route path="/TrackE" component={TrackERouter} />
            <Route path="/" component={Start} />
        </Switch>
        {
        needHelp ?
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
        )

}
const mapStateToProps = state => {
    return state.api
}
export default connect(mapStateToProps)(AudienceTestRoutes);
