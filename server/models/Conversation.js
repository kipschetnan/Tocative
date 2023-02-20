const { Schema, model, mongoose } = require('mongoose');

const conversationSchema = new Schema({
    name: {
      type: String,
      minlength: 1
    },
    participants: [
      {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
      }
    ],
    messages: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Message",
      },
    ],
    latestMessage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Message",
    },
})

const Conversation = model('Conversation', conversationSchema);
  
module.exports = Conversation;