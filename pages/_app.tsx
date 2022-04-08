import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import UserMenu from '../components/UserMenu/UserMenu';
import { CookiesProvider } from "react-cookie"

import { ApolloProvider } from '@apollo/react-hooks';
import { apolloClient } from '../lib/apolloClient';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={apolloClient}>
      <CookiesProvider>
        <div className='relative'>
          <Head>
            <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
          </Head>
          <Component {...pageProps} />

          <div className='absolute top-5 right-10'>
            <UserMenu />
          </div>
          
        </div>
      </CookiesProvider>
    </ApolloProvider>
  );
}

export default MyApp
