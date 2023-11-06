'use client'
import Image from 'next/image';
import React, { useContext, useEffect, useRef } from 'react';
import { DarkModeToggle } from 'react-dark-mode-toggle-2';
import styles from './theme.module.css';
import { Theme } from '@/context/themeContext';
import { ThemeContextType } from '@/context';

export default function ThemeToggle() {

  const { theme, toggleTheme } = useContext(Theme) as ThemeContextType;
  const [isDarkMode, setIsDarkMode] = React.useState(theme == 'light' ? true : false);

  useEffect(() => {
    toggleTheme();
  }, [isDarkMode]);
  
  return (
    <DarkModeToggle 
      onChange={setIsDarkMode}
      isDarkMode={isDarkMode} 
      size={60}
    />   
    // // <div className={styles.darkModeToggle} onClick={() => toggleTheme()}>
    //   {/* <button className={styles.toggleButton}>
    //     <div className={styles.lightModeIcon}>
    //       <Image src={LightIcon} alt="light mode button" height={20} width={20} />
    //     </div>
    //     <div className={styles.darkModeIcon}>
    //       <Image src={DarkIcon} alt="dark mode button" height={20} width={20} />
    //     </div> */}
    //   {/* </button> */}
    // // </div>
  )
};