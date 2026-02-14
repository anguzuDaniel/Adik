import { GraphQLClient } from "graphql-request";

const endpoint = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/graphql";

export const graphQLClient = new GraphQLClient(endpoint);

/**
 * Creates a fetcher function for react-query.
 * Reads token from localStorage and caches the header to avoid
 * resetting it on every single request.
 */
let lastToken: string | null = null;

export const fetcher = <T>(query: string, variables?: any) => {
    return async () => {
        const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

        // Only update header when the token actually changes
        if (token !== lastToken) {
            lastToken = token;
            if (token) {
                graphQLClient.setHeader("Authorization", `Bearer ${token}`);
            } else {
                graphQLClient.setHeader("Authorization", "");
            }
        }

        return graphQLClient.request<T>(query, variables);
    };
};
