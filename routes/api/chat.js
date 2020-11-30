const express = require("express");
const keys = require('../../config/keys');
const router = express.Router();
const passport = require('passport');
const Chat = require('../../models/Chat');


router.post('/update', (req, res) => {
    const {roomId,messages} = req.body
    Chat.findOneOrCreate({ roomId }, { roomId, messages }).then(chat => chat.updateOne({ messages }).then(resp => res.json(resp)))
})

module.exports = router;