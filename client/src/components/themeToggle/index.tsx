'use client'
import React from 'react';
import useDarkMode from 'use-dark-mode';
import DarkModeToggle from 'react-dark-mode-toggle';

export default function ThemeToggle() {
  const theme = useDarkMode(false);
  
  return (
    <DarkModeToggle 
      onChange={theme.toggle}
      checked={theme.value}
      size={60}
    />
  )
};