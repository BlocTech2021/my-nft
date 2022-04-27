import type { NextPage } from 'next'
import styles from '../styles/Home.module.css'

import dynamic from "next/dynamic";
import { useAuth } from '../lib/contexts/auth';
import { useRouter } from 'next/router';

const NoSSRComponent = dynamic(() => import("../components/Canva"), {
  ssr: false,
});

const Home: NextPage = () => { 
  const { isLoggedIn } = useAuth()
  const router = useRouter();

  if (isLoggedIn) {
    router.push('/main-room');
  }

  return (
    <div className={styles.container}>
      <NoSSRComponent></NoSSRComponent>
    </div>
  )
}

export default Home
