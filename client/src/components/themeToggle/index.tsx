import dynamic from 'next/dynamic';
import React, { useMemo } from 'react';
import useDarkMode from 'use-dark-mode';
// import DarkModeToggle from 'react-dark-mode-toggle';

export default function ThemeToggle() {
  // const DarkModeToggle = useMemo(() => dynamic(() => import('react-dark-mode-toggle'), { ssr: false }),[]);
  const theme = useDarkMode(true);

  
  return (
    <></>
    // <DarkModeToggle 
    //   onChange={theme.toggle}
    //   checked={theme.value}
    //   size={60}
    // />
  )
};