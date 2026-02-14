import { gql } from "graphql-request";

export const START_SIGNUP_MUTATION = gql`
  mutation SignUp($input: SignInInput!) {
    signUp(input: $input) {
      accessToken
      user: userId
    }
  }
`;

export const SIGNUP_MUTATION = gql`
  mutation SignUp($input: SignInInput!) {
    signUp(input: $input) {
      accessToken
      userId
      username
      email
      role
    }
  }
`;

export const SIGNIN_MUTATION = gql`
  mutation SignIn($input: SignInInput!) {
    signIn(input: $input) {
      accessToken
      userId
      username
      email
      role
    }
  }
`;

export const CREATE_USER_MUTATION = gql`
  mutation CreateUser($createUserInput: CreateUsersInput!) {
    createUser(createUserInput: $createUserInput) {
      id
      username
      email
      role
    }
  }
`;

export const CREATE_JOURNAL_MUTATION = gql`
  mutation CreateJournal($createJournalInput: CreateJournalInput!) {
    createJournal(createJournalInput: $createJournalInput) {
      id
      content
      sentimentScore
      createdAt
    }
  }
`;
