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

export const GET_USER_JOURNALS_QUERY = gql`
  query GetUserJournals($userId: ID!) {
    getJournalByUserId(userId: $userId) {
      id
      content
      sentimentScore
      createdAt
    }
  }
`;

export const GET_COMMUNITIES_QUERY = gql`
  query GetCommunities {
    communities {
      id
      name
      description
      isActive
      memberNumber
      rating
      groupTags
      adminId
    }
  }
`;

export const GET_RESOURCES_QUERY = gql`
  query GetResources {
    resources {
      id
      title
      type
      url
    }
  }
`;
