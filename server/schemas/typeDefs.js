const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    firstName: String
    lastName: String
    username: String
    friendCount: Int
    messages: [Messages]
    friends: [User]
  }

  type Messages {
    _id: ID
    messageText: String
    createdAt: String
    username: String
  }
`
module.exports = typeDefs