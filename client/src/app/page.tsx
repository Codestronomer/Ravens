import Image from 'next/image'
import styles from './page.module.css'
import { AppProps } from 'next/app'
import { Login } from './auth'
import Nav from '@/components/nav'
import { AuthContext, AuthContextProvider, AuthContextType } from '@/context/authContext'
import { ChatContextProvider } from '@/context/chatContext'
import { useContext } from 'react'


export default function Home() {

  const { user } = useContext(AuthContext) as AuthContextType;
  return (
    <AuthContextProvider>
      <ChatContextProvider user={user}>
        <main className={styles.main}>
          <Nav />
          <div className={styles.home}>
            <h1 className={styles.welcome}>Welcome 👋</h1>
            <Login></Login>
          </div>
        </main>
      </ChatContextProvider>
    </AuthContextProvider>
  )
}
