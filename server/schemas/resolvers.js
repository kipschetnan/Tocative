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
            .populate('friends')
            .populate('messages')
  
          return userData;
        }
  
        throw new AuthenticationError('Not logged in');
      },
      users: async () => {
        return User.find()
          .populate('friends')
          .populate('messages');
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
        return Conversation.find().populate('messages').populate('participants')
      }
    },
    Mutation: {
      addUser: async (_, args) => {
        const user = await User.create(args);
        const token = signToken(user);

        return { token, user };
      },
      login: async (parent, { username, password }) => {
        const user = await User.findOne({ username });
  
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
      addMessage: async (parent, args, context) => {
        if (context.user) {
          const message = await Message.create({ ...args, sender: context.user.username });
  
          await User.findByIdAndUpdate(
            { _id: context.user._id },
            { $push: { messages: message._id } },
            { new: true }
          );

          await Conversation.findByIdAndUpdate(
            {_id: args.conversation},
            {$push: {messages: message._id}},
            {new: true}

          )
  
          return message;
        }
  
        throw new AuthenticationError('You need to be logged in!');
      },
      updateUser: async (_, { id, ...rest }) => {
        return User.findByIdAndUpdate(id, rest, {new: true })
      },
      createConversation: async (_, args) => {
        return Conversation.create(args)
      },
      removeConversation: async (_, { id }) => {
        return Conversation.findByIdAndRemove(id)
      },
      addFriend: async (parent, { friendId }, context) => {
        if (context.user) {
          const updatedUser = await User.findOneAndUpdate(
            { _id: context.user._id },
            { $addToSet: { friends: friendId } },
            { new: true }
          ).populate('friends');

          return updatedUser;
        }

        throw new AuthenticationError('You need to be logged in!');
      },
      removeFriend: async (_, { friendId }, context) => {
        try {
          const currentUser = await User.findById(context.id);
          const friendIndex = currentUser.friends.indexOf(friendId);
  
          if (friendIndex === -1) {
            throw new Error("Friend not found");
          }
  
          currentUser.friends.splice(friendIndex, 1);
          await currentUser.save();
  
          return "Friend removed successfully";
        } catch (err) {
          throw new Error(err);
        }
      }
    }
}

module.exports = resolvers