'use client'
import react, { createContext, useEffect, useState, useCallback } from 'react';

export const Theme = createContext({});

export const ThemeProvider = ({ children }: {children: React.ReactNode }) => {
  // Initialize the theme with the value from localStorage or default to 'light'
  const [theme, setTheme] = useState<string | undefined>(() => {
    if (typeof window !== 'undefined' && window.localStorage) {
      const storedTheme = localStorage.getItem('theme');
      return storedTheme || 'light';
    }
  });

  // Toggle between 'light' and 'dark' themes
  const toggleTheme = useCallback(() => {
    setTheme((currentTheme) => (currentTheme === 'light' ? 'dark' : 'light'));
  }, []);

  // Update the theme in localStorage whenever it changes
  useEffect(() => {
    if (typeof theme === 'string') {
      if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.setItem('theme', theme);
      }
    }
  }, [theme]);

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