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
    username: String
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
  }

  type Mutation {
    login(username: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!, firstName: String!, lastName: String!): Auth
    addMessage(messageText: String!): Message
    addFriend(friendId: ID!): User
  }
`

module.exports = typeDefs