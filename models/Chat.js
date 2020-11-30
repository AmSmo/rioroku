const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ChatSchema = new Schema({
    messages: {
        type: Array,
    },
    roomId: {
        type: String
    },
}, {
    timestamps: true
}
)
ChatSchema.statics.findOneOrCreate = async function findOneOrCreate(condition, doc) {
    console.log(condition)
    const one = await this.findOne(condition);
    return one || this.create(doc);
};
module.exports = Chat = mongoose.model('Chat', ChatSchema);