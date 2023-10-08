'use client'
import react, { createContext, useEffect, useState, useCallback } from 'react';

export const Theme = createContext({});

export const ThemeProvider = ({ children }: {children: React.ReactNode }) => {
  const [theme, setTheme] = useState<string>(
    localStorage.getItem('theme') || 'light'
  );

  const toggleTheme = useCallback(() => {
    if (theme == 'light') {
      setTheme('dark')
    } else {
      setTheme('light')
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('theme', theme);
  }, [theme])

  return (
    <Theme.Provider value={{
      theme,
      toggleTheme,
      }}
    >
      {children}
    </Theme.Provider>
  )
}