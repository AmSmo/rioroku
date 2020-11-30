const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ConversationSchema = new Schema({
    messages: {
        type: Array,
    },
    roomName: {
        type: String
    },
}, {
    timestamps: true
})

module.exports = User = mongoose.model('Conversation', ConversationSchema);