import { GraphQLClient } from "graphql-request";

const endpoint = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/graphql";

export const graphQLClient = new GraphQLClient(endpoint);

export const fetcher = <T>(query: string, variables?: any) => { // Removed Type annotation for return to infer it or keep it simple
  return async () => {
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
    
    if (token) {
        graphQLClient.setHeader("Authorization", `Bearer ${token}`);
    } else {
        graphQLClient.setHeader("Authorization", ""); // Clear header if no token
    }

    return graphQLClient.request<T>(query, variables);
  };
};
