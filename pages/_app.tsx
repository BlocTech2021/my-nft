import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import UserMenu from '../components/UserMenu/UserMenu';
import { CookiesProvider } from "react-cookie"

import { ApolloProvider } from '@apollo/react-hooks';
import { apolloClient } from '../lib/apolloClient';
import { AuthProvider, useAuth } from '../lib/contexts/auth';
import { Toaster } from 'react-hot-toast';
import styles from '../styles/Home.module.css'
import classNames from 'classnames';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={apolloClient}>
      <CookiesProvider>
        <AuthProvider>
          <Toaster />
          <div className={classNames(styles.container, 'relative')} >
            <Head>
              <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
            </Head>
            <Component {...pageProps} /> 

            <div className='absolute top-5 right-10'>
              <UserMenu />
            </div>
            
          </div>
        </AuthProvider>
      </CookiesProvider>
    </ApolloProvider>
  );
}

export default MyApp
