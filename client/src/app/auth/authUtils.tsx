import React, { useContext } from 'react';
import styles from './auth.module.css';
import { useRouter } from 'next/navigation';
import { AuthContext, AuthContextType, UserInfo } from '@/context/authContext';
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
  const { checkIsValidUsername, isValidUsername } = useContext(AuthContext) as AuthContextType;

  const handleUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setUsername({ ...userInfo, username: e.target.value });
    if (isRegister) {
      checkIsValidUsername(e.target.value);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e?.preventDefault(); // Prevents the default form submission behavior
    setIsValid();
  };

  return <>
    <form onSubmit={handleFormSubmit} className={styles.auth}>
      <label 
        className={`${styles.description} ${theme == 'dark' ? 'dark' : ''}`}
        style={{
          backgroundColor: `var(--background-color)`,
          color: `var(--text-color)`,
        }}
      >
        Username
      </label>
      <input 
        className={styles.userInput}
        required={true}
        placeholder='Username'
        onChange={handleUsername}
      >
      </input>
      {isValidUsername && <p className={styles.usernameError}>Username is already taken</p>}
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
          className={styles.description}
        >
          Password
        </label>
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
          {isLoading ? (isRegister ? 'Creating Your Account' : 'Logging In') : isRegister ? 'Sign Up' : 'Login In'}
        </button>
      </form>
    </>
  )
}
