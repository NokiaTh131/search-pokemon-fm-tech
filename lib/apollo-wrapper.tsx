"use client";

import {
  ApolloNextAppProvider,
  ApolloClient,
  InMemoryCache,
} from "@apollo/client-integration-nextjs";
import { HttpLink } from "@apollo/client";
import { persistCache, LocalStorageWrapper } from "apollo3-cache-persist";

function makeClient() {
  const cache = new InMemoryCache();

  if (typeof window !== "undefined") {
    persistCache({
      cache,
      storage: new LocalStorageWrapper(window.localStorage),
    });
  }

  return new ApolloClient({
    cache,
    link: new HttpLink({
      uri: process.env.NEXT_PUBLIC_POKEMON_GRAPQL_API || "https://graphql-pokemon2.vercel.app/",
    }),
  });
}

interface ApolloWrapperProps {
  children: React.ReactNode;
}

export function ApolloWrapper({ children }: ApolloWrapperProps) {
  return (
    <ApolloNextAppProvider makeClient={makeClient}>
      {children}
    </ApolloNextAppProvider>
  );
}
