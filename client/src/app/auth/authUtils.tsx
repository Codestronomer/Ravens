import React, { useContext } from 'react';
import styles from './auth.module.css';
import { useRouter } from 'next/navigation';
import { UserInfo } from '@/context/authContext';
import { Theme } from '@/context/themeContext';
import { ThemeContextType } from '@/context';

interface userNameProps {
  userInfo: UserInfo
  setIsValid: Function
  setUsername: Function
  isRegister: boolean
}

interface passwordProps {
  userInfo: UserInfo
  handleUser: Function,
  setPassword: Function,
  isLoading: boolean,
  isRegister: boolean
}

export const GetUsername: React.FC<userNameProps> = ({ setIsValid, setUsername, userInfo, isRegister }) => {

  // get theme
  const { theme } = useContext(Theme) as ThemeContextType;

  const handleUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setUsername({ ...userInfo, username: e.target.value });
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e?.preventDefault(); // Prevents the default form submission behavior
    setIsValid();
  };

  return <>
    <form onSubmit={handleFormSubmit} className={styles.auth}>
      {
        isRegister ? 
          <label 
            className={`styles.description ${theme == 'dark' ? 'dark' : ''}`}
            style={{
              backgroundColor: `var(--background-color)`,
              color: `var(--text-color)`,
            }}
          >Enter a username to get started</label>
        :
          <label
            className={`styles.description ${theme == 'dark' ? 'dark' : ''}`}
            style={{
              backgroundColor: `var(--background-color)`,
              color: `var(--text-color)`,
            }}
          >Enter your username to continue</label>
      }
      <input 
        className={styles.userInput}
        required={true}
        placeholder='Username'
        onChange={handleUsername}
      >
      </input>
    </form>
  </>

}

export const GetPassword: React.FC<passwordProps> = ({
    handleUser,
    setPassword,
    userInfo,
    isLoading,
    isRegister
  }) => {

  // get theme
  const { theme } = useContext(Theme) as ThemeContextType;

  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setPassword({...userInfo, password: e.target.value});
  }

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleUser();
  }

  return (
    <>
      <form onSubmit={handleFormSubmit} className={styles.auth}>
      <label 
        className={`styles.description ${theme == 'dark' ? 'dark' : ''}`}
        style={{
          backgroundColor: `var(--background-color)`,
          color: `var(--text-color)`,
          textAlign: 'left',
        }}
      >Password</label>
      <input
        className={styles.userInput}
        placeholder="Enter a strong password"
        required={true}
        type="password"
        autoComplete="new-password"
        aria-autocomplete="list"
        onChange={handlePassword}
      />
      <button className={styles.userSubmit} type="submit">
          {isLoading ? (isRegister ? 'Creating Your Account' : 'Logging In') : isRegister ? 'Create Account' : 'Login In'}
        </button>
      </form>
    </>
  )
}
