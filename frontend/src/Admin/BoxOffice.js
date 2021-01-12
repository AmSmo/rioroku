import React, { useEffect, useState } from 'react'
import * as APIUtil from '../util/session_api_util'
function BoxOffice(props) {
    let [events, setEvents] = useState([])
    let [eventId, setEventId] = useState(0)
    let [attendees, setAttendees] = useState([])
    let [allUsers, setAllUsers] = useState([])
    let [disabledDB, setDisabledDb] = useState(true)
    let [userLib, setUserLib] = useState({})

    const usersIntoHash = (users) => {
        let userHash = {}
        users.map(user => {
            userHash[user.ticketId] = {username: user.username, track: user.track}
        })
        setUserLib(userHash)
    }
    useEffect(() => {
        APIUtil.getAllEvents().then(resp => setEvents(resp.data.events))
        APIUtil.getAllUsers().then(resp => {
            usersIntoHash(resp.data.users)
            })
    }, [])

    const submitHandler = (e) => {
        e.preventDefault()
        APIUtil.getAttendees(eventId).then(resp => {
            let transformed = []
            for (let attendee in resp.data.tickets) {
                transformed.push({ ...resp.data.tickets[attendee], ticketId: attendee })
            }
            setAttendees(transformed)
        })
    }
    const renderOptions = () => {
        return events.map((event, idx) => {
            return (
                <option key={idx} value={event.id}>{new Date(event.date).toLocaleString(undefined, { month: 'long', day: 'numeric', hour: 'numeric', timeZone: 'America/Los_Angeles' })}</option>
            )
        }
        )
    }
    
    const addToDb = (user) => {
        APIUtil.lateSeat(user).then(resp => console.log(resp))
    }

    const makeTable = (tableId, filename) => {

        let dataType = 'application/vnd.ms-excel';
        let extension = '.xls';

        let base64 = function (s) {
            return window.btoa(unescape(encodeURIComponent(s)))
        };

        let template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>';
        let render = function (template, content) {
            return template.replace(/{(\w+)}/g, function (m, p) { return content[p]; });
        };

        let tableElement = document.getElementById(tableId);

        let tableExcel = render(template, {
            worksheet: filename,
            table: tableElement.innerHTML
        });

        filename = filename + extension;

        if (navigator.msSaveOrOpenBlob) {
            let blob = new Blob(
                ['\ufeff', tableExcel],
                { type: dataType }
            );

            navigator.msSaveOrOpenBlob(blob, filename);
        } else {
            let downloadLink = document.createElement("a");

            document.body.appendChild(downloadLink);

            downloadLink.href = 'data:' + dataType + ';base64,' + base64(tableExcel);

            downloadLink.download = filename;

            downloadLink.click();

        }
    }

const renderAttendees = () => {
    if (attendees.length > 0) {
        console.log(attendees[0].last_name.toLowerCase() > attendees[1].last_name.toLowerCase())
        let sorted = attendees.sort((a, b) => a.last_name.localeCompare(b.last_name))
        console.log(sorted)
        return sorted.map((attendee, idx) => {
            let checkedIn = !!userLib[attendee.ticketId]
            return (
                <tr key={idx} style={{ color: checkedIn ? "green" : "red" }}>
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
                    
                    
                        {checkedIn ? 
                        <>
                            <td>
                               {userLib[attendee.ticketId].username} </td> <td>{userLib[attendee.ticketId].track}</td></>: <><td></td><td></td><button disabled={disabledDB} onClick={() => addToDb(attendee)}>Add To Database</button></>}
                    
                </tr>)
        })
    }
}

return (
    <div>
        <form onSubmit={submitHandler}>
            <select onChange={(e) => setEventId(e.target.value)}>
                {events.length > 0 ?
                    renderOptions() :

                    null}

            </select>
            <input type="submit" />
        </form>
        <button onClick={() => setDisabledDb(!disabledDB)}>Toggle Add to Db</button>
        <button onClick={() => makeTable("tickets", new Date(events.find(selected=> selected.id === eventId).date).toLocaleString(undefined,
            { month: 'long', day: 'numeric', hour: 'numeric', timeZone: 'America/Los_Angeles' }))}>
            Export
            </button>
        <table id="tickets">
            <thead>
                <tr>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>Ticket ID</th>
                    <th>Username</th>
                    <th>Track</th>
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