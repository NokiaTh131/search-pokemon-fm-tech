import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

const POKEMON_GRAPHQL_API = "https://graphql-pokemon2.vercel.app/";

function createApolloClient() {
  return new ApolloClient({
    link: new HttpLink({
      uri: POKEMON_GRAPHQL_API,
    }),
    cache: new InMemoryCache(),
    defaultOptions: {
      watchQuery: {
        fetchPolicy: "cache-first",
      },
    },
  });
}

export const apolloClient = createApolloClient();
