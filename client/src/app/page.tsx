import Image from 'next/image'
import styles from './page.module.css'
import { AppProps } from 'next/app'
import { Login } from './auth'
import Nav from '@/components/nav'
import { AuthContextProvider } from '@/context/authContext'


export default function Home() {
  return (
    <AuthContextProvider>
      <main className={styles.main}>
        <Nav />
        <div className={styles.home}>
          <h1 className={styles.welcome}>Welcome 👋</h1>
          <Login></Login>
        </div>
      </main>
    </AuthContextProvider>
  )
}
