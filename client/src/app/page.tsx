'use client'
import Image from 'next/image';
import styles from './page.module.css';
import useDarkMode from 'use-dark-mode';
import ThemeToggle from '@/components/themeToggle';
import { AuthenticationMain } from '../components/auth';
import SideImage from '../../public/work-chat-not-css.svg'

export default function Home() {
  const theme = useDarkMode(true);

  return (
    <main className={`${styles.main} ${theme.value == false ? '' : 'dark'}`}
      style={{
        backgroundColor: `var(--background-color)`,
        color: `var(--text-color)`,
      }}
    >
      <div className={`${styles.left} ${theme.value == false ? '' : 'dark'}`}
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
        className={`${styles.right} ${theme.value == false ? '' : 'dark'}`}
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
