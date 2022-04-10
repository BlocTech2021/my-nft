import type { NextPage } from 'next'
import styles from '../styles/Home.module.css'

import dynamic from "next/dynamic";
import { useCookies } from 'react-cookie';
import { LOGGEDIN_USER_COOKIE_NAME } from '../components/UserMenu/constants';
import { LoggedinUser } from '../lib/types';

const NoSSRComponent = dynamic(() => import("../components/Canva"), {
  ssr: false,
});

const Home: NextPage = () => {
  const [cookie] = useCookies([LOGGEDIN_USER_COOKIE_NAME]);

  const user: LoggedinUser | undefined = cookie[LOGGEDIN_USER_COOKIE_NAME];
  console.log(`isLoggedIn in profile: ${!!user}`);
  
  return (
    <div className={styles.container}>
      <NoSSRComponent></NoSSRComponent>
    </div>
  )
}

export default Home
