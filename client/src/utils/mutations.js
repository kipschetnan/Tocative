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
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(firstName: $firstName, lastName: $lastName, username: $username, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_MESSAGE = gql`
  mutation addMessage($messageText: String!) {
    addMessage(messageText: $messageText) {
      _id
      messageText
      createdAt
      username
    }
  }
`;

export const ADD_FRIEND = gql`
  mutation addFriend($id: ID!) {
    addFriend(friendId: $id) {
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
  mutation createConversation($participants: participants!) {
    createConversation(participants: $participants){
      _id
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
