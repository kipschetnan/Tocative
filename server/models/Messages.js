const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const messagesSchema = new Schema(
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
        username: {
            type: String,
            required: true
        },
    },
    {
        toJSON: {
            getters: true
        }
    }
);

const Messages = model('Messages', messagesSchema);

module.exports = Messages;