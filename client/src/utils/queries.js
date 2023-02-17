import { gql } from '@apollo/client';

export const QUERY_MESSAGES = gql`
  query messages($username: String) {
    messages(username: $username) {
      _id
      messageText
      createdAt
      username
    }
  }
`;


export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      firstName
      lastName
      username
      friendCount
      friends {
        _id
        username
      }
      messages {
        _id
        messageText
        createdAt
      }
    }
  }
`;