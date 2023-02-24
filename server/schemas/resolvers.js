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
      return (await Conversation.find().populate('messages').populate('participants').populate('name'))
    },
    conversation: async (parent, { _id }) => {
      console.log("HERE IN the conversation resolver")
      return Conversation.findById(_id).populate('messages').populate('participants').populate('name')
    },
    userConversations: async (_,args,context) => {
      const conversation = await Conversation.find({
        participants: { $in: context.user._id}
      }).populate('participants')
      return conversation
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
      if (!context.user) {
        throw new AuthenticationError('You need to be logged in!');
      }
      console.log(context.user)
      const message = await Message.create({ ...args });

      await Conversation.findByIdAndUpdate(
        { _id: args.conversation },
        { $push: { messages: message._id } },
        { new: true }

      )

      return message;

      
    },
    updateUser: async (_, { id, ...rest }) => {
      return User.findByIdAndUpdate(id, rest, { new: true })
    },
    createConversation: async (_, args, context) => {
      if (!context.user) {
        throw new AuthenticationError('You need to be logged in!');
      }
      console.log(args)
      const currentUserId = context.user._id
      console.log(currentUserId)
      const participants = args.participants.concat(currentUserId)
      console.log(participants)

      return Conversation.create({
        name: args.name,
        participants: participants
      })
    },
    removeConversation: async (_, { id }) => {
      return Conversation.findByIdAndRemove(id)
    },
    addFriend: async (parent, { username }, context) => {
      if (!context.user) {
        throw new AuthenticationError('You need to be logged in!');
      }

      const currentUser = await User.findById(context.user._id)
      const friend = await User.findOne({ username })
      if(!friend) {
        throw new Error('User not found')
      }
      console.log(friend)
      console.log(context.user._id)
      const updatedUser = currentUser.friends.push(friend)
      const updatedFriend = friend.friends.push(currentUser)
      await currentUser.save()
      console.log('This is current user: ', currentUser)
      console.log('This is friend: ', friend)
      return currentUser

    },
    removeFriend: async (_, { friendId }, context) => {
      try {
        const currentUser = await User.findById(context.id);
        const friendIndex = currentUser.friends.indexOf(friendId);

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