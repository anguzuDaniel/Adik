import { gql } from "graphql-request";

export const ME_QUERY = gql`
  query Me {
    viewer {
      id
      username
      email
      role
      recoveryStage
    }
  }
`;

export const GET_USER_QUERY = gql`
  query GetUser($id: String!) {
    user(id: $id) {
      id
      username
      email
      role
      recoveryStage
    }
  }
`;
