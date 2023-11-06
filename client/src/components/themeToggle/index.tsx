'use client'
import React from 'react';
import useDarkMode from 'use-dark-mode';
import { DarkModeToggle } from 'react-dark-mode-toggle-2';

export default function ThemeToggle() {
  const theme = useDarkMode(false);
  
  return (
    <DarkModeToggle 
      onChange={theme.toggle}
      isDarkMode={theme.value}
      size={60}
    />
  )
};