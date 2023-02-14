const { AuthenticationError } = require('apollo-server-express');
const User = require('../models/User');
const Message = require('../models/Message');
const Conversation = require('../models/Conversation');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
      me: async (parent, args, context) => {
        if (context.user) {
          const userData = await User.findOne({ _id: context.user._id })
            .populate('friends');
  
          return userData;
        }
  
        throw new AuthenticationError('Not logged in');
      },
      users: async () => {
        return User.find()
          .populate('friends');
      },
      user: async (parent, { username }) => {
        return User.findOne({ username })
          .populate('friends')
      },
      message: async (parent, { _id }) => {
        return Message.findOne({ _id });
      },
      messages: async () => {
        return Message.find()
      },
      conversations: async () => {
        return Conversation.find()
      }
    },
    Mutation: {
      createUser: async (_, args) => {
        const user = await User.create(args);
        const token = signToken(user);

        return { token, user };
      },
      login: async (parent, { username, password }) => {
        const user = await User.findOne({ email });
  
        if (!user) {
          throw new AuthenticationError('Incorrect credentials');
        }
  
        const correctPw = await user.isCorrectPassword(password);
  
        if (!correctPw) {
          throw new AuthenticationError('Incorrect credentials');
        }
  
        const token = signToken(user);
        return { token, user };
      },
      addMessage: async
    }
}