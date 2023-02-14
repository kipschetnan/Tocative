const { Schema, model } = require('mongoose');
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
            ref: "User",
            required: true,
        },
        recipient: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
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