import React, { useEffect,useState } from 'react'
import * as APIUtil from '../util/session_api_util'
function BoxOffice(props){
    let [events,SetEvents] = useState([])
    useEffect(()=>{
        APIUtil.getAllEvents().then(resp => { console.log(resp.data)})
    })
    return(
        <div>
            Box Office

        </div>
    )
}

export default BoxOffice