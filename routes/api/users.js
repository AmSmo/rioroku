const express = require("express");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const router = express.Router();
const passport = require('passport');
const User = require('../../models/User');
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');
const eventbrite = require("eventbrite").default
const apiFunctions = require("../../config/eventbrite_parser")
const sdk = eventbrite({ token: keys.eventbriteAuth });

router.get('/getAllUsers', passport.authenticate('jwt', {session: false}), (req, res) =>{
    User.find({admin: false, audience: false, alison: false}).then(data=>{
        res.json({users: data})
    }
    )
})

router.post('/lateSeat', passport.authenticate('jwt', {session: false}), (req, res) =>{
    let ID = function () {
        return Math.random().toString().substr(2, 5);
    };
    let {attendee} = req.body
    let fullName = attendee.name
    let username = fullName + " "+ ID()
    const userObj = {fulllName: attendee.name, email: attendee.email, username, ticketId: attendee.ticketId }
    console.log(userObj)
})

router.post('/current', passport.authenticate('jwt', { session: false }), (req, res) => {
    res.json({
        id: req.user.id,
        username: req.user.username,
        email: req.user.email,
        admin: req.user.admin
    });
})

router.post('/updateUserTrack', passport.authenticate('jwt', { session: false }), (req, res) => {
    let user = req.user
    let { track } = req.body
    user.updateOne({ track })
        .then(resp => console.log(resp))
})

router.post('/register', (req, res) => {

    const { ticketId, eventId, doorsOpen } = req.body
    const { errors, isValid } = validateRegisterInput(req.body);
    if (!isValid) {
        return res.status(400).json(errors);
    }
    
    User.findOne({ ticketId })
        .then(user => {
            
            if (user && user.admin || user && user.audience){
                const payload = { id: user.id, ticketId: user.ticketId };
                jwt.sign(payload, keys.secretOrKey, { expiresIn: 9000 }, (err, token) => {
                    res.json({
                        success: true,
                        token: "Bearer " + token,
                        user: user
                    })
                })
            }else if (user) {
                
                errors.ticketId = 'Ticket has already been used'
                return res.status(400).json(errors)
            } else {
                
                sdk.request(`/events/${eventId}/attendees/`)
                .then(resp => {
                    let organizedResponse = apiFunctions.getUsers(resp)
                    if (organizedResponse[req.body.ticketId] && doorsOpen) {
                        const newUser = new User({
                            ticketId: req.body.ticketId,
                        })
                        newUser.save()
                            .then(user => {
                                let infoBack = organizedResponse[req.body.ticketId]
                                infoBack.ticketId = req.body.ticketId
                                infoBack.fullName = infoBack.name
                                const payload = { id: user.id, ticketId: user.ticketId};
                                jwt.sign(payload, keys.secretOrKey, { expiresIn: 9000 }, (err, token) => {
                                    res.json({
                                        success: true,
                                        token: "Bearer " + token,
                                        user: infoBack
                                    })
                                })
                            })
                            .catch(err => res.json({ error: (err) }));
                    } else if (organizedResponse[req.body.ticketId]) {
                        res.json({ error: `Welcome! The “doors” open at 15 minutes prior to the show. We’ll see you back then...` })
                    } else {
                        res.json({ error: "The number you have entered is not valid for this performance, please check that it is entered correctly." })
                    }
                }
                )
                .catch(e => res.json(e))
            }
        })







})

router.post('/login', (req, res) => {
    const { errors, isValid } = validateLoginInput(req.body);
    
    if (!isValid) {
        return res.status(400).json(errors);
    }
    const { ticketId, username, fullName, email } = req.body
    
    User.findOneAndUpdate({ ticketId }, { username, fullName: fullName, email } )
            .then(user=> {
            const payload = { id: user.id, username: user.username };
            jwt.sign(
                payload,
                keys.secretOrKey,
                { expiresIn: 9000 },
                (err, token) => {
                return res.json({
                        success: true,
                        token: 'Bearer ' + token,
                        user: {username, fullName, admin:user.admin}
                    });
                });})
        .catch(err => {
            errors.duplicate = err
            return res.status(400).json(errors)
        });
}
)

module.exports = router;