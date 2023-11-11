'use client'
import { AuthContext, AuthContextType } from '@/context/authContext';
import React, { useState, useEffect, useContext } from 'react';
import ErrorModal from '@/components/ErrorModal';
import { GetUsername, GetPassword } from './authUtils';
import styles from './auth.module.css';
import Link from 'next/link';

export function Login(): React.FunctionComponentElement<HTMLBodyElement> {
  const [isValid, setIsValid] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState<boolean>(false)
  const authContext = useContext(AuthContext) as AuthContextType;

  const {
    user,
    userInfo,
    loginUser,
    isLoading,
    loginError,
    setLoginError,
    updateUserInfo,
  } = authContext;
  
  // Switch to next route
  const handleNext = () => {
    setIsValid(true);
  }

   const handleCloseError = () => {
    setLoginError(null);
  };

  const handleUser = async () => {
    const isLoggedIn = await loginUser(userInfo)
    if (isLoggedIn == true) {
      setLoginSuccess(isLoggedIn);
    }
  }

  useEffect(() => {
  }, [isValid]);

  return (
    (loginSuccess ? 
      <div className={styles.authComponent}>
        <div className={styles.formInfo}>
          <h3 className={styles.welcome}>Welcome back, {user.username}👋</h3>
        </div>
        <Link href="chat">
          <button className={styles.userSubmit}>
            Continue to chat
          </button>
        </Link>
      </div>
    :
    <div className={styles.authComponent}>
      <div className={styles.formInfo}>
        <h2 className={styles.welcome}>Welcome back👋</h2>
        <p>Enter your username and password to continue</p>
      </div>
      <div className={styles.authForm}>
        <GetUsername
          userInfo={userInfo}
          setUsername={updateUserInfo}
          setIsValid={handleNext}
          isRegister={false}
        />
        <GetPassword
          userInfo={userInfo}
          setPassword={updateUserInfo}
          handleUser={handleUser}
          isRegister={false}
          isLoading={isLoading}
        />
        {
          loginError && loginError.error && 
          <ErrorModal onClose={handleCloseError} errorMessage={loginError.message} />
        }
      </div>
    </div>
    )
  )
}