import { Route, Switch } from 'react-router-dom'
import { useState } from 'react'
import Allison from './Admin/Allison'

import SMDesk from './Admin/SMDesk'
import { connect } from 'react-redux'


function AllisonRoutes(props) {
    return (
        <Switch>
            <Route path='/SMDesk' component={SMDesk} />
            <Route path='/' component={Allison} />
        </Switch>)

}
const mapStateToProps = state => {
    return state.api
}
export default connect(mapStateToProps)(AllisonRoutes);
