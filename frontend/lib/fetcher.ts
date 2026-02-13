import { GraphQLClient } from "graphql-request";

const endpoint = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/graphql";

export const graphQLClient = new GraphQLClient(endpoint);

export const fetcher = <T>(query: string, variables?: any): (() => Promise<T>) => {
  return async () => graphQLClient.request(query, variables);
};
