const { Schema, model, mongoose } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const messageSchema = new Schema(
    {
        messageText: {
            type: String,
            required: true,
            minlength: 1,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: timestamp => dateFormat(timestamp)
        },
        sender: {
            type: mongoose.Schema.Types.ObjectId,
            required: true
        },
        conversation: {
            type: mongoose.Schema.Types.ObjectId,
            required: false,
            ref: 'Conversation'
        }
    },
    {
        toJSON: {
            getters: true
        }
    }
);

const Message = model('Message', messageSchema);

module.exports = Message;