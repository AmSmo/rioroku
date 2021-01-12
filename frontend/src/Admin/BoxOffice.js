import React, { useEffect, useState } from 'react'
import * as APIUtil from '../util/session_api_util'
function BoxOffice(props) {
    let [events, setEvents] = useState([])
    let [eventId, setEventId] = useState(0)
    let [attendees, setAttendees] = useState([])
    let [allUsers, setAllUsers] = useState([])
    let [disabledDB, setDisabledDb] = useState(true)
    useEffect(() => {
        APIUtil.getAllEvents().then(resp => setEvents(resp.data.events))
        APIUtil.getAllUsers().then(resp => setAllUsers(resp.data.users.map(user => user.ticketId)))
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
        return attendees.map((attendee, idx) => {
            let checkedIn = allUsers.includes(attendee.ticketId)
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
                    <td>
                        {checkedIn ? null : <button disabled={disabledDB} onClick={() => addToDb(attendee)}>Add To Database</button>}
                    </td>
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