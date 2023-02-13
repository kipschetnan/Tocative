const { AuthenticationError } = require('apollo-server-express');
const { User, Messages } = require('../models');
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
        return Messages.findOne({ _id });
      }
    }
}
module.exports = resolvers