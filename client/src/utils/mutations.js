import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $password: String!, $firstName: String!, $lastName: String!) {
    addUser(username: $username, password: $password, firstName: $firstName, lastName: $lastName) {
      token
      user {
        _id
        firstName
        lastName
        username
      }
    }
  }
`;

export const ADD_MESSAGE = gql`
  mutation addMessage($messageText: String!, $conversation: ID!) {
    addMessage(messageText: $messageText, conversation: $conversation) {
      conversation {
        messages {
          messageText
          createdAt
        }
      }
      _id
      messageText
    }
  }
`;

export const ADD_FRIEND = gql`
  mutation addFriend($username: String!) {
    addFriend(username: $username) {
      _id
      username
      friendCount
      friends {
        _id
        username
      }
    }
  }
`;

export const REMOVE_FRIEND = gql`
  mutation removeFriend($id: ID!) {
    removeFriend(id: $id) {
      _id
      username
      friends {
        _id
        username
      }
    }
  }
`;

export const CREATE_CONVERSATION = gql`
  mutation createConversation($participants: [ID!]) {
    createConversation(participants: $participants) {
      _id
      messages {
        createdAt
        messageText
        sender
      }
      participants {
        _id
        username
    }
    }
  }
`

export const REMOVE_CONVERSATION = gql`
  mutation removeConversation($id: id) {
    removeConversation(id: $id) {
      _id
    }
  }
`

export const UPDATE_USER = gql`
  mutation updateUser($id: id, $username: username) {
    updatedUser(id: $id, username: $username) {
      username
      _id
    }
  }
`
