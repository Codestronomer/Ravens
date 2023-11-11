import React, { useContext, useState } from 'react';
import { AuthContext, AuthContextType, UserInfo } from '@/context/authContext';
import styles from './auth.module.css';
import { Theme } from '@/context/themeContext';
import { ThemeContextType } from '@/context';
import ErrorModal from '@/components/ErrorModal';

interface AuthProps {
  isRegister: boolean;
}

export const Auth: React.FC<AuthProps> = ({ isRegister }) => {
  const [isValid, setIsValid] = useState(false);

  const {
    user,
    userInfo,
    loginUser,
    isLoading,
    loginError,
    registerUser,
    registerError,
    setLoginError,
    updateUserInfo,
    isValidUsername,
    setRegisterError,
    checkIsValidUsername,
  } = useContext(AuthContext) as AuthContextType;

  // get theme
  const { theme } = useContext(Theme) as ThemeContextType;

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (isRegister) {
      registerUser(userInfo);
    } else {
      loginUser(userInfo);
    }
  }

  const handleUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    updateUserInfo({ ...userInfo, username: e.target.value });
    if (isRegister) {
      checkIsValidUsername(e.target.value);
    }
  };

  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    updateUserInfo({ ...userInfo, password: e.target.value });
  }

  const handleCloseError = () => {
    if (isRegister) {
      setRegisterError(null);
    } else {
      setLoginError(null);
    }
  };

  return (
    <div className={styles.authComponent}>
      <div className={styles.formInfo}>
        <h2 className={styles.welcome}>Welcome{isRegister ? '👋' : ' back👋'}</h2>
        <p>{isRegister ? 'Enter your username and password to signup' : 'Enter your username and password to continue'}</p>
      </div>
      <form onSubmit={handleFormSubmit} className={styles.auth}>
        <label className={`${styles.description} ${theme === 'dark' ? 'dark' : ''}`}>
          Username
        </label>
        <input
          className={styles.userInput}
          required={true}
          placeholder="Username"
          onChange={handleUsername}
        />
        {isRegister && userInfo.username?.length > 2 && isValidUsername && (
          <p className={styles.usernameError}>Username is already taken</p>
        )}

        <label className={`${styles.description} ${theme === 'dark' ? 'dark' : ''}`}>
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
          {isLoading ? (isRegister ? 'Creating Your Account' : 'Logging In') : isRegister ? 'Sign Up' : 'Log In'}
        </button>
      </form>
      {(loginError || registerError) && (
        <ErrorModal
          onClose={handleCloseError}
          errorMessage={isRegister ? registerError?.message : loginError?.message}
        />
      )}
    </div>
  )
}