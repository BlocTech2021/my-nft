// import ApolloClient, { DefaultOptions, HttpLink, InMemoryCache } from 'apollo-boost';

import {
  ApolloClient,
  InMemoryCache,
  createHttpLink
} from '@apollo/client'
import Cookies from 'js-cookie'
import { LOGGEDIN_USER_COOKIE_NAME } from '../components/UserMenu/constants';
import { setContext } from '@apollo/client/link/context'
import { LoggedinUser } from './types';

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

const httpLink = createHttpLink({ uri: graphqlServer });

const authLink = setContext((_, { headers }) => {
  const loggedinUserCookie = Cookies.get(LOGGEDIN_USER_COOKIE_NAME)
  const loggedinUser = loggedinUserCookie ? JSON.parse(loggedinUserCookie) as LoggedinUser : undefined

  return {
    headers: {
      ...headers,
      authorization: loggedinUser ? `Bearer ${loggedinUser.accessToken}` : ''
    }
  }
});

export const apolloClient = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});
