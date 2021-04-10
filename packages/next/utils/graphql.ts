import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import { RINKEBY_SUBGRAPH_URL } from "./constant";

export const client = new ApolloClient({
  uri: RINKEBY_SUBGRAPH_URL,
  cache: new InMemoryCache(),
});

/**
 * Load all the licks
 * @param replyTo
 * @returns
 */
export const GET_ALL_LICKS = gql`
  query GetTokens {
    tokens {
      id
      owner
      tokenUri
    }
  }
`;

/**
 * Given a postId load the post
 */
export const GET_MY_LICKS = gql`
  query GetMyTokens($owner: String!) {
    tokens(
      where: { owner: $owner }
    ) {
      id
      owner
      tokenUri
    }
  }
`;