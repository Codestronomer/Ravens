import Image from 'next/image'
import { useContext } from 'react'
import { AppProps } from 'next/app'
import { Auth } from './auth'
import Nav from '@/components/nav'
import styles from './page.module.css'
import { Provider } from './provider'
import Link from 'next/link'


export default function Home() {
  return (
    <Provider>
      <main className={styles.main}>
        <Nav />
        <div className={styles.home}>
          <h1 className={styles.welcome}>Welcome 👋</h1>
          <Auth />
          <Link href="/chat">Chat</Link>
        </div>
      </main>
    </Provider>
  )
}
