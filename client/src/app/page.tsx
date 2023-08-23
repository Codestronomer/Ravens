import Image from 'next/image'
import styles from './page.module.css'
import { AppProps } from 'next/app'
import { Login } from './auth'
import Nav from '@/components/nav'


export default function Home() {
  return (
    <main className={styles.main}>
      <Nav />
      <div className={styles.home}>
        <h1 className={styles.welcome}>Welcome 👋</h1>
        <p className={styles.description}>Set a username to get started</p>
        <Login></Login>
      </div>
    </main>
  )
}
