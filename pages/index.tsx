import type { NextPage } from 'next'
import styles from '../styles/Home.module.css'

import dynamic from "next/dynamic";

const NoSSRComponent = dynamic(() => import("../components/Canva"), {
  ssr: false,
});

const Home: NextPage = () => {  
  return (
    <div className={styles.container}>
      <NoSSRComponent></NoSSRComponent>
    </div>
  )
}

export default Home
