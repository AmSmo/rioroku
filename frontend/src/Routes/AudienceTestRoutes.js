import { Route, Switch } from 'react-router-dom'
import React, {useState} from 'react'
import Allison from '../Admin/Allison'
import Start from '../Act0/Map1'
import SMDesk from '../Admin/SMDesk'
import TrackARouter from '../TrackA/TrackARouter'
import TrackBRouter from '../TrackB/TrackBRouter'
import TrackCRouter from '../TrackC/TrackCRouter'
import TrackDRouter from '../TrackD/TrackDRouter'
import TrackERouter from '../TrackE/TrackERouter'
import { connect } from 'react-redux'
import UserHelp from '../Chat/UserHelp'
import { HelpButton, BottomRight } from '../Styles/Styles'

import BoxOffice from '../Admin/BoxOffice'

function AudienceTestRoutes(props) {
    
    const [needHelp, setNeedHelp] = useState(false)
    const changeNeed = () => {
        setNeedHelp(!needHelp)
    }
    const {track} = props.game.info
    const where = () => {
    switch (track){
        case "A":
            return TrackARouter
        case "B":
            return TrackBRouter
        case "C":
            return TrackCRouter
        case "D":
            return TrackDRouter
        case "E":
            return TrackERouter
        case "":
            return Start
        default:
            return Start
    }}
    
    return (
        <>
            <Route path='BoxOffice' component={BoxOffice} />
            <Route path='/SMDesk' component={SMDesk} />
            <Route path='/Allison' component={Allison} />
            <Route path="/" component={where()} />
        
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
    return state
}
export default connect(mapStateToProps)(AudienceTestRoutes);
