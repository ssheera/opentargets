"use client"

import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client"
import { ApolloProvider } from "@apollo/client/react"

const client = new ApolloClient({
  link: new HttpLink({ uri: "https://api.platform.opentargets.org/api/v4/graphql" }),
  cache: new InMemoryCache()
})

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ApolloProvider client={client}>
      {children}
    </ApolloProvider>
  )
}