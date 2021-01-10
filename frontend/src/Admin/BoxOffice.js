import React, { useEffect,useState } from 'react'
import * as APIUtil from '../util/session_api_util'
function BoxOffice(props){
    let [events,setEvents] = useState([])
    let [eventId, setEventId]= useState(0)
    let [attendees, setAttendees] = useState([])
    useEffect(()=>{
        APIUtil.getAllEvents().then(resp => setEvents(resp.data.events))
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
                <option key={idx} value={event.id}>{event.date}</option>
            )}
            )}

    const renderAttendees =() =>{
        if (attendees.length > 0){
            
            return attendees.map((attendee, idx)=>{
                console.log("LLSAD",attendee)
                return (
                    <tr key={idx}>
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
            <table>
                    <thead>
                        <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Ticket ID</th>
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