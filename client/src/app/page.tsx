import Link from 'next/link'
import { AppProps } from 'next/app'
import { Auth } from './auth'
import Nav from '@/components/nav'
import styles from './page.module.css'

export default function Home() {
  return (
    <main className={styles.main}>
      <Nav />
      <div className={styles.home}>
        <h1 className={styles.welcome}>Welcome 👋</h1>
        <Auth />
        <Link href="/chat">Chat</Link>
      </div>
    </main>
  )
}
