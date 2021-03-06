const express = require("express");
const keys = require('../../config/keys');
const router = express.Router();
const passport = require('passport');
const Chat = require('../../models/Chat');


router.post('/update', (req, res) => {
    const {roomId,messages} = req.body
    // let messageText = messages.map((message)=> message.body)
    
    Chat.findOneOrCreate({ roomId }, { roomId, messages }).then(chat => chat.updateOne({ messages: messages }).then(resp => res.json(resp)))
})

router.post('/retrieve', (req, res) =>{
    let {roomId} = req.body
    Chat.findOne({roomId}).then(resp=>res.json(resp.messages))

})

module.exports = router;