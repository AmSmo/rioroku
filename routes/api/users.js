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


router.post('/current', passport.authenticate('jwt', { session: false }), (req, res) => {
    res.json({
        id: req.user.id,
        username: req.user.username,
        email: req.user.email,
        admin: req.user.admin
    });
})
router.post('/register', (req, res) => {

    const {ticketId, eventId} = req.body
    const { errors, isValid } = validateRegisterInput(req.body);
    if (!isValid) {
        return res.status(400).json(errors);
    }
    
    User.findOne({ ticketId })
        .then(user => {
            
            if (user && user.admin){
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
                    if (organizedResponse[req.body.ticketId]) {
                        const newUser = new User({
                            ticketId: req.body.ticketId,
                        })
                        newUser.save()
                            .then(user => {
                                let infoBack = organizedResponse[req.body.ticketId]
                                infoBack.ticketId = req.body.ticketId
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
                    }
                    else {
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
        
}
)

module.exports = router;