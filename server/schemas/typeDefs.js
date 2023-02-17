const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    firstName: String
    lastName: String
    username: String
    friendCount: Int
    messages: [Message]
    friends: [User]
  }

  type Message {
    _id: ID
    messageText: String
    createdAt: String
    sender: String
    conversation: Conversation
  }

  type Conversation {
    _id: ID
    participants: [User!]!
    messages: [Message!]!
    latestMessage: Message
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    me: User
    users: [User]
    user(username: String!): User
    messages(username: String): [Message]
    message(_id: ID!): Message
    conversations: [Conversation]
    conversation(_id: ID): Conversation
  }

  type Mutation {
    login(username: String!, password: String!): Auth
    addUser(username: String!, password: String!, firstName: String!, lastName: String!): Auth
    addMessage(messageText: String!, conversation: ID!): Message!
    addFriend(friendId: ID!): User!
    removeFriend(friendId: ID!): User!
    createConversation(participants: [ID!]): Conversation!
    removeConversation(id: ID!): Conversation!
    updateUser(id: ID!, username: String!): User!
  }
`

module.exports = typeDefs