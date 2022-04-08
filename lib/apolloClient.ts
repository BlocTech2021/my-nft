// import ApolloClient, { DefaultOptions, HttpLink, InMemoryCache } from 'apollo-boost';

import {
  ApolloClient,
  InMemoryCache,
} from '@apollo/client'

// const defaultOptions: DefaultOptions = {
//   watchQuery: {
//     fetchPolicy: 'no-cache',
//     errorPolicy: 'ignore',
//   },
//   query: {
//     fetchPolicy: 'no-cache',
//     errorPolicy: 'all',
//   },
// }

const graphqlServer = process.env.NEXT_PUBLIC_GRAPHQL_SERVER || 'localhost:8082/graphql'

export const apolloClient = new ApolloClient({
  uri: graphqlServer,
  cache: new InMemoryCache(),
});
