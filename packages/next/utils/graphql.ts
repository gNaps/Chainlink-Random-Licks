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
export const GET_POST_QUERY = gql`
  query posts($postId: String!) {
    posts(
      orderBy: publishedAtBlock
      orderDirection: desc
      where: { id: $postId }
    ) {
      id
      publishedAtBlock
      author
      content
      replyTo
      likes
      dislikes
    }
  }
`;