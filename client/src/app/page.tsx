'use client'
import Link from 'next/link'
import Image from 'next/image';
import { useContext } from 'react';
import { AppProps } from 'next/app';
import { AuthenticationMain } from './auth';
import ThemeToggle from '@/components/themeToggle';
import styles from './page.module.css';
import SideImage from '../../public/work-chat-not-css.svg'
import { Theme } from '@/context/themeContext';
import { ThemeContextType } from '@/context';

export default function Home() {
  const { theme } = useContext(Theme) as ThemeContextType;

  return (
    <main className={`${styles.main} ${theme == 'dark' ? 'dark' : ''}`} 
      style={{
        backgroundColor: `var(--background-color)`,
        color: `var(--text-color)`,
      }}
    >
      <div className={`${styles.left} ${theme == 'dark' ? 'dark' : ''}`}
        style={{
          backgroundColor: `var(--background-color)`,
        }}
      >
        <div className={styles.brandHeader}><h1>Raven</h1></div>
        <div className={styles.form}>
          <AuthenticationMain />
        </div>
      </div>
      <div 
        className={`${styles.right} ${theme == 'dark' ? 'dark' : ''}`}
        style={{
          backgroundColor: `var(--main-right)`,
        }}
      >
        <div className={styles.rightTop}>
          <ThemeToggle />
        </div>
        <div className={styles.rightImage}>
          <Image src={SideImage} height={300} width={300} alt='raven-image' />
        </div>
      </div>
    </main>
  )
}
