'use client'
import Link from 'next/link'
import Image from 'next/image';
import { useContext } from 'react';
import { AppProps } from 'next/app'
import { Auth } from './auth'
import Nav from '@/components/nav'
import styles from './page.module.css'
import SideImage from '../../public/work-chat-not-css.svg'
import { Theme } from '@/context/themeContext';
import { ThemeContextType } from '@/context';

export default function Home() {
  const { theme } = useContext(Theme) as ThemeContextType;

  return (
    <main className={styles.main}>
      <Nav />
      <div 
        className={`${styles.home} ${theme == 'dark' ? 'dark' : ''}`}
        style={{
          backgroundColor: `var(--background-color)`,
          color: `var(--text-color)`,
        }}
      >
        <div className={`${styles.homeLeft}`}>
          <Image src={SideImage} height={330} width={330} alt='raven-image' />
        </div>
        <div className={`${styles.homeRight}`}>
          <h1 className={styles.welcome}>Welcome 👋</h1>
          <Auth />
          <Link href="/chat">Chat</Link>
        </div>
      </div>
    </main>
  )
}
