import { HttpLink } from "@apollo/client";
import {
  registerApolloClient,
  ApolloClient,
  InMemoryCache,
} from "@apollo/client-integration-nextjs";

const POKEMON_GRAPHQL_API =
  process.env.NEXT_PUBLIC_POKEMON_GRAPQL_API ||
  "https://graphql-pokemon2.vercel.app/";

export const { getClient } = registerApolloClient(() => {
  return new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({
      uri: POKEMON_GRAPHQL_API,
    }),
  });
});
