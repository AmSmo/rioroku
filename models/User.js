const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    ticketId: {
        type: String,
        required: true
    },
    admin: {
        type: Boolean,
        required: true,
        default: false
    },
    username: {
        type: String
    },
    email: {
        type: String,
    },
    fullName: {
        type: String,
    },
    choices: {
        type: Array
    },
    audience: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
})

module.exports = User = mongoose.model('User', UserSchema);