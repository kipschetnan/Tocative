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
        firstName
        lastName
      }
      messages {
        _id
        messageText
        createdAt
      }
    }
  }
`;

export const QUERY_ME = gql`
  {
    me {
      _id
      firstName
      lastName
      username
      friendCount
      friends {
        _id
        username
        firstName
        lastName
      }
      messages {
        _id
        messageText
        createdAt
      }
    }
  }
`;

export const QUERY_CONVERSATION = gql`
  query conversation($id: ID!) {
  conversation(_id: $id) {
    _id
    name
    participants {
      username
    }
    messages {
      messageText
      sender
      createdAt
    }
  }
}
`

export const QUERY_CONVERSATIONS = gql`
  query conversations {
  conversations {
    _id
    name
    participants {
      username
    }
  }
}
`

export const QUERY_USER_CONVERSATIONS = gql`
  query userConversations {
  userConversations {
    _id
    name
    participants {
      username
    }
  }
}
`