import { gql } from "graphql-request";

export const START_SIGNUP_MUTATION = gql`
  mutation SignUp($input: SignInInput!) {
    signUp(input: $input) {
      accessToken
      user: userId # Adjust based on actual payload structure if needed, schema says userId
    }
  }
`;
// Wait, the schema says:
// signUp(input: SignInInput!): AuthPayload!
// type AuthPayload { userId: ID!, username: String, email: String!, role: Role!, accessToken: String! }

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
