import React, { useEffect,useState } from 'react'
import * as APIUtil from '../util/session_api_util'
function BoxOffice(props){
    let [events,setEvents] = useState([])
    let [eventId, setEventId]= useState(0)
    let [attendees, setAttendees] = useState([])
    let [allUsers, setAllUsers] = useState([])
    let [disabledDB, setDisabledDb] = useState(true)
    useEffect(()=>{
        APIUtil.getAllEvents().then(resp => setEvents(resp.data.events))
        APIUtil.getAllUsers().then(resp => setAllUsers(resp.data.users.map(user=> user.ticketId)))
    },[])

    const submitHandler =(e)=>{
        e.preventDefault()
        APIUtil.getAttendees(eventId).then(resp => {
            let transformed = []
            for (let attendee in resp.data.tickets){
                transformed.push({...resp.data.tickets[attendee], ticketId: attendee})
            }
        setAttendees(transformed)
        })
    }
    const renderOptions = () =>{
            return events.map((event, idx) =>{
            return (
                <option key={idx} value={event.id}>{new Date(event.date).toLocaleString(undefined, { month: 'long', day: 'numeric', hour: 'numeric', timeZone: 'America/Los_Angeles' })}</option>
            )}
            )}
    const addToDb = (user)=>{
        APIUtil.lateSeat(user).then(resp=>console.log(resp))
    }
    const renderAttendees =() =>{
        if (attendees.length > 0){
            return attendees.map((attendee, idx)=>{
                let checkedIn = allUsers.includes(attendee.ticketId)
                return (
                    <tr key={idx} style={{color: checkedIn ? "green" : "red"}}>
                        <td>
                            {attendee.first_name}
                       </td>
                        <td>
                            {attendee.last_name}
                       </td>
                        <td>
                            {attendee.email}
                       </td>
                        <td>
                            {attendee.ticketId}
                       </td>
                       <td>
                           {checkedIn ? null : <button disabled={disabledDB} onClick={() => addToDb(attendee)}>Add To Database</button>}
                       </td>
                    </tr>)
            })
        }
    }
    return(
        <div>
            <form onSubmit={submitHandler}>
                <select onChange={(e)=> setEventId(e.target.value)}>
                    {events.length > 0 ?
                    renderOptions():

                    null}
                
                </select>
                <input type="submit" />
            </form>
            <button onClick={()=> setDisabledDb(!disabledDB)}>Toggle Add to Db</button>
            <table>
                    <thead>
                        <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Ticket ID</th>
                        <th>Late Seat?</th>
                    </tr>
                    </thead>
                <tbody>

            {renderAttendees()}
                </tbody>
            </table>
        </div>
    )
}

export default BoxOffice