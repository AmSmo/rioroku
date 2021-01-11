const express = require("express");
const router = express.Router();
const eventbrite = require("eventbrite").default
const keys = require('../../config/keys');
const apiFunctions = require("../../config/eventbrite_parser")
const sdk = eventbrite({token: keys.eventbriteAuth});

const getUsers = async (eventId, page)=>{
    let attendees = []
    let pageCount = 1
    let answer = await sdk.request(`/events/${eventId}/attendees/?page=${page}`)
    .then(resp => {
        pageCount = resp["pagination"]["page_count"]
        attendees.push(...resp.attendees)
        
    }).then(resp => {
        
        if (page < pageCount){
           page +=1    
           return getUsers(eventId, page).then(resp => attendees.push(...resp))
           
        }
    }).then(resp=> {
        return attendees})
    .catch(e=> res.json(e))
    return answer
    }


router.post("/attendees", (req, res) => {
    getUsers(req.body.eventId, 1).then(resp => {
        
        res.json({tickets: apiFunctions.getUsers(resp)})}).catch(e=> console.log(e))
    
    
});
// organization id: 216034158017

router.get("/events", (req, res) => {
    
    sdk.request('/organizations/216034158017/events/?time_filter=current_future')
    .then(resp => {
    res.json({ events : apiFunctions.getEventList(resp) })})
    .catch(e=>res.json(e))
});

router.get("/allevents", (req, res) => {
    sdk.request('/organizations/216034158017/events/?page_size=1000')
    .then(resp => {
        let rio = apiFunctions.getEventList(resp).filter(date=> {
            return new Date(date.date) > new Date("1-1-2021")})
    res.json({ events : rio })})
    .catch(e=>res.json(e))
});



module.exports = router;