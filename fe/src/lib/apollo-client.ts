// import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
// import { setContext } from "@apollo/client/link/context";

import { HttpLink } from '@apollo/client'
import {
  ApolloClient,
  InMemoryCache,
  registerApolloClient,
} from '@apollo/experimental-nextjs-app-support'

export const { getClient } = registerApolloClient(() => {
  const apiURI = process.env.NEXT_PUBLIC_API_URI!
  return new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({
      headers: {},
      uri: apiURI,
    }),
    devtools: { enabled: process.env.NODE_ENV !== 'production' },
  })
})
